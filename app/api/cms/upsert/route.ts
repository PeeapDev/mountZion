import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { key, html } = await req.json()
    if (!key || typeof html !== 'string') {
      return NextResponse.json({ error: 'Missing key or html' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('content_blocks')
      .upsert({ key, html }, { onConflict: 'key' })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Upsert failed' }, { status: 500 })
  }
}
