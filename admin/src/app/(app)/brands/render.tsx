'use client'

import Link from 'next/link'
import { FC } from 'react'

import { DataTable } from '@/components/data-table/data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Heading } from '@/components/heading'
import { Icons } from '@/components/icons'
import { Shell } from '@/components/shell'
import { Button } from '@/components/ui/button'
import { formatDateTime, timesAgo } from '@/lib/formatDate'
import { GetBrandsFnDataType } from './actions'

export const Render: FC<{
  data: GetBrandsFnDataType
}> = ({ data }) => {
  return (
    <Shell>
      <Heading heading="Brands" text="List of all the brands">
        <Link href="/brands/new">
          <Button>
            <Icons.add className="mr-2 h-4 w-4" />
            New
          </Button>
        </Link>
      </Heading>
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
                href={`/brands/${row.original.id}`}
              >
                {row.original.name}
              </Link>
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
        data={data.brands}
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
