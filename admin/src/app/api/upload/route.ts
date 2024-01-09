import { NextRequest, NextResponse } from 'next/server'

import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { storageClient } from '@/lib/storageClient'

export async function POST(request: NextRequest) {
  const session = await getAuthSession()
  console.log('before uploading...')

  if (!session)
    return NextResponse.json({
      success: false
    })
  console.log('uploading...')

  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  console.log({ data, file })

  if (!file) return NextResponse.json({ success: false })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filename = `${Date.now()}-${Math.random()}-${file.name}`

  console.log({ filename })

  const url = await storageClient.addFile({
    filename,
    data: buffer
  })

  console.log({ url })

  const { id } = await prisma.resource.create({
    data: {
      newFilename: filename,
      originalFilename: file.name,
      url
    }
  })
  console.log({ id })

  return NextResponse.json({ success: true, id, url })
}
