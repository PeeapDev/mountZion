'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import SidebarNav from "@/components/sidebar-nav"
import Link from "next/link"
import { 
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  MoreHorizontal,
  BookOpen,
  Users,
  Clock,
  Calendar,
  GraduationCap,
  Play,
  Pause,
  CheckCircle
} from "lucide-react"

// Mock course data
const mockCourses = [
  {
    id: 'EXP001',
    title: 'Explorer Training Foundation',
    description: 'Basic foundation course for new explorers covering fundamental principles and practices.',
    program: 'Explorer Training',
    instructor: 'Pastor John Smith',
    duration: '12 weeks',
    sessions: 24,
    enrolledStudents: 45,
    maxCapacity: 50,
    startDate: '2024-01-15',
    endDate: '2024-04-08',
    status: 'Active',
    progress: 65,
    schedule: 'Mon & Wed, 6:00 PM - 8:00 PM',
    location: 'Main Hall',
    materials: ['Workbook', 'Audio Files', 'Video Content'],
    prerequisites: 'None',
    certificate: true,
    fee: 150
  },
  {
    id: 'TIM001',
    title: 'Timothy Leadership Basics',
    description: 'Introduction to Christian leadership principles and practical ministry skills.',
    program: 'Timothy Leadership Training',
    instructor: 'Rev. Mary Johnson',
    duration: '16 weeks',
    sessions: 32,
    enrolledStudents: 28,
    maxCapacity: 35,
    startDate: '2024-02-01',
    endDate: '2024-05-23',
    status: 'Active',
    progress: 45,
    schedule: 'Tue & Thu, 7:00 PM - 9:00 PM',
    location: 'Conference Room A',
    materials: ['Leadership Manual', 'Case Studies', 'Assessment Tools'],
    prerequisites: 'Explorer Training Foundation',
    certificate: true,
    fee: 200
  },
  {
    id: 'EXP002',
    title: 'Advanced Explorer Methods',
    description: 'Advanced techniques and methodologies for experienced explorers.',
    program: 'Explorer Training',
    instructor: 'Dr. Michael Davis',
    duration: '10 weeks',
    sessions: 20,
    enrolledStudents: 22,
    maxCapacity: 25,
    startDate: '2024-03-01',
    endDate: '2024-05-10',
    status: 'Active',
    progress: 30,
    schedule: 'Fri & Sat, 9:00 AM - 12:00 PM',
    location: 'Training Center',
    materials: ['Advanced Manual', 'Practical Exercises', 'Field Guide'],
    prerequisites: 'Explorer Training Foundation',
    certificate: true,
    fee: 180
  },
  {
    id: 'TIM002',
    title: 'Leadership in Ministry',
    description: 'Comprehensive leadership training for ministry contexts and church leadership.',
    program: 'Timothy Leadership Training',
    instructor: 'Pastor Sarah Wilson',
    duration: '20 weeks',
    sessions: 40,
    enrolledStudents: 18,
    maxCapacity: 20,
    startDate: '2024-01-08',
    endDate: '2024-05-27',
    status: 'Active',
    progress: 75,
    schedule: 'Mon & Wed, 5:00 PM - 7:00 PM',
    location: 'Leadership Center',
    materials: ['Ministry Handbook', 'Leadership Assessment', 'Mentoring Guide'],
    prerequisites: 'Timothy Leadership Basics',
    certificate: true,
    fee: 250
  },
  {
    id: 'EXP003',
    title: 'Explorer Community Outreach',
    description: 'Training focused on community engagement and outreach programs.',
    program: 'Explorer Training',
    instructor: 'Rev. David Brown',
    duration: '8 weeks',
    sessions: 16,
    enrolledStudents: 35,
    maxCapacity: 40,
    startDate: '2024-04-15',
    endDate: '2024-06-10',
    status: 'Upcoming',
    progress: 0,
    schedule: 'Sat, 10:00 AM - 2:00 PM',
    location: 'Community Center',
    materials: ['Outreach Manual', 'Community Resources', 'Project Templates'],
    prerequisites: 'Explorer Training Foundation',
    certificate: true,
    fee: 120
  }
]

export default function CoursesPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [courses, setCourses] = useState(mockCourses)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [programFilter, setProgramFilter] = useState('All')

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
    if (!isLoading && user && user.role !== 'admin') {
      router.push('/user-dashboard')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-700">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || course.status === statusFilter
    const matchesProgram = programFilter === 'All' || course.program === programFilter
    
    return matchesSearch && matchesStatus && matchesProgram
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'Upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
      case 'Completed':
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <Play className="h-4 w-4 text-green-600" />
      case 'Upcoming':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-gray-600" />
      case 'Cancelled':
        return <Pause className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  // Calculate stats
  const stats = {
    totalCourses: courses.length,
    activeCourses: courses.filter(c => c.status === 'Active').length,
    totalStudents: courses.reduce((sum, course) => sum + course.enrolledStudents, 0),
    upcomingCourses: courses.filter(c => c.status === 'Upcoming').length
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav />
      
      <main className="flex-1 ml-64 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
                <p className="text-gray-600 mt-2">Manage all training courses and programs</p>
              </div>
              <Link href="/dashboard/courses/create">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Course
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Courses</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Play className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Courses</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeCourses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Enrolled</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Upcoming</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.upcomingCourses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-3">
            <CardContent className="p-3">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search courses by title, ID, or instructor..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <select
                    value={programFilter}
                    onChange={(e) => setProgramFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="All">All Programs</option>
                    <option value="Explorer Training">Explorer Training</option>
                    <option value="Timothy Leadership Training">Timothy Leadership Training</option>
                  </select>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(course.status)}
                      <Badge variant="outline" className="text-xs">
                        {course.id}
                      </Badge>
                    </div>
                    {getStatusBadge(course.status)}
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Instructor</p>
                      <p className="font-medium">{course.instructor}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-medium">{course.duration}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Enrolled</p>
                      <p className="font-medium">{course.enrolledStudents}/{course.maxCapacity}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Fee</p>
                      <p className="font-medium">${course.fee}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm">Schedule</p>
                    <p className="font-medium text-sm">{course.schedule}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm">Location</p>
                    <p className="font-medium text-sm">{course.location}</p>
                  </div>

                  {course.status === 'Active' && (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600 mb-4">
                  No courses match your current search criteria.
                </p>
                <Button onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('All')
                  setProgramFilter('All')
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
