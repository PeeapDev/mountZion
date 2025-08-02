'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from "@/components/ui/button"
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  Settings,
  UserCheck,
  User,
  BarChart3,
  GraduationCap,
  FileText,
  Church,
  MapPin,
  Bell,
  ChevronDown,
  ChevronRight,
  LogOut,
  Power
} from "lucide-react"
import Link from "next/link"

interface NavItem {
  title: string
  icon: React.ReactNode
  href?: string
  children?: {
    title: string
    icon: React.ReactNode
    href: string
  }[]
}

const navigationItems: NavItem[] = [
  {
    title: "Student Management",
    icon: <Users className="h-5 w-5" />,
    children: [
      { title: "View All Students", icon: <UserCheck className="h-4 w-4" />, href: "/dashboard/students" },
      { title: "Add New Student", icon: <User className="h-4 w-4" />, href: "/dashboard/students/add" },
      { title: "Student Reports", icon: <BarChart3 className="h-4 w-4" />, href: "/dashboard/students/reports" },
    ]
  },
  {
    title: "Course Management",
    icon: <BookOpen className="h-5 w-5" />,
    children: [
      { title: "View All Courses", icon: <BookOpen className="h-4 w-4" />, href: "/dashboard/courses" },
      { title: "Create New Course", icon: <GraduationCap className="h-4 w-4" />, href: "/dashboard/courses/add" },
      { title: "Schedule Classes", icon: <Calendar className="h-4 w-4" />, href: "/dashboard/courses/schedule" },
    ]
  },
  {
    title: "Financial Management",
    icon: <DollarSign className="h-5 w-5" />,
    children: [
      { title: "Payment Records", icon: <DollarSign className="h-4 w-4" />, href: "/dashboard/finance/payments" },
      { title: "Financial Reports", icon: <BarChart3 className="h-4 w-4" />, href: "/dashboard/finance/reports" },
      { title: "Invoice Management", icon: <FileText className="h-4 w-4" />, href: "/dashboard/finance/invoices" },
    ]
  },
  {
    title: "Event Management",
    icon: <Calendar className="h-5 w-5" />,
    children: [
      { title: "View Events", icon: <Calendar className="h-4 w-4" />, href: "/dashboard/events" },
      { title: "Create Event", icon: <Church className="h-4 w-4" />, href: "/dashboard/events/add" },
      { title: "Venue Management", icon: <MapPin className="h-4 w-4" />, href: "/dashboard/events/venues" },
    ]
  },
  {
    title: "Communication",
    icon: <MessageSquare className="h-5 w-5" />,
    children: [
      { title: "Send Announcement", icon: <MessageSquare className="h-4 w-4" />, href: "/dashboard/communication/announcements" },
      { title: "Notifications", icon: <Bell className="h-4 w-4" />, href: "/dashboard/communication/notifications" },
      { title: "Newsletter", icon: <FileText className="h-4 w-4" />, href: "/dashboard/communication/newsletter" },
    ]
  },
  {
    title: "System Settings",
    icon: <Settings className="h-5 w-5" />,
    children: [
      { title: "General Settings", icon: <Settings className="h-4 w-4" />, href: "/dashboard/settings/general" },
      { title: "User Roles", icon: <User className="h-4 w-4" />, href: "/dashboard/settings/roles" },
      { title: "View Website", icon: <Church className="h-4 w-4" />, href: "/" },
    ]
  },
]

export default function SidebarNav() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const { logout } = useAuth()
  const router = useRouter()

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="w-64 bg-gradient-to-b from-green-800 via-green-700 to-green-900 h-full shadow-xl fixed left-0 top-0 z-40">
      {/* Header */}
      <div className="p-4 border-b border-green-600">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-green-700" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Mount Zion</h2>
            <p className="text-xs text-green-200">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-3">
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-green-600 hover:text-white transition-all duration-200 rounded-lg"
                    onClick={() => toggleExpanded(item.title)}
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-lg mr-3">
                      {item.icon}
                    </div>
                    <span className="flex-1 text-left text-sm font-medium">{item.title}</span>
                    {expandedItems.includes(item.title) ? (
                      <ChevronDown className="h-4 w-4 text-green-200" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-green-200" />
                    )}
                  </Button>
                  {expandedItems.includes(item.title) && (
                    <div className="ml-11 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-green-100 hover:bg-green-600 hover:text-white transition-all duration-200 rounded-md py-2"
                          >
                            <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-md mr-2">
                              {child.icon}
                            </div>
                            <span className="text-xs">{child.title}</span>
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={item.href || '#'}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-green-600 hover:text-white transition-all duration-200 rounded-lg"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-lg mr-3">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium">{item.title}</span>
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-green-600">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-red-200 hover:bg-red-600 hover:text-white transition-all duration-200 rounded-lg mb-2"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-lg mr-3">
            <LogOut className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">Logout</span>
        </Button>
        <div className="text-center">
          <p className="text-xs text-green-200">© 2024 Mount Zion</p>
          <p className="text-xs text-green-300">Training Centre</p>
        </div>
      </div>
    </div>
  )
}
