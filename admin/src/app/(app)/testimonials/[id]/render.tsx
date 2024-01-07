'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Heading } from '@/components/heading'
import { Icons } from '@/components/icons'
import { Shell } from '@/components/shell'
import { SystemInfo } from '@/components/system-info'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { formatDateTime, timesAgo } from '@/lib/formatDate'
import { Delete } from 'lucide-react'
import Image from 'next/image'
import {
  GetTestimonialFnDataType,
  createTestimonial,
  deleteTestimonial,
  deleteTestimonialImage,
  updateTestimonial
} from './actions'

const TestimonialSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1)
})

type FormData = z.infer<typeof TestimonialSchema>

export const Render: FC<{
  testimonial: GetTestimonialFnDataType | undefined
}> = ({ testimonial: testimonial }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(TestimonialSchema),
    defaultValues: {
      name: testimonial?.name ?? ''
    }
  })
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [file, setFile] = useState<File | undefined>(undefined)
  const [image, setImage] = useState<{ id: string; url: string }>()

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    try {
      let uploadedFile:
        | {
            fileId: string
            fileUrl: string
          }
        | undefined = undefined
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        const json = await res.json()
        if (json.success && json.id && json.url) {
          uploadedFile = {
            fileId: json.id,
            fileUrl: json.url
          }
        } else {
          toast({
            title: 'Error uploading file',
            variant: 'destructive'
          })
          setIsSaving(false)
          return
        }
      }
      if (!testimonial) {
        const newId = await createTestimonial({
          ...data,
          fileId: uploadedFile?.fileId
        })
        router.replace(`/testimonials/${newId}`)
      } else {
        await updateTestimonial({
          id: testimonial.id,
          ...data,
          fileId: uploadedFile?.fileId
        })
      }
      toast({
        title: 'testimonial saved'
      })
    } catch (err) {
      toast({
        title: 'Error saving testimonial',
        variant: 'destructive'
      })
    }
    setIsSaving(false)
  }

  return (
    <Shell>
      <Heading
        heading={
          testimonial ? testimonial.name || testimonial.id : 'New testimonial'
        }
      />
      <Form {...form}>
        <form
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="col-span-1 mb-1 grid grid-cols-2 gap-2 sm:flex md:col-span-2">
            <Button type="button" onClick={() => router.back()} variant="ghost">
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit" disabled={isSaving || isDeleting}>
              {isSaving ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.save className="mr-2 h-4 w-4" />
              )}
              <span>Save</span>
            </Button>
            {testimonial ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={isSaving || isDeleting}
                  >
                    {isDeleting ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Icons.delete className="mr-2 h-4 w-4" />
                    )}
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        setIsDeleting(true)
                        try {
                          await deleteTestimonial(testimonial.id)
                          toast({
                            title: 'testimonial deleted'
                          })
                          router.push('/testimonials')
                        } catch (err) {
                          toast({
                            title: 'Error deleting testimonial',
                            variant: 'destructive'
                          })
                        }
                        setIsDeleting(false)
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : undefined}
            {testimonial ? (
              <Link href="/testimonials/new">
                <Button
                  type="button"
                  disabled={isSaving || isDeleting}
                  variant="secondary"
                  className="w-full"
                >
                  <Icons.add className="mr-2 h-4 w-4" />
                  New
                </Button>
              </Link>
            ) : undefined}
          </div>

          {image?.url || testimonial?.resource?.url ? (
            <div className="flex gap-4 md:col-span-2 my-8">
              <Image
                src={image?.url || testimonial?.resource?.url || ''}
                height={300}
                width={300}
                alt=""
              />

              {testimonial ? (
                <Delete
                  className="cursor-pointer"
                  onClick={async () => {
                    await deleteTestimonialImage(testimonial.id)
                  }}
                />
              ) : null}
            </div>
          ) : null}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter a name"
                    disabled={isSaving}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter description"
                    autoCapitalize="none"
                    autoComplete="description"
                    autoCorrect="off"
                    disabled={isSaving}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Input
            type="file"
            placeholder="Enter image"
            max={1}
            onChange={async e => {
              if (e.target.files) {
                const f = e.target?.files?.[0]
                if (f) {
                  setFile(f)
                  const buffer = await f?.arrayBuffer()
                  setImage({
                    id: f.name,
                    url: URL.createObjectURL(new Blob([buffer]))
                  })
                }
              }
            }}
            autoCorrect="off"
            disabled={isSaving}
          />
        </form>
      </Form>
      {testimonial ? (
        <SystemInfo
          items={[
            {
              label: 'Id',
              value: testimonial.id
            },
            {
              label: 'Created At',
              value: formatDateTime(testimonial.createdAt)
            },
            {
              label: 'Updated At',
              value: timesAgo(testimonial.updatedAt)
            },
            {
              label: 'Created By',
              value: testimonial.createdBy.name
            },
            {
              label: 'Updated By',
              value: testimonial.updatedBy.name
            }
          ]}
        />
      ) : undefined}
    </Shell>
  )
}
