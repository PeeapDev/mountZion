"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { useEditMode } from "./edit-mode-provider"

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

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem(key)
    if (stored) setSrc(stored)
    else setSrc(defaultSrc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const onPick = () => inputRef.current?.click()

  const onFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return
    const url = URL.createObjectURL(file)
    setSrc(url)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, url)
    }
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
