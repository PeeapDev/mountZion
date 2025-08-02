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
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  User,
  AlertCircle
} from "lucide-react"

// Mock schedule data
const mockSchedule = [
  {
    id: 'SCH001',
    courseId: 'EXP001',
    courseTitle: 'Explorer Training Foundation',
    instructor: 'Pastor John Smith',
    date: '2024-08-05',
    startTime: '18:00',
    endTime: '20:00',
    location: 'Main Hall',
    type: 'Lecture',
    topic: 'Introduction to Explorer Principles',
    attendees: 42,
    maxCapacity: 50,
    status: 'Scheduled',
    materials: ['Workbook Ch. 1', 'Handouts'],
    notes: 'Bring notebooks for practical exercises'
  },
  {
    id: 'SCH002',
    courseId: 'TIM001',
    courseTitle: 'Timothy Leadership Basics',
    instructor: 'Rev. Mary Johnson',
    date: '2024-08-06',
    startTime: '19:00',
    endTime: '21:00',
    location: 'Conference Room A',
    type: 'Workshop',
    topic: 'Leadership Styles and Assessment',
    attendees: 25,
    maxCapacity: 35,
    status: 'Scheduled',
    materials: ['Leadership Assessment Tool', 'Case Studies'],
    notes: 'Interactive session with group activities'
  },
  {
    id: 'SCH003',
    courseId: 'EXP001',
    courseTitle: 'Explorer Training Foundation',
    instructor: 'Pastor John Smith',
    date: '2024-08-07',
    startTime: '18:00',
    endTime: '20:00',
    location: 'Main Hall',
    type: 'Practical',
    topic: 'Hands-on Explorer Techniques',
    attendees: 38,
    maxCapacity: 50,
    status: 'Scheduled',
    materials: ['Practice Materials', 'Equipment'],
    notes: 'Wear comfortable clothing for activities'
  },
  {
    id: 'SCH004',
    courseId: 'TIM002',
    courseTitle: 'Leadership in Ministry',
    instructor: 'Pastor Sarah Wilson',
    date: '2024-08-08',
    startTime: '17:00',
    endTime: '19:00',
    location: 'Leadership Center',
    type: 'Seminar',
    topic: 'Conflict Resolution in Ministry',
    attendees: 16,
    maxCapacity: 20,
    status: 'Scheduled',
    materials: ['Ministry Handbook Ch. 5', 'Role-play Scenarios'],
    notes: 'Guest speaker: Dr. Michael Thompson'
  },
  {
    id: 'SCH005',
    courseId: 'EXP002',
    courseTitle: 'Advanced Explorer Methods',
    instructor: 'Dr. Michael Davis',
    date: '2024-08-09',
    startTime: '09:00',
    endTime: '12:00',
    location: 'Training Center',
    type: 'Field Work',
    topic: 'Advanced Practical Applications',
    attendees: 20,
    maxCapacity: 25,
    status: 'Scheduled',
    materials: ['Field Guide', 'Equipment Kit'],
    notes: 'Meet at Training Center parking lot'
  },
  {
    id: 'SCH006',
    courseId: 'TIM001',
    courseTitle: 'Timothy Leadership Basics',
    instructor: 'Rev. Mary Johnson',
    date: '2024-08-10',
    startTime: '10:00',
    endTime: '14:00',
    location: 'Conference Room A',
    type: 'Assessment',
    topic: 'Mid-term Leadership Evaluation',
    attendees: 28,
    maxCapacity: 35,
    status: 'Scheduled',
    materials: ['Assessment Forms', 'Portfolio Guidelines'],
    notes: 'Bring completed assignments and portfolios'
  }
]

const sessionTypes = ['All', 'Lecture', 'Workshop', 'Practical', 'Seminar', 'Field Work', 'Assessment']
const statusTypes = ['All', 'Scheduled', 'In Progress', 'Completed', 'Cancelled']

export default function CourseSchedulePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [schedule, setSchedule] = useState(mockSchedule)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

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

  // Filter schedule based on search and filters
  const filteredSchedule = schedule.filter(session => {
    const matchesSearch = session.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.topic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'All' || session.type === typeFilter
    const matchesStatus = statusFilter === 'All' || session.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
      case 'In Progress':
        return <Badge className="bg-green-100 text-green-800">In Progress</Badge>
      case 'Completed':
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Lecture':
        return <BookOpen className="h-4 w-4 text-blue-600" />
      case 'Workshop':
        return <Users className="h-4 w-4 text-green-600" />
      case 'Practical':
        return <User className="h-4 w-4 text-purple-600" />
      case 'Seminar':
        return <Calendar className="h-4 w-4 text-orange-600" />
      case 'Field Work':
        return <MapPin className="h-4 w-4 text-red-600" />
      case 'Assessment':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Calculate stats
  const stats = {
    totalSessions: schedule.length,
    todaySessions: schedule.filter(s => s.date === new Date().toISOString().split('T')[0]).length,
    totalAttendees: schedule.reduce((sum, session) => sum + session.attendees, 0),
    upcomingSessions: schedule.filter(s => new Date(s.date) > new Date()).length
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
                <h1 className="text-3xl font-bold text-gray-900">Course Schedule</h1>
                <p className="text-gray-600 mt-2">Manage class schedules and session planning</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Schedule
                </Button>
                <Link href="/dashboard/courses/schedule/create">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Session
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Today's Sessions</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.todaySessions}</p>
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
                    <p className="text-sm font-medium text-gray-600">Total Attendees</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalAttendees}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Upcoming</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.upcomingSessions}</p>
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
                  <Input
                    placeholder="Search by course, instructor, or topic..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {sessionTypes.map(type => (
                      <option key={type} value={type}>{type} {type !== 'All' ? 'Sessions' : ''}</option>
                    ))}
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {statusTypes.map(status => (
                      <option key={status} value={status}>{status} {status !== 'All' ? 'Sessions' : ''}</option>
                    ))}
                  </select>
                  <div className="flex border border-gray-300 rounded-md">
                    <button
                      onClick={() => setViewMode('week')}
                      className={`px-3 py-2 text-sm ${viewMode === 'week' ? 'bg-green-600 text-white' : 'text-gray-600'}`}
                    >
                      Week
                    </button>
                    <button
                      onClick={() => setViewMode('month')}
                      className={`px-3 py-2 text-sm ${viewMode === 'month' ? 'bg-green-600 text-white' : 'text-gray-600'}`}
                    >
                      Month
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule List */}
          <div className="space-y-2">
            {filteredSchedule.map((session) => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        {getTypeIcon(session.type)}
                        <h3 className="text-lg font-semibold text-gray-900">{session.courseTitle}</h3>
                        {getStatusBadge(session.status)}
                        <Badge variant="outline" className="text-xs">
                          {session.type}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700 font-medium mb-1">{session.topic}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(session.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(session.startTime)} - {formatTime(session.endTime)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{session.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{session.instructor}</span>
                        </div>
                      </div>

                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Attendance</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${(session.attendees / session.maxCapacity) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">
                              {session.attendees}/{session.maxCapacity}
                            </span>
                          </div>
                        </div>
                        
                        {session.notes && (
                          <div>
                            <p className="text-sm text-gray-600">Notes</p>
                            <p className="text-sm text-gray-800">{session.notes}</p>
                          </div>
                        )}
                      </div>

                      {session.materials.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 mb-1">Materials</p>
                          <div className="flex flex-wrap gap-2">
                            {session.materials.map((material, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSchedule.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
                <p className="text-gray-600 mb-4">
                  No sessions match your current search criteria.
                </p>
                <Button onClick={() => {
                  setSearchTerm('')
                  setTypeFilter('All')
                  setStatusFilter('All')
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
