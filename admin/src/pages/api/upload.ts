import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { parseMultipartRequest } from '@/lib/parseMultipartRequest'
import { storageClient } from '@/lib/storageClient'
import { readFile } from 'fs/promises'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).send({
      message: 'Method not allowed'
    })

  const session = await getServerSession(req, res, authOptions)

  if (!session)
    return res.status(401).send({
      message: 'Unauthorized'
    })

  const { files } = await parseMultipartRequest(req)

  const createdAttachments: any[] = []

  for (const key in files) {
    const file = files[key]
    if (!file) continue
    if (Array.isArray(file)) {
      for (const f of file) {
        if (!f.originalFilename || f.size > 26214400) continue
        const newFilename = `${Date.now()}-${f.originalFilename}`
        const url = await storageClient.addFile({
          filename: newFilename,
          data: await readFile(f.filepath)
        })
        const a = await prisma.resource.create({
          data: {
            newFilename,
            originalFilename: f.originalFilename,
            url
          }
        })
        createdAttachments.push(a)
      }
    }
  }

  return res.send({
    attachments: createdAttachments
  })
}
