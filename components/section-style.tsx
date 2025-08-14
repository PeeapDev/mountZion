"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Palette } from "lucide-react"
import { useEditMode } from "./edit-mode-provider"

export type SectionStyleValue = {
  backgroundColor?: string
  color?: string
}

type Props = {
  id: string
  className?: string
  children: React.ReactNode
}

const PREFIX = "section-style:"

export default function SectionStyle({ id, className = "", children }: Props) {
  const { editMode } = useEditMode()
  const key = useMemo(() => PREFIX + id, [id])
  const [val, setVal] = useState<SectionStyleValue>({})
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const raw = window.localStorage.getItem(key)
    if (raw) {
      try { setVal(JSON.parse(raw)) } catch {}
    }
  }, [key])

  const save = (next: SectionStyleValue) => {
    setVal(next)
    if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(next))
  }

  return (
    <section className={className} style={{ backgroundColor: val.backgroundColor, color: val.color, transition: "background-color .2s, color .2s" }}>
      {editMode && (
        <div className="sticky top-16 z-30 flex justify-end pr-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((s) => !s)}
              className="flex items-center gap-1 text-xs bg-white/95 border border-gray-200 rounded-md shadow-sm px-2 py-1 hover:bg-gray-50"
              title="Section colors"
            >
              <Palette className="w-4 h-4 text-emerald-600" />
              Colors
            </button>
            {open && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-3 flex items-center gap-3">
                <label className="text-xs flex items-center gap-2">
                  <span>BG</span>
                  <input type="color" value={val.backgroundColor ?? "#ffffff"} onChange={(e) => save({ ...val, backgroundColor: e.target.value })} />
                </label>
                <label className="text-xs flex items-center gap-2">
                  <span>Text</span>
                  <input type="color" value={val.color ?? "#0f172a"} onChange={(e) => save({ ...val, color: e.target.value })} />
                </label>
              </div>
            )}
          </div>
        </div>
      )}
      {children}
    </section>
  )
}
