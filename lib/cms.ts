import { supabase } from '@/lib/supabase/client'

export type ContentBlock = {
  key: string
  html: string
  updated_at?: string
}

export type SectionStyle = {
  id: string
  value: { backgroundColor?: string; color?: string }
  updated_at?: string
}

export const CMS = {
  async getContentBlock(key: string): Promise<ContentBlock | null> {
    const { data, error } = await supabase
      .from('content_blocks')
      .select('key, html, updated_at')
      .eq('key', key)
      .single()
    if (error) return null
    return data as ContentBlock
  },
  async upsertContentBlock(key: string, html: string): Promise<void> {
    // Upsert by key
    const { error } = await supabase
      .from('content_blocks')
      .upsert({ key, html }, { onConflict: 'key' })
    if (error) throw error
  },
  async getSectionStyle(id: string): Promise<SectionStyle | null> {
    const { data, error } = await supabase
      .from('section_styles')
      .select('id, value, updated_at')
      .eq('id', id)
      .single()
    if (error) return null
    return data as SectionStyle
  },
  async upsertSectionStyle(id: string, value: { backgroundColor?: string; color?: string }): Promise<void> {
    const { error } = await supabase
      .from('section_styles')
      .upsert({ id, value }, { onConflict: 'id' })
    if (error) throw error
  },
}

export const CMS_SQL_NOTE = `
-- Suggested schema (run in Supabase SQL editor)
create table if not exists public.content_blocks (
  key text primary key,
  html text not null,
  updated_at timestamp with time zone default now()
);

create table if not exists public.section_styles (
  id text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default now()
);

-- Optional RLS; allow authenticated editors to read/write
alter table public.content_blocks enable row level security;
alter table public.section_styles enable row level security;

create policy "content_blocks read" on public.content_blocks for select using (true);
create policy "content_blocks write" on public.content_blocks for insert with check (auth.role() = 'authenticated');
create policy "content_blocks update" on public.content_blocks for update using (auth.role() = 'authenticated');

create policy "section_styles read" on public.section_styles for select using (true);
create policy "section_styles write" on public.section_styles for insert with check (auth.role() = 'authenticated');
create policy "section_styles update" on public.section_styles for update using (auth.role() = 'authenticated');
`;
