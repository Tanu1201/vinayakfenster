"use client";

import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Brand } from "@prisma/client";
import { Delete } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GetBrandsFnDataType } from "../brands/actions";
import { deleteTopBrand, updateTopBrands } from "./actions";

const BrandSchema = z.object({
  id: z.string().optional(),
});

type FormData = z.infer<typeof BrandSchema>;

export const Render: FC<{
  data: Brand[];
  allBrands: GetBrandsFnDataType["brands"];
}> = ({ data, allBrands }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(BrandSchema),
  });

  const [isSaving, setIsSaving] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<
    {
      id: string;
      name: string;
    }[]
  >(data.map((brand) => ({ id: brand.id, name: brand.name })) ?? []);

  const router = useRouter();

  async function onSubmit() {
    setIsSaving(true);
    try {
      if (!selectedBrands.length)
        return toast({
          title: "Please select at least one brand",
          variant: "destructive",
        });
      await updateTopBrands(selectedBrands.map((b) => b.id));

      toast({
        title: "Top Brands saved",
      });
    } catch (err) {
      toast({
        title: "Error saving top brands",
        variant: "destructive",
      });
    }
    return setIsSaving(false);
  }

  return (
    <Shell>
      <Heading heading="Top Brands" text="List of top brands">
        <Button>
          <Icons.add className="mr-2 h-4 w-4" />
          New
        </Button>
      </Heading>

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
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.save className="mr-2 h-4 w-4" />
              )}
              <span>Save</span>
            </Button>
          </div>

          <FormField
            control={form.control}
            name="id"
            render={() => (
              <FormItem>
                <FormLabel>Top Brands</FormLabel>
                <Select
                  onValueChange={(value) => {
                    const [id, name] = value.split("<->");
                    if (!id || !name) return;
                    setSelectedBrands((prev) => [...prev, { id, name }]);
                  }}
                  disabled={isSaving || selectedBrands.length >= 5}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select top brands" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allBrands
                      .filter(
                        (brand) =>
                          !selectedBrands.find((b) => b.id === brand.id)
                      )
                      ?.map(({ id, name }) => (
                        <SelectItem key={id} value={id + "<->" + name}>
                          {name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {selectedBrands.map(({ id, name }) => (
        <div key={id} className="flex gap-8">
          <p>{name}</p>
          <Delete
            className="cursor-pointer"
            color="red"
            onClick={async () => {
              setSelectedBrands((prev) => prev.filter((b) => b.id !== id));
              await deleteTopBrand(id);
              toast({
                title: `${name} removed from top brands`,
              });
            }}
          />
        </div>
      ))}
    </Shell>
  );
};
