'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  LogOut, 
  User, 
  BookOpen, 
  Calendar, 
  Award, 
  Bell,
  Church,
  Clock,
  FileText,
  Download,
  Star,
  CheckCircle,
  PlayCircle
} from "lucide-react"
import Link from "next/link"

export default function UserDashboardPage() {
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

  // Redirect to admin dashboard if admin
  if (user.role === 'admin') {
    router.push('/dashboard')
    return null
  }

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
              <p className="text-xs text-amber-700">Student Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-amber-700">Welcome, {user.name}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-amber-700 text-amber-700 hover:bg-amber-50 bg-transparent"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-amber-900">Welcome back, {user.name}!</h1>
              <p className="text-amber-700">Continue your learning journey</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <Star className="w-3 h-3 mr-1" />
                Active Student
              </Badge>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-900">3</div>
                <p className="text-xs text-blue-600">
                  <PlayCircle className="w-3 h-3 inline mr-1" />
                  2 in progress
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-900">1</div>
                <p className="text-xs text-green-600">
                  <Award className="w-3 h-3 inline mr-1" />
                  Certificate earned
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                <Star className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-900">78%</div>
                <Progress value={78} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Class</CardTitle>
                <Calendar className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-900">2h</div>
                <p className="text-xs text-amber-600">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Leadership Skills
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Courses */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Courses</CardTitle>
                  <CardDescription>Continue your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { 
                        name: "Leadership Skills for Faith Based Organizations", 
                        progress: 85, 
                        nextLesson: "Module 4: Team Building",
                        status: "In Progress"
                      },
                      { 
                        name: "Biblical Interpretation Fundamentals", 
                        progress: 60, 
                        nextLesson: "Module 3: Hermeneutics",
                        status: "In Progress"
                      },
                      { 
                        name: "Basic Counseling and Pastoral Care", 
                        progress: 100, 
                        nextLesson: "Course Completed",
                        status: "Completed"
                      },
                    ].map((course, index) => (
                      <div key={index} className="p-4 border border-amber-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-amber-900">{course.name}</h3>
                          <Badge 
                            variant={course.status === 'Completed' ? 'default' : 'secondary'}
                            className={course.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {course.status}
                          </Badge>
                        </div>
                        <div className="mb-2">
                          <Progress value={course.progress} className="h-2" />
                          <p className="text-xs text-gray-600 mt-1">{course.progress}% complete</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-amber-600">{course.nextLesson}</p>
                          <Button size="sm" variant="outline">
                            {course.status === 'Completed' ? (
                              <>
                                <Download className="w-3 h-3 mr-1" />
                                Certificate
                              </>
                            ) : (
                              <>
                                <PlayCircle className="w-3 h-3 mr-1" />
                                Continue
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Available Courses */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Courses</CardTitle>
                  <CardDescription>Explore new learning opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "Entrepreneurship and Small Business", fee: "$100", duration: "8 weeks" },
                      { name: "Grant Writing and Proposal Development", fee: "$100", duration: "6 weeks" },
                      { name: "Financial Literacy and Budgeting", fee: "$100", duration: "4 weeks" },
                      { name: "Public Speaking and Homiletics", fee: "$75", duration: "6 weeks" },
                    ].map((course, index) => (
                      <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <h4 className="font-medium text-amber-900 mb-2">{course.name}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-amber-600">{course.duration}</span>
                          <span className="font-medium text-green-600">{course.fee}</span>
                        </div>
                        <Button size="sm" className="w-full mt-2 bg-amber-700 hover:bg-amber-800">
                          Enroll Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Don't miss these important dates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { event: "Leadership Workshop", date: "Today 2:00 PM", type: "Workshop" },
                      { event: "Study Group Meeting", date: "Tomorrow 10:00 AM", type: "Study Group" },
                      { event: "Guest Speaker Session", date: "Friday 3:00 PM", type: "Lecture" },
                      { event: "Course Registration Opens", date: "Next Week", type: "Registration" },
                    ].map((item, index) => (
                      <div key={index} className="p-3 bg-amber-50 rounded-lg">
                        <p className="font-medium text-amber-900 text-sm">{item.event}</p>
                        <p className="text-xs text-amber-600">{item.date}</p>
                        <Badge variant="secondary" className="text-xs mt-1">{item.type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Download Transcripts
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Schedule
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Update Profile
                    </Button>
                    <Link href="/" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Church className="w-4 h-4 mr-2" />
                        Visit Website
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
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
