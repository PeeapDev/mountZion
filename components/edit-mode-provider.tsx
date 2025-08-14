"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

type EditModeContextType = {
  editMode: boolean
  setEditMode: (v: boolean) => void
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined)

export default function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false)

  // Persist preference per browser session
  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem("inlineEditMode")
    if (stored) setEditMode(stored === "true")
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem("inlineEditMode", String(editMode))
  }, [editMode])

  const value = useMemo(() => ({ editMode, setEditMode }), [editMode])

  return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>
}

export function useEditMode() {
  const ctx = useContext(EditModeContext)
  if (!ctx) throw new Error("useEditMode must be used within EditModeProvider")
  return ctx
}
