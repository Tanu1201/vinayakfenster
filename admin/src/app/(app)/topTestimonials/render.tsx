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
import { Testimonial } from "@prisma/client";
import { Delete } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GetTestimonialsFnDataType } from "../testimonials/actions";
import { deleteTopTestimonial, updateTopTestimonials } from "./actions";

const TestimonialSchema = z.object({
  id: z.string().optional(),
});

type FormData = z.infer<typeof TestimonialSchema>;

export const Render: FC<{
  data: Testimonial[];
  allTestimonials: GetTestimonialsFnDataType["testimonials"];
}> = ({ data, allTestimonials }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(TestimonialSchema),
  });

  const [isSaving, setIsSaving] = useState(false);
  const [selectedTestimonials, setSelectedTestimonials] = useState<
    {
      id: string;
      name: string;
    }[]
  >(
    data.map((testimonial) => ({
      id: testimonial.id,
      name: testimonial.name,
    })) ?? []
  );

  const router = useRouter();

  async function onSubmit() {
    setIsSaving(true);
    try {
      if (!selectedTestimonials.length)
        return toast({
          title: "Please select at least one testimonial",
          variant: "destructive",
        });
      await updateTopTestimonials(selectedTestimonials.map((b) => b.id));

      toast({
        title: "Top Testimonials saved",
      });
    } catch (err) {
      toast({
        title: "Error saving top testimonials",
        variant: "destructive",
      });
    }
    return setIsSaving(false);
  }

  return (
    <Shell>
      <Heading heading="Top Testimonials" text="List of top testimonials">
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
                <FormLabel>Top Testimonials</FormLabel>
                <Select
                  onValueChange={(value) => {
                    const [id, name] = value.split("<->");
                    if (!id || !name) return;
                    setSelectedTestimonials((prev) => [...prev, { id, name }]);
                  }}
                  disabled={isSaving || selectedTestimonials.length >= 3}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select top testimonials" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allTestimonials
                      .filter(
                        (testimonial) =>
                          !selectedTestimonials.find(
                            (b) => b.id === testimonial.id
                          )
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
      {selectedTestimonials.map(({ id, name }) => (
        <div key={id} className="flex gap-8">
          <p>{name}</p>
          <Delete
            className="cursor-pointer"
            color="red"
            onClick={async () => {
              setSelectedTestimonials((prev) =>
                prev.filter((b) => b.id !== id)
              );
              await deleteTopTestimonial(id);
              toast({
                title: `${name} removed from top testimonials`,
              });
            }}
          />
        </div>
      ))}
    </Shell>
  );
};
