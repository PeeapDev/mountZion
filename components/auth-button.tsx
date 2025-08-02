'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut } from "lucide-react"

export default function AuthButton() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const getDashboardLink = () => {
    if (!user) return '/dashboard'
    return user.role === 'admin' ? '/dashboard' : '/user-dashboard'
  }

  return user ? (
    <div className="flex items-center gap-4">
      <Link href={getDashboardLink()} className="text-green-700 hover:text-green-800 font-medium">
        Dashboard
      </Link>
      <Button
        onClick={handleLogout}
        variant="outline"
        className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  ) : (
    <Link href="/login">
      <Button className="bg-green-600 hover:bg-green-700">
        <LogIn className="mr-2 h-4 w-4" />
        Login
      </Button>
    </Link>
  )
}
