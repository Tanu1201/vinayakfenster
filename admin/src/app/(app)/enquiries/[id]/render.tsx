'use client'

import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { formatDateTime, timesAgo } from '@/lib/formatDate'
import Error from 'next/error'
import { GetEnquiryFnDataType, deleteEnquiry } from './actions'

export const Render: FC<{
  enquiry: GetEnquiryFnDataType | undefined
}> = ({ enquiry }) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  return enquiry ? (
    <Shell>
      <Heading heading={enquiry?.name || enquiry?.id || 'Error'} />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="col-span-1 mb-1 grid grid-cols-2 gap-2 sm:flex md:col-span-2">
          <Button type="button" onClick={() => router.back()} variant="ghost">
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {enquiry ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive">
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
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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
                        await deleteEnquiry(enquiry.id)
                        toast({
                          title: 'enquiry deleted'
                        })
                        router.push('/enquiries')
                      } catch (err) {
                        toast({
                          title: 'Error deleting enquiry',
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
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block">
            Name
          </label>
          <Input
            name="name"
            type="text"
            className="disabled:opacity-100"
            disabled
            defaultValue={enquiry.name}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block">
            Email
          </label>
          <Input
            name="email"
            type="email"
            className="disabled:opacity-100"
            disabled
            defaultValue={enquiry.email}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block"></label>
          <Input
            name="phone"
            type="tel"
            className="disabled:opacity-100"
            disabled
            defaultValue={enquiry.phone}
          />
        </div>
        <div>
          <label htmlFor="company" className="mb-2 block"></label>
          <Input
            name="company"
            type="text"
            className="disabled:opacity-100"
            disabled
            defaultValue={enquiry.companyName || ''}
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="message" className="mb-2 block">
            Message
          </label>
          <Textarea
            name="message"
            className="disabled:opacity-100"
            disabled
            defaultValue={enquiry.message}
          />
        </div>
      </div>

      {enquiry ? (
        <SystemInfo
          items={[
            {
              label: 'Id',
              value: enquiry.id
            },
            {
              label: 'Created At',
              value: formatDateTime(enquiry.createdAt)
            },
            {
              label: 'Updated At',
              value: timesAgo(enquiry.updatedAt)
            }
          ]}
        />
      ) : undefined}
    </Shell>
  ) : (
    <Error statusCode={404} withDarkMode={false} />
  )
}
