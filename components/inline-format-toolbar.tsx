"use client"

import React from "react"
import { Bold } from "lucide-react"

type Props = {
  onBold: () => void
  onColor: (hex: string) => void
  onIncSize: () => void
  onDecSize: () => void
}

export default function InlineFormatToolbar({ onBold, onColor, onIncSize, onDecSize }: Props) {
  return (
    <div className="flex items-center gap-2 bg-white/95 border border-gray-200 rounded-md shadow-sm px-2 py-1">
      <button type="button" onClick={onDecSize} className="text-xs px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200" title="Decrease size">
        A-
      </button>
      <button type="button" onClick={onIncSize} className="text-xs px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200" title="Increase size">
        A+
      </button>
      <button type="button" onClick={onBold} className="text-xs px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 flex items-center gap-1" title="Bold">
        <Bold className="w-3 h-3" /> B
      </button>
      <label className="text-xs px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer" title="Text color">
        <span className="mr-1">Color</span>
        <input type="color" onChange={(e) => onColor(e.target.value)} className="w-6 h-6 align-middle p-0 border-0 bg-transparent cursor-pointer" />
      </label>
    </div>
  )
}
