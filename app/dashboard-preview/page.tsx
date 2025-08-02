import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  LogOut, 
  User, 
  Users, 
  Calendar, 
  BookOpen, 
  DollarSign, 
  BarChart3, 
  Settings, 
  Bell,
  Church,
  GraduationCap,
  FileText,
  MessageSquare,
  UserCheck,
  TrendingUp,
  Clock,
  MapPin
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DashboardPreviewPage() {
  // Mock user data for preview
  const user = { email: "admin@mountzion.org" }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-amber-50 border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center">
              <Church className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-amber-900">Mount Zion Training Centre</h1>
              <p className="text-xs text-amber-700">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              Preview Mode
            </Badge>
            <Link href="/">
              <Button
                variant="outline"
                className="border-amber-700 text-amber-700 hover:bg-amber-50 bg-transparent"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Back to Website
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-amber-900">Welcome back, Admin</h1>
              <p className="text-amber-700">Logged in as {user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Clock className="w-3 h-3 mr-1" />
                System Online
              </Badge>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-900">1,234</div>
                <p className="text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-900">24</div>
                <p className="text-xs text-blue-600">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  3 starting this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-900">$12,450</div>
                <p className="text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  +8% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-900">8</div>
                <p className="text-xs text-amber-600">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Next: Leadership Workshop
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Student Management */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-amber-600" />
                  <CardTitle>Student Management</CardTitle>
                </div>
                <CardDescription>Manage student enrollment, records, and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <UserCheck className="w-4 h-4 mr-2" />
                    View All Students
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Add New Student
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Student Reports
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Course Management */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-amber-600" />
                  <CardTitle>Course Management</CardTitle>
                </div>
                <CardDescription>Create and manage training courses and curricula</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View All Courses
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Create New Course
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Classes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Financial Management */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-6 w-6 text-amber-600" />
                  <CardTitle>Financial Management</CardTitle>
                </div>
                <CardDescription>Track payments, fees, and financial reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Payment Records
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Financial Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Invoice Management
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Event Management */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-6 w-6 text-amber-600" />
                  <CardTitle>Event Management</CardTitle>
                </div>
                <CardDescription>Organize workshops, seminars, and church events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Events
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Church className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Venue Management
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Communication */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-6 w-6 text-amber-600" />
                  <CardTitle>Communication</CardTitle>
                </div>
                <CardDescription>Send announcements and manage communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Announcement
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Newsletter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Settings */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Settings className="h-6 w-6 text-amber-600" />
                  <CardTitle>System Settings</CardTitle>
                </div>
                <CardDescription>Configure system preferences and user roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    General Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    User Roles
                  </Button>
                  <Link href="/" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Church className="w-4 h-4 mr-2" />
                      View Website
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Enrollments</CardTitle>
                <CardDescription>Latest student registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Doe", course: "Leadership Skills", date: "2 hours ago" },
                    { name: "Mary Johnson", course: "Biblical Interpretation", date: "5 hours ago" },
                    { name: "David Wilson", course: "Entrepreneurship", date: "1 day ago" },
                    { name: "Sarah Brown", course: "Public Speaking", date: "2 days ago" },
                  ].map((enrollment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                      <div>
                        <p className="font-medium text-amber-900">{enrollment.name}</p>
                        <p className="text-sm text-amber-600">{enrollment.course}</p>
                      </div>
                      <span className="text-xs text-gray-500">{enrollment.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Schedule</CardTitle>
                <CardDescription>Today's and upcoming events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { event: "Leadership Workshop", time: "10:00 AM", type: "Workshop" },
                    { event: "Financial Literacy Class", time: "2:00 PM", type: "Course" },
                    { event: "Staff Meeting", time: "4:00 PM", type: "Meeting" },
                    { event: "Youth Leadership Program", time: "Tomorrow 9:00 AM", type: "Program" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-medium text-amber-900">{item.event}</p>
                        <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                      </div>
                      <span className="text-sm text-amber-600">{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100">
        <div className="container mx-auto px-4 lg:px-6 py-8 text-center">
          <p className="text-amber-300">
            &copy; {new Date().getFullYear()} Mount Zion Training Centre. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
