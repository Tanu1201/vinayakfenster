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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { formatDateTime, timesAgo } from '@/lib/formatDate'
import { Delete } from 'lucide-react'
import Image from 'next/image'
import { GetBrandsFnDataType } from '../../brands/actions'
import { GetCategoriesFnDataType } from '../../categories/actions'
import {
  GetProductFnDataType,
  createProduct,
  deleteProduct,
  deleteProductImage,
  updateProduct
} from './actions'

const ProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  brandId: z.string().optional(),
  categoryId: z.string().optional()
})

type FormData = z.infer<typeof ProductSchema>

export const Render: FC<{
  product: GetProductFnDataType | undefined
  brands: GetBrandsFnDataType['brands'] | undefined
  categories: GetCategoriesFnDataType['categories'] | undefined
}> = ({ product, brands, categories }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product?.name ?? '',
      slug: product?.slug ?? '',
      description: product?.description ?? '',
      brandId: product?.brand?.id ?? '',
      categoryId: product?.category?.id ?? ''
    }
  })
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [images, setImages] = useState<{ id: string; url: string }[]>([])

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    try {
      let uploadedFiles:
        | {
            fileId: string
            fileUrl: string
          }[]
        | undefined = []
      if (files.length) {
        for (const file of files) {
          const formData = new FormData()
          formData.append('file', file)
          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          })
          const json = await res.json()
          if (json.success && json.id && json.url) {
            uploadedFiles.push({
              fileId: json.id,
              fileUrl: json.url
            })
          } else {
            toast({
              title: 'Error uploading file',
              variant: 'destructive'
            })
            setIsSaving(false)
            return
          }
        }
      }
      if (!product) {
        const newId = await createProduct({
          ...data,
          fileIds: uploadedFiles?.map(f => f.fileId)
        })
        router.replace(`/products/${newId}`)
      } else {
        await updateProduct({
          id: product.id,
          ...data,
          fileIds: uploadedFiles?.map(f => f.fileId)
        })
      }
      setImages([])
      setFiles([])
      toast({
        title: 'product saved'
      })
    } catch (err) {
      toast({
        title: 'Error saving product',
        variant: 'destructive'
      })
    }
    setIsSaving(false)
  }

  return (
    <Shell>
      <Heading heading={product ? product.name || product.id : 'New product'} />
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
            {product ? (
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
                          await deleteProduct(product.id)
                          toast({
                            title: 'product deleted'
                          })
                          router.push('/products')
                        } catch (err) {
                          toast({
                            title: 'Error deleting product',
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
            {product ? (
              <Link href="/products/new">
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
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

          <FormField
            control={form.control}
            name="brandId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSaving}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brands?.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSaving}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name={'images'}
            render={() => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <Input
                  type="file"
                  multiple
                  placeholder="Enter images"
                  onChange={async e => {
                    if (e.target.files) {
                      const f = e.target?.files
                      if (f.length) {
                        setFiles(Array.from(f))
                        for (const file of f) {
                          const buffer = await file?.arrayBuffer()
                          setImages(prev => [
                            ...prev,
                            {
                              id: file.name,
                              url: URL.createObjectURL(new Blob([buffer]))
                            }
                          ])
                        }
                      }
                    }
                  }}
                  autoCorrect="off"
                  disabled={isSaving}
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="grid grid-cols-3">
        {images.map((image, i) => (
          <div key={i} className="flex gap-2">
            <Image src={image.url} height={300} width={300} alt="" />
            <Delete
              className="cursor-pointer"
              onClick={async () => {
                setImages(prev => prev.filter(p => p.id !== image.id))
                setFiles(prev => prev.filter(p => p.name !== image.id))
              }}
            />
          </div>
        ))}

        {product?.productImages.map((image, i) => (
          <div key={i} className="flex gap-2">
            <Image src={image.url} height={300} width={300} alt="" />
            <Delete
              className="cursor-pointer"
              onClick={async () => {
                await deleteProductImage(image.id)
              }}
            />
          </div>
        ))}
      </div>
      {product ? (
        <SystemInfo
          items={[
            {
              label: 'Id',
              value: product.id
            },
            {
              label: 'Created At',
              value: formatDateTime(product.createdAt)
            },
            {
              label: 'Updated At',
              value: timesAgo(product.updatedAt)
            },
            {
              label: 'Created By',
              value: product.createdBy.name
            },
            {
              label: 'Updated By',
              value: product.updatedBy.name
            }
          ]}
        />
      ) : undefined}
    </Shell>
  )
}
