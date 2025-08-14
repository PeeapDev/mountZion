"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { CMS } from "@/lib/cms"
import { useEditMode } from "./edit-mode-provider"
import InlineFormatToolbar from "./inline-format-toolbar"

export type EditableTextProps = {
  id: string
  className?: string
  placeholder?: string
  defaultValue?: string
  as?: keyof JSX.IntrinsicElements // e.g., 'p', 'h1', 'h2', 'span'
}

const STORAGE_PREFIX = "content:"
const STYLE_PREFIX = "style:"

type TextStyle = {
  fontSize?: number
  color?: string
  fontWeight?: "normal" | "bold"
}

export default function EditableText({ id, className = "", placeholder = "Click to edit", defaultValue = "", as = "p" }: EditableTextProps) {
  const { editMode } = useEditMode()
  const key = useMemo(() => STORAGE_PREFIX + id, [id])
  const styleKey = useMemo(() => STYLE_PREFIX + id, [id])
  const [value, setValue] = useState<string>(defaultValue)
  const ref = useRef<HTMLElement>(null as any)
  const [styleState, setStyleState] = useState<TextStyle>({})
  const [focused, setFocused] = useState(false)
  const toolbarInteractRef = useRef(false)

  // Load initial value from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem(key)
    if (stored !== null) {
      setValue(stored)
    } else {
      setValue(defaultValue)
    }
    // Try Supabase: override local if newer exists
    ;(async () => {
      try {
        const row = await CMS.getContentBlock(key)
        if (row?.html) {
          setValue(row.html)
          window.localStorage.setItem(key, row.html)
        }
      } catch {}
    })()
  }, [key, defaultValue])

  // Save on change
  const save = (val: string) => {
    if (typeof window === "undefined") return
    setValue(val)
    window.localStorage.setItem(key, val)
  }

  // Load style from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return
    const raw = window.localStorage.getItem(styleKey)
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as TextStyle
        setStyleState(parsed)
      } catch {}
    }
  }, [styleKey])

  const saveStyle = (next: TextStyle) => {
    setStyleState(next)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(styleKey, JSON.stringify(next))
    }
  }

  const Element = as as any

  // --- Sanitizer: allow only span/strong/b/em/br and style props for color, font-weight, font-size ---
  const sanitizeHtml = (html: string) => {
    if (typeof window === "undefined") return html
    const wrapper = document.createElement("div")
    wrapper.innerHTML = html
    const allowedTags = new Set(["SPAN", "STRONG", "B", "EM", "BR"]) // text nodes always ok
    const walk = (node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement
        if (!allowedTags.has(el.tagName)) {
          // unwrap disallowed elements (keep children)
          const parent = el.parentNode
          if (parent) {
            while (el.firstChild) parent.insertBefore(el.firstChild, el)
            parent.removeChild(el)
            return
          }
        } else {
          // Clean attributes
          const keep: Record<string, string | undefined> = {}
          const style = el.getAttribute("style") || ""
          const styleObj: Record<string, string> = {}
          style.split(";").forEach((rule) => {
            const [k, v] = rule.split(":").map((s) => s && s.trim())
            if (!k || !v) return
            const key = k.toLowerCase()
            if (key === "color" || key === "font-weight" || key === "font-size") {
              styleObj[key] = v
            }
          })
          const styleStr = Object.entries(styleObj)
            .map(([k, v]) => `${k}: ${v}`)
            .join("; ")
          if (styleStr) keep.style = styleStr
          // reset attributes to only kept ones
          while (el.attributes.length > 0) el.removeAttribute(el.attributes[0].name)
          if (keep.style) el.setAttribute("style", keep.style)
        }
      }
      // walk children (may have been moved)
      let child = node.firstChild
      while (child) {
        const next = child.nextSibling
        walk(child)
        child = next
      }
    }
    walk(wrapper)
    return wrapper.innerHTML
  }

  // While editing, avoid React-controlled children to prevent caret jump.
  // Initialize content into the element when edit mode turns on or value changes.
  useEffect(() => {
    if (!editMode) return
    if (ref.current) {
      // Only set if different to avoid resetting caret unnecessarily
      const current = (ref.current as HTMLElement).innerHTML
      const next = value || ""
      if (current !== next) {
        ;(ref.current as HTMLElement).innerHTML = next
      }
    }
  }, [editMode, value])

  if (!editMode) {
    return (
      <Element
        className={className}
        style={{ fontSize: styleState.fontSize, color: styleState.color, fontWeight: styleState.fontWeight }}
        dangerouslySetInnerHTML={{ __html: value || defaultValue }}
      />
    )
  }

  return (
    <div className="relative inline-block">
      {focused && (
        <div
          className="absolute -top-12 right-0 z-20"
          onMouseDown={() => (toolbarInteractRef.current = true)}
          onMouseUp={() => (toolbarInteractRef.current = false)}
          onMouseLeave={() => (toolbarInteractRef.current = false)}
          onTouchStart={() => (toolbarInteractRef.current = true)}
          onTouchEnd={() => (toolbarInteractRef.current = false)}
        >
          <InlineFormatToolbar
            onBold={() => {
              // Toggle bold by wrapping selection
              applyStyleToSelection({ fontWeight: "bold" }, { toggleStrong: true })
            }}
            onColor={(hex) => applyStyleToSelection({ color: hex })}
            onIncSize={() => applyStyleToSelection({ fontSizeDelta: 2 })}
            onDecSize={() => applyStyleToSelection({ fontSizeDelta: -2 })}
          />
        </div>
      )}
      <Element
        ref={ref}
        className={className + " outline-none ring-2 ring-dashed ring-emerald-400/60 rounded-sm p-1"}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setFocused(true)}
        onInput={async (e: React.FormEvent<HTMLElement>) => {
          const html = sanitizeHtml((e.currentTarget as HTMLElement).innerHTML)
          if (typeof window !== "undefined") window.localStorage.setItem(key, html)
          // best-effort upsert (debounced behavior can be added later)
          try { await CMS.upsertContentBlock(key, html) } catch {}
          // Do NOT set state here to preserve caret position
        }}
        onBlur={async (e: React.FocusEvent<HTMLElement>) => {
          const html = sanitizeHtml((e.currentTarget as HTMLElement).innerHTML)
          save(html) // commit to state for view mode
          try { await CMS.upsertContentBlock(key, html) } catch {}
          // If we're interacting with the toolbar, keep it open
          if (!toolbarInteractRef.current) setFocused(false)
        }}
        data-placeholder={placeholder}
        style={{
          minHeight: 10,
          fontSize: styleState.fontSize,
          color: styleState.color,
          fontWeight: styleState.fontWeight,
        }}
      />
    </div>
  )
}

// Helpers for selection-based styling
function getSelectionIn(el: HTMLElement): Range | null {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return null
  const range = sel.getRangeAt(0)
  if (!el.contains(range.commonAncestorContainer)) return null
  return range
}

type StyleCommand = { color?: string; fontSizeDelta?: number; fontWeight?: "bold" } | { toggleStrong: true }

function applyStyleToSelection(style: StyleCommand, opts?: { toggleStrong?: boolean }) {
  const active = document.activeElement as HTMLElement | null
  if (!active || !(active.isContentEditable)) return
  const range = getSelectionIn(active)
  if (!range || range.collapsed) return
  const doc = active.ownerDocument
  if (!doc) return

  // Extract contents
  const frag = range.extractContents()
  const span = doc.createElement("span")
  span.appendChild(frag)

  // Compute base font size if needed
  let baseSize = 16
  try {
    const parentEl = range.startContainer instanceof Element ? (range.startContainer as Element) : (range.startContainer.parentElement as Element)
    if (parentEl) {
      const cs = window.getComputedStyle(parentEl)
      const parsed = parseInt(cs.fontSize || "16", 10)
      if (!Number.isNaN(parsed)) baseSize = parsed
    }
  } catch {}

  const styles: Record<string, string> = {}
  if ("toggleStrong" in (opts || {})) {
    // If entire selection is already inside <strong>, we could unwrap; simple approach: wrap in <strong>
    const strong = doc.createElement("strong")
    strong.appendChild(span)
    range.insertNode(strong)
    // move caret to end
    range.setStartAfter(strong)
    range.collapse(true)
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
    return
  }

  if ("fontWeight" in style && style.fontWeight === "bold") {
    styles["font-weight"] = "bold"
  }
  if ("color" in style && style.color) {
    styles["color"] = style.color!
  }
  if ("fontSizeDelta" in style && typeof style.fontSizeDelta === "number") {
    styles["font-size"] = `${Math.max(10, baseSize + style.fontSizeDelta)}px`
  }
  const styleStr = Object.entries(styles)
    .map(([k, v]) => `${k}: ${v}`)
    .join("; ")
  if (styleStr) span.setAttribute("style", styleStr)

  range.insertNode(span)
  // place caret after inserted span
  const newRange = doc.createRange()
  newRange.setStartAfter(span)
  newRange.collapse(true)
  const sel = window.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(newRange)
}
