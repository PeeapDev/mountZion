import { NextResponse } from 'next/server'
import { UTApi } from 'uploadthing/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // UploadThing server SDK
    const token = process.env.UPLOADTHING_TOKEN
    if (!token) {
      return NextResponse.json({ error: 'Missing UPLOADTHING_TOKEN' }, { status: 500 })
    }
    const utapi = new UTApi({ token })

    // Ensure a unique filename prefix
    const filename = `${Date.now()}-${file.name}`
    const webFile = new File([await file.arrayBuffer()], filename, { type: file.type || 'application/octet-stream' })
    const result = await utapi.uploadFiles(webFile)
    if (!result?.data?.url) {
      return NextResponse.json({ error: result?.error?.message || 'Upload failed' }, { status: 500 })
    }
    return NextResponse.json({ url: result.data.url })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Upload failed' }, { status: 500 })
  }
}
