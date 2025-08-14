"use client"

import { useEffect, useMemo, useState } from "react"
import { useEditMode } from "./edit-mode-provider"
import { useAuth } from "@/contexts/auth-context"
import { Pencil, Eye, Trash2 } from "lucide-react"

const STORAGE_PREFIX = "content:"

export default function EditToolbar() {
  const { user } = useAuth()
  const { editMode, setEditMode } = useEditMode()
  const [open, setOpen] = useState(true)

  // Only show to authenticated users
  if (!user) return null

  const clearAllContent = () => {
    if (typeof window === "undefined") return
    if (!confirm("Clear all inline edited content on this device? This cannot be undone.")) return
    const keysToRemove: string[] = []
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i)
      if (k && k.startsWith(STORAGE_PREFIX)) keysToRemove.push(k)
    }
    keysToRemove.forEach((k) => window.localStorage.removeItem(k))
    alert("Cleared. Refresh the page to see defaults.")
  }

  return (
    <div className="fixed bottom-4 right-4 z-[1000]">
      <div className="bg-white/90 backdrop-blur border border-emerald-300 shadow-xl rounded-xl p-3 flex items-center gap-2">
        <button
          onClick={() => setEditMode(!editMode)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium border ${editMode ? "bg-emerald-600 text-white border-emerald-700" : "bg-white text-emerald-700 border-emerald-400"}`}
          title={editMode ? "Disable Edit Mode" : "Enable Edit Mode"}
        >
          {editMode ? <Pencil className="w-4 h-4" /> : <Eye className="w-4 h-4" />} {editMode ? "Editing" : "View"}
        </button>
        <button
          onClick={clearAllContent}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium border bg-white text-rose-700 border-rose-300"
          title="Clear all inline content (local)"
        >
          <Trash2 className="w-4 h-4" /> Clear Local Content
        </button>
      </div>
    </div>
  )
}
