"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { useEditMode } from "./edit-mode-provider"
import { CMS } from "@/lib/cms"

export type EditableImageProps = {
  id: string
  className?: string
  alt?: string
  width?: number
  height?: number
  defaultSrc?: string
  rounded?: boolean
  fill?: boolean
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}

const STORAGE_PREFIX = "content:image:"

export default function EditableImage({ id, className = "", alt = "", width, height, defaultSrc = "", rounded = false, fill = false, objectFit = 'cover' }: EditableImageProps) {
  const { editMode } = useEditMode()
  const key = useMemo(() => STORAGE_PREFIX + id, [id])
  const [src, setSrc] = useState<string>(defaultSrc)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errMsg, setErrMsg] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const load = async () => {
      // Try Supabase CMS first
      try {
        const block = await CMS.getContentBlock(`image:${id}`)
        if (block?.html) {
          setSrc(block.html)
          if (typeof window !== "undefined") window.localStorage.setItem(key, block.html)
          return
        }
      } catch (e: any) {
        // Non-fatal: fall back to local cache/default
        console.warn("EditableImage CMS load failed", e?.message || e)
      }
      // Fallback to localStorage, then default
      const stored = window.localStorage.getItem(key)
      if (stored) setSrc(stored)
      else setSrc(defaultSrc)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const onPick = () => inputRef.current?.click()

  const onFile = async (file: File) => {
    if (!file || !file.type.startsWith("image/")) return
    // Optimistic preview
    const preview = URL.createObjectURL(file)
    setSrc(preview)
    setUploading(true)
    setSaved(false)
    setErrMsg(null)
    try {
      const form = new FormData()
      form.append("file", file)
      const res = await fetch("/api/upload/logo", { method: "POST", body: form })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Upload failed")
      const url = json.url as string
      setSrc(url)
      if (typeof window !== "undefined") window.localStorage.setItem(key, url)
      // Persist in Supabase CMS for cross-device
      try {
        await CMS.upsertContentBlock(`image:${id}`, url)
        setSaved(true)
      } catch (e: any) {
        console.warn("EditableImage CMS save failed", e?.message || e)
        // Fallback to server route that uses service role
        try {
          const res2 = await fetch('/api/cms/upsert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: `image:${id}`, html: url })
          })
          if (!res2.ok) {
            const j = await res2.json().catch(() => ({}))
            throw new Error(j?.error || 'Server upsert failed')
          }
          setSaved(true)
          setErrMsg(null)
        } catch (e2: any) {
          console.warn('EditableImage server upsert failed', e2?.message || e2)
          setErrMsg('Saved locally only. Please check your login or network.')
        }
      }
    } catch (e) {
      console.error(e)
      setErrMsg((e as any)?.message || "Upload failed")
      // keep optimistic preview in UI
    }
    setUploading(false)
  }

  return (
    <div className={editMode ? "relative group inline-block" : "inline-block"}>
      {/* image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src || defaultSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={(fill ? "absolute inset-0 w-full h-full " : "") + className + (rounded ? " rounded-full" : "")}
        style={{ objectFit }}
      />

      {/* controls */}
      {editMode && (
        <>
          <button
            type="button"
            onClick={onPick}
            className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm flex items-center justify-center"
            title="Change image"
          >
            Change Image
          </button>
          {/* status badges */}
          <div className="absolute top-2 right-2 flex flex-col items-end gap-1 select-none" aria-live="polite">
            {uploading && (
              <span className="px-2 py-1 rounded bg-emerald-600 text-white text-[11px] shadow">Uploading…</span>
            )}
            {saved && !uploading && !errMsg && (
              <span className="px-2 py-1 rounded bg-emerald-700 text-white text-[11px] shadow">Saved</span>
            )}
            {errMsg && (
              <span className="px-2 py-1 rounded bg-rose-600 text-white text-[11px] shadow" title={errMsg}>Save issue</span>
            )}
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
        </>
      )}
    </div>
  )
}
