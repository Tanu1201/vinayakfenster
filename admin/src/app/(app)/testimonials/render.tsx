"use client";

import Link from "next/link";
import { FC } from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { formatDateTime, timesAgo } from "@/lib/formatDate";
import { GetTestimonialsFnDataType } from "./actions";

export const Render: FC<{
  data: GetTestimonialsFnDataType;
}> = ({ data }) => {
  return (
    <Shell>
      <Heading heading="Testimonials" text="List of all the testimonials">
        <Link href="/testimonials/new">
          <Button>
            <Icons.add className="mr-2 h-4 w-4" />
            New
          </Button>
        </Link>
      </Heading>
      <DataTable
        columns={[
          {
            accessorKey: "name",
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title="Name" />
            ),
            cell: ({ row }) => (
              <Link
                className="underline underline-offset-4"
                href={`/testimonials/${row.original.id}`}
              >
                {row.original.name}
              </Link>
            ),
          },
          {
            accessorKey: "createdAt",
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title="Created At" />
            ),
            cell: ({ row }) => formatDateTime(row.original.createdAt),
          },
          {
            accessorKey: "updatedAt",
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title="Updated At" />
            ),
            cell: ({ row }) => timesAgo(row.original.updatedAt),
          },
        ]}
        data={data.testimonials}
        total={data.total}
        searchableColumns={[
          {
            id: "name",
            title: "Name",
          },
        ]}
      />
    </Shell>
  );
};
