'use client'

import Link from 'next/link'
import { FC } from 'react'

import { DataTable } from '@/components/data-table/data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Heading } from '@/components/heading'
import { Icons } from '@/components/icons'
import { Shell } from '@/components/shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDateTime, timesAgo } from '@/lib/formatDate'
import { GetProductsFnDataType } from './actions'

export const Render: FC<{
  data: GetProductsFnDataType
}> = ({ data }) => {
  return (
    <Shell>
      <Heading heading="Products" text="List of all the products">
        <Link href="/products/new">
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
                href={`/products/${row.original.id}`}
              >
                {row.original.name}
              </Link>
            )
          },
          {
            accessorKey: 'brand',
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title="Brands" />
            ),
            cell: ({ row }) => (
              <div className="flex gap-1">
                {row.original.productBrands.map(productBrand => (
                  <Link
                    key={productBrand.id}
                    className="underline underline-offset-4"
                    href={`/brands/${productBrand.brand?.id}`}
                  >
                    <Badge>{productBrand.brand?.name}</Badge>
                  </Link>
                ))}
              </div>
            ),
            enableSorting: false
          },
          {
            accessorKey: 'category',
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title="Categories" />
            ),
            cell: ({ row }) => (
              <div className="flex gap-1">
                {row.original.productCategories.map(productCategory => (
                  <Link
                    key={productCategory.id}
                    className="underline underline-offset-4"
                    href={`/categories/${productCategory.category?.id}`}
                  >
                    <Badge>{productCategory.category?.name}</Badge>
                  </Link>
                ))}
              </div>
            ),
            enableSorting: false
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
        data={data.products}
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
