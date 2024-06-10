"use client";

import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import { Shell } from "@/components/shell";
import { SystemInfo } from "@/components/system-info";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multiple-selector";
import { toast } from "@/components/ui/use-toast";
import { formatDateTime, timesAgo } from "@/lib/formatDate";
import { Delete } from "lucide-react";
import Image from "next/image";
import { GetBrandsFnDataType } from "../../brands/actions";
import { GetCategoriesFnDataType } from "../../categories/actions";
import {
  GetProductFnDataType,
  createProduct,
  deleteProduct,
  deleteProductImage,
  updateProduct,
} from "./actions";

const ProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  brands: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  categories: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});

type FormData = z.infer<typeof ProductSchema>;

export const Render: FC<{
  product: GetProductFnDataType | undefined;
  brands: GetBrandsFnDataType["brands"] | undefined;
  categories: GetCategoriesFnDataType["categories"] | undefined;
}> = ({ product, brands, categories }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product?.name ?? "",
      slug: product?.slug ?? "",
      brands:
        product?.productBrands.map((pb) => ({
          label: pb.brand.name,
          value: pb.brand.id,
        })) ?? [],
      categories:
        product?.productCategories.map((pc) => ({
          label: pc.category.name,
          value: pc.category.id,
        })) ?? [],
      metaTitle: product?.metaTitle ?? "",
      metaDescription: product?.metaDescription ?? "",
    },
  });
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<{ id: string; url: string }[]>([]);

  const [isEditorMounted, setIsMounted] = useState<boolean>(false);

  const editorRef = useRef<EditorJS>();
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;

    // @ts-ignore
    const Table = (await import("@editorjs/table")).default;
    // @ts-ignore
    const List = (await import("@editorjs/list")).default;
    // @ts-ignore
    const Image = (await import("@editorjs/image")).default;
    // @ts-ignore
    const Header = (await import("@editorjs/header")).default;
    // @ts-ignore
    const Quote = (await import("@editorjs/quote")).default;
    // @ts-ignore
    const CheckList = (await import("@editorjs/checklist")).default;
    // @ts-ignore
    const Delimiter = (await import("@editorjs/delimiter")).default;

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          editorRef.current = editor;
        },
        placeholder: "Type here to write...",
        inlineToolbar: true,
        data: product?.description as any,
        tools: {
          header: Header,
          list: List,
          image: {
            class: Image,
            config: {
              uploader: {
                async uploadByFile(file: any) {
                  // const formData = new FormData()
                  // formData.append('file', file)
                  // const res = await fetch('/api/upload', {
                  //   method: 'POST',
                  //   body: formData
                  // })
                  // const json = await res.json()
                  // if (json.success && json.id && json.url) {
                  //   return {
                  //     success: true,
                  //     file: {
                  //       id: json.id,
                  //       url: json.url
                  //     }
                  //   }
                  // } else {
                  //   return {
                  //     success: false
                  //   }
                  // }
                  const formData = new FormData();
                  formData.append("file", file);

                  const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                  });
                  const json = await res.json();
                  if (json?.attachments) {
                    return {
                      success: true,
                      file: {
                        id: json.attachments[0].id,
                        url: json.attachments[0].url,
                      },
                    };
                  } else {
                    return {
                      success: false,
                    };
                  }
                },
              },
            },
          },
          table: Table,
          checklist: CheckList,
          quote: Quote,
          delimiter: Delimiter,
        },
      });
    }
  }, [product?.description]);

  useEffect(() => {
    if (typeof window !== "undefined") setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isEditorMounted) return;

    initializeEditor();

    return () => {
      editorRef.current?.destroy();
      editorRef.current = undefined;
    };
  }, [isEditorMounted, initializeEditor]);

  async function onSubmit(data: FormData) {
    const editorData = await editorRef.current?.save();

    setIsSaving(true);
    try {
      let uploadedFiles:
        | {
            fileId: string;
            fileUrl: string;
          }[]
        | undefined = [];
      if (files.length) {
        for (const file of files) {
          // const formData = new FormData()
          // formData.append('file', file)
          // const res = await fetch('/api/upload', {
          //   method: 'POST',
          //   body: formData
          // })
          // const json = await res.json()
          // if (json.success && json.id && json.url) {
          //   uploadedFiles.push({
          //     fileId: json.id,
          //     fileUrl: json.url
          //   })
          // } else {
          //   toast({
          //     title: 'Error uploading file',
          //     variant: 'destructive'
          //   })
          //   setIsSaving(false)
          //   return
          // }
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const json = await res.json();
          if (json?.attachments) {
            uploadedFiles.push({
              fileId: json.attachments[0].id,
              fileUrl: json.attachments[0].url,
            });
          } else {
            toast({
              title: "Error uploading file",
              variant: "destructive",
            });
            setIsSaving(false);
            return;
          }
        }
      }
      if (!product) {
        const newId = await createProduct({
          ...data,
          description: editorData,
          fileIds: uploadedFiles?.map((f) => f.fileId),
          brandIds: data.brands.map((b) => b.value),
          categoryIds: data.categories.map((c) => c.value),
        });
        router.replace(`/products/${newId}`);
      } else {
        await updateProduct({
          id: product.id,
          ...data,
          description: editorData,
          fileIds: uploadedFiles?.map((f) => f.fileId),
          brandIds: data.brands.map((b) => b.value),
          categoryIds: data.categories.map((c) => c.value),
        });
      }
      setImages([]);
      setFiles([]);
      toast({
        title: "product saved",
      });
    } catch (err) {
      toast({
        title: "Error saving product",
        variant: "destructive",
      });
    }
    setIsSaving(false);
  }

  return (
    <Shell>
      <Heading heading={product ? product.name || product.id : "New product"} />
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
                        setIsDeleting(true);
                        try {
                          await deleteProduct(product.id);
                          toast({
                            title: "product deleted",
                          });
                          router.push("/products");
                        } catch (err) {
                          toast({
                            title: "Error deleting product",
                            variant: "destructive",
                          });
                        }
                        setIsDeleting(false);
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
                    value={field.value as string}
                    onChange={(e) => field.onChange(e.target.value)}
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
            name="brands"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brands</FormLabel>
                <MultipleSelector
                  defaultOptions={brands?.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  }))}
                  placeholder="Select Brands"
                  {...field}
                />

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <MultipleSelector
                  defaultOptions={categories?.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  }))}
                  placeholder="Select Categories"
                  {...field}
                />
                <FormMessage />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter meta title"
                    disabled={isSaving}
                    {...field}
                    value={(field.value as string) || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="metaDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter meta description"
                    disabled={isSaving}
                    {...field}
                    value={(field.value as string) || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={"images"}
            render={() => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <Input
                  type="file"
                  multiple
                  placeholder="Enter images"
                  onChange={async (e) => {
                    if (e.target.files) {
                      const f = e.target?.files;
                      if (f.length) {
                        setFiles(Array.from(f));
                        for (const file of f) {
                          const buffer = await file?.arrayBuffer();
                          setImages((prev) => [
                            ...prev,
                            {
                              id: file.name,
                              url: URL.createObjectURL(new Blob([buffer])),
                            },
                          ]);
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

          <div className="grid grid-cols-3 col-span-2">
            {images.map((image, i) => (
              <div key={i} className="flex gap-2">
                <Image src={image.url} height={300} width={300} alt="" />
                <Delete
                  className="cursor-pointer"
                  onClick={async () => {
                    setImages((prev) => prev.filter((p) => p.id !== image.id));
                    setFiles((prev) => prev.filter((p) => p.name !== image.id));
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
                    await deleteProductImage(image.id);
                  }}
                />
              </div>
            ))}
          </div>

          {isEditorMounted ? (
            <div className="col-span-1 items-center md:col-span-2 w-full mt-5 prose prose-neutral dark:prose-invert">
              <h3 className="w-full bg-transparent text-3xl font-bold">
                Description
              </h3>
              <div id="editor" className="min-h-[360px] w-full" />
              <p className="text-sm text-gray-500">
                Use{" "}
                <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                  Tab
                </kbd>{" "}
                to open the command menu.
              </p>
            </div>
          ) : undefined}
        </form>
      </Form>

      {product ? (
        <SystemInfo
          items={[
            {
              label: "Id",
              value: product.id,
            },
            {
              label: "Created At",
              value: formatDateTime(product.createdAt),
            },
            {
              label: "Updated At",
              value: timesAgo(product.updatedAt),
            },
            {
              label: "Created By",
              value: product.createdBy.name,
            },
            {
              label: "Updated By",
              value: product.updatedBy.name,
            },
          ]}
        />
      ) : undefined}
    </Shell>
  );
};
