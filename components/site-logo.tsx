"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { GraduationCap } from "lucide-react"
import { useEditMode } from "./edit-mode-provider"
import { CMS } from "@/lib/cms"

interface Props {
  className?: string
  size?: number
  rounded?: boolean
}

const STORAGE_KEY = "siteLogoUrl"

export default function SiteLogo({ className = "", size = 40, rounded = true }: Props) {
  const { editMode } = useEditMode()
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errMsg, setErrMsg] = useState<string | null>(null)
  const cmsKey = useMemo(() => "site:logo", [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const load = async () => {
      try {
        const block = await CMS.getContentBlock(cmsKey)
        if (block?.html) {
          setLogoUrl(block.html)
          window.localStorage.setItem(STORAGE_KEY, block.html)
          return
        }
      } catch (e) {
        console.warn("SiteLogo CMS load failed", (e as any)?.message || e)
      }
      const cached = window.localStorage.getItem(STORAGE_KEY)
      if (cached) setLogoUrl(cached)
      else setLogoUrl(null)
    }
    load()
  }, [cmsKey])

  const onPick = () => inputRef.current?.click()

  const onFile = async (file: File) => {
    if (!file || !file.type.startsWith("image/")) return
    setUploading(true)
    setSaved(false)
    setErrMsg(null)
    // Optimistic preview
    const preview = URL.createObjectURL(file)
    setLogoUrl(preview)
    try {
      const form = new FormData()
      form.append("file", file)
      const res = await fetch("/api/upload/logo", { method: "POST", body: form })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Upload failed")
      const url = json.url as string
      setLogoUrl(url)
      if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, url)
      // client CMS upsert
      try {
        await CMS.upsertContentBlock(cmsKey, url)
        setSaved(true)
        setErrMsg(null)
      } catch (e: any) {
        console.warn("SiteLogo CMS save failed", e?.message || e)
        // server fallback
        try {
          const res2 = await fetch('/api/cms/upsert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: cmsKey, html: url })
          })
          if (!res2.ok) {
            const j = await res2.json().catch(() => ({}))
            throw new Error(j?.error || 'Server upsert failed')
          }
          setSaved(true)
          setErrMsg(null)
        } catch (e2: any) {
          console.warn('SiteLogo server upsert failed', e2?.message || e2)
          setErrMsg('Saved locally only. Please check login or network.')
        }
      }
      // dispatch update for any legacy listeners
      try {
        window.dispatchEvent(new CustomEvent<string>('site-logo-updated', { detail: url }))
      } catch {}
    } catch (e) {
      console.error(e)
      setErrMsg((e as any)?.message || 'Upload failed')
    }
    setUploading(false)
  }

  const imgEl = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoUrl || "/images/mount-zion-logo.png"}
      alt="Site logo"
      className={className + (rounded ? " rounded-full" : "")}
      style={{ width: size, height: size, objectFit: 'contain', background: 'white' }}
    />
  )

  if (!editMode) return imgEl

  return (
    <div className="relative group inline-block" style={{ width: size, height: size }}>
      {imgEl}
      <button
        type="button"
        onClick={onPick}
        className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs flex items-center justify-center rounded-full"
        title="Change logo"
      >
        Change Logo
      </button>
      <div className="absolute -top-2 -right-2 flex flex-col items-end gap-1 select-none" aria-live="polite">
        {uploading && <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] shadow">Uploading…</span>}
        {saved && !uploading && !errMsg && <span className="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] shadow">Saved</span>}
        {errMsg && <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] shadow" title={errMsg}>Save issue</span>}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFile(file)
        }}
      />
    </div>
  )
}
