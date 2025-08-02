'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SidebarNav from "@/components/sidebar-nav"
import { motion } from "framer-motion"
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Clock,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  GraduationCap,
  UserPlus,
  FileText,
  Activity,
  AlertCircle,
  CheckCircle,
  Star,
  Award,
  Target,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Eye,
  Edit,
  Plus,
  ArrowRight,
  Zap
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
}

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-700">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Redirect to user dashboard if not admin
  if (user.role !== 'admin') {
    router.push('/user-dashboard')
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-green-50 border-b border-green-200 sticky top-0 z-50">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-900">Mount Zion Training Centre</h1>
              <p className="text-xs text-green-700">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-green-700">Welcome, {user.name}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarNav />
        
        {/* Main Content */}
        <motion.main 
          className="flex-1 ml-64 p-2 max-h-screen overflow-y-auto bg-gray-50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-7xl mx-auto space-y-2">
            {/* Welcome Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Dashboard Overview</h1>
                  <p className="text-gray-600 text-xs">Welcome back, {user.email} ({user.role})</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    <Activity className="w-3 h-3 mr-1" />
                    Online
                  </Badge>
                  <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                    <Bell className="w-3 h-3 mr-1" />
                    Alerts
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Stats Overview */}
            <motion.div className="grid grid-cols-4 gap-2 mb-2" variants={itemVariants}>
              <Card>
                <CardContent className="p-2">
                  <div className="text-center">
                    <div className="bg-blue-100 p-1.5 rounded-full w-fit mx-auto mb-1">
                      <Users className="h-3 w-3 text-blue-600" />
                    </div>
                    <p className="text-xs font-medium text-gray-600">Students</p>
                    <p className="text-lg font-bold text-gray-900">1,234</p>
                    <p className="text-xs text-green-600">
                      <TrendingUp className="w-2 h-2 inline mr-1" />
                      +12%
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-2">
                  <div className="text-center">
                    <div className="bg-green-100 p-1.5 rounded-full w-fit mx-auto mb-1">
                      <BookOpen className="h-3 w-3 text-green-600" />
                    </div>
                    <p className="text-xs font-medium text-gray-600">Courses</p>
                    <p className="text-lg font-bold text-gray-900">24</p>
                    <p className="text-xs text-blue-600">
                      <Calendar className="w-2 h-2 inline mr-1" />
                      3 new
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-2">
                  <div className="text-center">
                    <div className="bg-purple-100 p-1.5 rounded-full w-fit mx-auto mb-1">
                      <DollarSign className="h-3 w-3 text-purple-600" />
                    </div>
                    <p className="text-xs font-medium text-gray-600">Revenue</p>
                    <p className="text-lg font-bold text-gray-900">$12.4K</p>
                    <p className="text-xs text-green-600">
                      <TrendingUp className="w-2 h-2 inline mr-1" />
                      +8%
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-2">
                  <div className="text-center">
                    <div className="bg-orange-100 p-1.5 rounded-full w-fit mx-auto mb-1">
                      <Calendar className="h-3 w-3 text-orange-600" />
                    </div>
                    <p className="text-xs font-medium text-gray-600">Events</p>
                    <p className="text-lg font-bold text-gray-900">8</p>
                    <p className="text-xs text-green-600">
                      <Clock className="w-2 h-2 inline mr-1" />
                      Today: 3
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>



            {/* Quick Actions */}
            <motion.div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-2" variants={itemVariants}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-2 text-center">
                  <UserPlus className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs font-medium">Add Student</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-2 text-center">
                  <Plus className="h-4 w-4 mx-auto mb-1 text-green-600" />
                  <p className="text-xs font-medium">New Course</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-2 text-center">
                  <Calendar className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                  <p className="text-xs font-medium">Schedule</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-2 text-center">
                  <BarChart3 className="h-4 w-4 mx-auto mb-1 text-orange-600" />
                  <p className="text-xs font-medium">Reports</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-2 text-center">
                  <Mail className="h-4 w-4 mx-auto mb-1 text-teal-600" />
                  <p className="text-xs font-medium">Messages</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-2 text-center">
                  <Settings className="h-4 w-4 mx-auto mb-1 text-gray-600" />
                  <p className="text-xs font-medium">Settings</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-2" variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Recent Enrollments</CardTitle>
                  <CardDescription className="text-xs">Latest student registrations</CardDescription>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="space-y-2">
                    {[
                      { name: "John Doe", course: "Leadership Skills", date: "2h ago" },
                      { name: "Mary Johnson", course: "Biblical Interpretation", date: "5h ago" },
                      { name: "David Wilson", course: "Entrepreneurship", date: "1d ago" },
                      { name: "Sarah Brown", course: "Public Speaking", date: "2d ago" },
                    ].map((enrollment, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-md">
                        <div>
                          <p className="font-medium text-gray-900 text-xs">{enrollment.name}</p>
                          <p className="text-xs text-gray-600">{enrollment.course}</p>
                        </div>
                        <span className="text-xs text-gray-500">{enrollment.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Today's Schedule</CardTitle>
                  <CardDescription className="text-xs">Upcoming events and classes</CardDescription>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="space-y-2">
                    {[
                      { event: "Leadership Workshop", time: "10:00 AM", type: "Workshop" },
                      { event: "Financial Literacy", time: "2:00 PM", type: "Course" },
                      { event: "Staff Meeting", time: "4:00 PM", type: "Meeting" },
                      { event: "Youth Program", time: "6:00 PM", type: "Program" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                        <div>
                          <p className="font-medium text-gray-900 text-xs">{item.event}</p>
                          <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                        </div>
                        <span className="text-xs text-gray-600">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* System Status */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Activity className="h-4 w-4 text-green-600" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="text-center p-2 bg-green-50 rounded-md">
                      <CheckCircle className="h-4 w-4 mx-auto mb-1 text-green-600" />
                      <p className="text-xs font-medium">Database</p>
                      <p className="text-xs text-green-600">Online</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-md">
                      <CheckCircle className="h-4 w-4 mx-auto mb-1 text-green-600" />
                      <p className="text-xs font-medium">API</p>
                      <p className="text-xs text-green-600">Healthy</p>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 rounded-md">
                      <AlertCircle className="h-4 w-4 mx-auto mb-1 text-yellow-600" />
                      <p className="text-xs font-medium">Storage</p>
                      <p className="text-xs text-yellow-600">85% Full</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-md">
                      <Zap className="h-4 w-4 mx-auto mb-1 text-green-600" />
                      <p className="text-xs font-medium">Performance</p>
                      <p className="text-xs text-green-600">Optimal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.main>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-green-100">
        <div className="px-6 py-8 text-center">
          <p className="text-green-300">
            &copy; {new Date().getFullYear()} Mount Zion Training Centre. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
