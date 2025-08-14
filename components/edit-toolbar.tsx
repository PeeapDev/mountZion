"use client"

import { useEffect, useMemo, useState } from "react"
import { useEditMode } from "./edit-mode-provider"
import { useAuth } from "@/contexts/auth-context"
import { Pencil, Eye } from "lucide-react"

const STORAGE_PREFIX = "content:"

export default function EditToolbar() {
  const { user } = useAuth()
  const { editMode, setEditMode } = useEditMode()
  const [open, setOpen] = useState(true)

  // Only show to authenticated users
  if (!user) return null

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <button
        onClick={() => setEditMode(!editMode)}
        className={`h-12 w-12 rounded-full shadow-lg border transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          editMode
            ? "bg-emerald-600 text-white border-emerald-700 focus:ring-emerald-600"
            : "bg-white text-emerald-700 border-emerald-300 focus:ring-emerald-400"
        }`}
        title={editMode ? "Disable Edit Mode" : "Enable Edit Mode"}
        aria-label={editMode ? "Disable Edit Mode" : "Enable Edit Mode"}
      >
        {editMode ? <Eye className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
      </button>
    </div>
  )
}
