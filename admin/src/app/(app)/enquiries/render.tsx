'use client'

import Link from 'next/link'
import { FC } from 'react'

import { DataTable } from '@/components/data-table/data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Heading } from '@/components/heading'
import { Shell } from '@/components/shell'
import { formatDateTime, timesAgo } from '@/lib/formatDate'
import { GetEnquiriesFnDataType } from './actions'

export const Render: FC<{
  data: GetEnquiriesFnDataType
}> = ({ data }) => {
  return (
    <Shell>
      <Heading heading="Enquiries" text="List of all the enquiries"></Heading>
      <DataTable
        columns={[
          {
            accessorKey: 'name',
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title="Name" />
            ),
            cell: ({ row }) => (
              <Link
                className="underline underline-offset-4"
                href={`/enquiries/${row.original.id}`}
              >
                {row.original.name}
              </Link>
            )
          },
          {
            accessorKey: 'phone',
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title="Phone" />
            )
          },
          {
            accessorKey: 'email',
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title="Email" />
            )
          },
          {
            accessorKey: 'createdAt',
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title="Created At" />
            ),
            cell: ({ row }) => formatDateTime(row.original.createdAt)
          },
          {
            accessorKey: 'updatedAt',
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title="Updated At" />
            ),
            cell: ({ row }) => timesAgo(row.original.updatedAt)
          }
        ]}
        data={data.enquiries}
        total={data.total}
        searchableColumns={[
          {
            id: 'name',
            title: 'Name'
          }
        ]}
      />
    </Shell>
  )
}
