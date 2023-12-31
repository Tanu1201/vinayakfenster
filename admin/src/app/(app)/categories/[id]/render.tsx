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
import { toast } from '@/components/ui/use-toast'
import { formatDateTime, timesAgo } from '@/lib/formatDate'
import { Delete } from 'lucide-react'
import Image from 'next/image'
import {
  GetCategoryFnDataType,
  createCategory,
  deleteCategory,
  deleteCategoryImage,
  updateCategory
} from './actions'

const Categorieschema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1)
})

type FormData = z.infer<typeof Categorieschema>

export const Render: FC<{
  category: GetCategoryFnDataType | undefined
}> = ({ category }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(Categorieschema),
    defaultValues: {
      name: category?.name ?? '',
      slug: category?.slug ?? ''
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
      if (!category) {
        const newId = await createCategory({
          ...data,
          fileId: uploadedFile?.fileId
        })
        router.replace(`/categories/${newId}`)
      } else {
        await updateCategory({
          id: category.id,
          ...data,
          fileId: uploadedFile?.fileId
        })
      }
      toast({
        title: 'category saved'
      })
    } catch (err) {
      toast({
        title: 'Error saving category',
        variant: 'destructive'
      })
    }
    setIsSaving(false)
  }

  return (
    <Shell>
      <Heading
        heading={category ? category.name || category.id : 'New category'}
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

            {category ? (
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
                          await deleteCategory(category.id)
                          toast({
                            title: 'category deleted'
                          })
                          router.push('/categories')
                        } catch (err) {
                          toast({
                            title: 'Error deleting category',
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
            {category ? (
              <Link href="/categories/new">
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

          {image?.url || category?.resource?.url ? (
            <div className="flex gap-4 md:col-span-2 my-8">
              <Image
                src={image?.url || category?.resource?.url || ''}
                height={300}
                width={300}
                alt=""
              />

              {category ? (
                <Delete
                  className="cursor-pointer"
                  onClick={async () => {
                    await deleteCategoryImage(category.id)
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
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter slug"
                    autoCapitalize="none"
                    autoComplete="slug"
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
      {category ? (
        <SystemInfo
          items={[
            {
              label: 'Id',
              value: category.id
            },
            {
              label: 'Created At',
              value: formatDateTime(category.createdAt)
            },
            {
              label: 'Updated At',
              value: timesAgo(category.updatedAt)
            },
            {
              label: 'Created By',
              value: category.createdBy.name
            },
            {
              label: 'Updated By',
              value: category.updatedBy.name
            }
          ]}
        />
      ) : undefined}
    </Shell>
  )
}
