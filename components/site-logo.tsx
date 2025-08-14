"use client"

import { useEffect, useState } from "react"
import { GraduationCap } from "lucide-react"

interface Props {
  className?: string
  size?: number
  rounded?: boolean
}

export default function SiteLogo({ className = "", size = 40, rounded = true }: Props) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const current = localStorage.getItem('siteLogoUrl')
    if (current) setLogoUrl(current)

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      setLogoUrl(detail || null)
    }
    window.addEventListener('site-logo-updated', handler as EventListener)
    return () => window.removeEventListener('site-logo-updated', handler as EventListener)
  }, [])

  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt="Site logo"
        className={className + (rounded ? " rounded-full" : "")}
        style={{ width: size, height: size, objectFit: 'contain', background: 'white' }}
      />
    )
  }

  return (
    <div
      className={className + (rounded ? " rounded-full" : "")}
      style={{ width: size, height: size, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <GraduationCap className="text-green-700" style={{ width: size * 0.6, height: size * 0.6 }} />
    </div>
  )
}
