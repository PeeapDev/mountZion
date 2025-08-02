'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import SidebarNav from "@/components/sidebar-nav"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  AlertCircle,
  XCircle,
  Star,
  Ticket
} from "lucide-react"

// Mock events data
const mockEvents = [
  {
    id: 'EVT001',
    title: 'Annual Leadership Conference',
    description: 'A comprehensive conference for church leaders and ministry workers focusing on modern leadership techniques.',
    type: 'Conference',
    startDate: '2024-09-15',
    endDate: '2024-09-17',
    startTime: '09:00',
    endTime: '17:00',
    venue: 'Main Auditorium',
    capacity: 200,
    registered: 145,
    status: 'Published',
    organizer: 'Pastor John Smith',
    fee: 50,
    isPublic: true,
    tags: ['Leadership', 'Conference', 'Ministry'],
    requirements: 'Church membership required',
    materials: ['Conference booklet', 'Name badge', 'Certificate'],
    image: '/api/placeholder/400/200'
  },
  {
    id: 'EVT002',
    title: 'Youth Retreat Weekend',
    description: 'A spiritual retreat for young people aged 16-25 with workshops, activities, and fellowship.',
    type: 'Retreat',
    startDate: '2024-08-20',
    endDate: '2024-08-22',
    startTime: '18:00',
    endTime: '15:00',
    venue: 'Mountain View Camp',
    capacity: 80,
    registered: 65,
    status: 'Published',
    organizer: 'Rev. Mary Johnson',
    fee: 75,
    isPublic: true,
    tags: ['Youth', 'Retreat', 'Fellowship'],
    requirements: 'Ages 16-25 only',
    materials: ['Retreat handbook', 'T-shirt', 'Meal vouchers'],
    image: '/api/placeholder/400/200'
  },
  {
    id: 'EVT003',
    title: 'Community Outreach Day',
    description: 'Join us for a day of serving our local community through various volunteer activities.',
    type: 'Outreach',
    startDate: '2024-08-10',
    endDate: '2024-08-10',
    startTime: '08:00',
    endTime: '16:00',
    venue: 'Various Locations',
    capacity: 150,
    registered: 89,
    status: 'Published',
    organizer: 'Dr. Michael Davis',
    fee: 0,
    isPublic: true,
    tags: ['Community', 'Outreach', 'Service'],
    requirements: 'No special requirements',
    materials: ['Volunteer kit', 'Lunch', 'Transportation'],
    image: '/api/placeholder/400/200'
  },
  {
    id: 'EVT004',
    title: 'Prayer and Fasting Week',
    description: 'A week-long spiritual discipline focusing on prayer, fasting, and seeking God\'s direction.',
    type: 'Spiritual',
    startDate: '2024-09-01',
    endDate: '2024-09-07',
    startTime: '06:00',
    endTime: '21:00',
    venue: 'Prayer Chapel',
    capacity: 50,
    registered: 32,
    status: 'Draft',
    organizer: 'Pastor Sarah Wilson',
    fee: 0,
    isPublic: false,
    tags: ['Prayer', 'Fasting', 'Spiritual'],
    requirements: 'Members only',
    materials: ['Prayer guide', 'Daily devotional'],
    image: '/api/placeholder/400/200'
  },
  {
    id: 'EVT005',
    title: 'Children\'s Summer Camp',
    description: 'Fun-filled summer camp for children with games, crafts, Bible stories, and outdoor activities.',
    type: 'Camp',
    startDate: '2024-07-15',
    endDate: '2024-07-19',
    startTime: '09:00',
    endTime: '15:00',
    venue: 'Church Grounds',
    capacity: 60,
    registered: 60,
    status: 'Completed',
    organizer: 'Rev. David Brown',
    fee: 30,
    isPublic: true,
    tags: ['Children', 'Summer', 'Camp'],
    requirements: 'Ages 6-12 only',
    materials: ['Camp t-shirt', 'Activity kit', 'Snacks'],
    image: '/api/placeholder/400/200'
  }
]

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function EventsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [events, setEvents] = useState(mockEvents)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

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

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || event.status === statusFilter
    const matchesType = typeFilter === 'All' || event.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Published</Badge>
      case 'Draft':
        return <Badge className="bg-gray-100 text-gray-800"><AlertCircle className="w-3 h-3 mr-1" />Draft</Badge>
      case 'Completed':
        return <Badge className="bg-blue-100 text-blue-800"><Star className="w-3 h-3 mr-1" />Completed</Badge>
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Conference': return 'bg-blue-100 text-blue-800'
      case 'Retreat': return 'bg-purple-100 text-purple-800'
      case 'Outreach': return 'bg-green-100 text-green-800'
      case 'Spiritual': return 'bg-yellow-100 text-yellow-800'
      case 'Camp': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Calculate stats
  const stats = {
    totalEvents: events.length,
    publishedEvents: events.filter(e => e.status === 'Published').length,
    totalRegistrations: events.reduce((sum, e) => sum + e.registered, 0),
    upcomingEvents: events.filter(e => new Date(e.startDate) > new Date()).length
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav />
      
      <motion.main 
        className="flex-1 ml-64 p-3 max-h-screen overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div className="mb-3" variants={itemVariants}>
            <div className="flex justify-between items-center mb-2">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
                <p className="text-gray-600 text-sm">Create and manage church events and activities</p>
              </div>
              <div className="flex gap-2">
                <Link href="/dashboard/events/venue">
                  <Button variant="outline" className="text-sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    Manage Venues
                  </Button>
                </Link>
                <Link href="/dashboard/events/add">
                  <Button className="bg-green-600 hover:bg-green-700 text-sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3" variants={itemVariants}>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Total Events</p>
                    <p className="text-xl font-bold text-gray-900">{stats.totalEvents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Published</p>
                    <p className="text-xl font-bold text-gray-900">{stats.publishedEvents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Total Registrations</p>
                    <p className="text-xl font-bold text-gray-900">{stats.totalRegistrations}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Upcoming</p>
                    <p className="text-xl font-bold text-gray-900">{stats.upcomingEvents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Search and Filters */}
          <motion.div variants={itemVariants}>
            <Card className="mb-3">
              <CardContent className="p-3">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search by event title, description, or organizer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="All">All Status</option>
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="All">All Types</option>
                      <option value="Conference">Conference</option>
                      <option value="Retreat">Retreat</option>
                      <option value="Outreach">Outreach</option>
                      <option value="Spiritual">Spiritual</option>
                      <option value="Camp">Camp</option>
                    </select>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Events Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" variants={itemVariants}>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                      {getStatusBadge(event.status)}
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-600">Start Date</p>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <p className="text-sm font-medium">{new Date(event.startDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Time</p>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <p className="text-sm font-medium">{event.startTime}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600">Venue</p>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <p className="text-sm font-medium">{event.venue}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600">Organizer</p>
                      <p className="text-sm font-medium">{event.organizer}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-600">Registration</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">
                            {event.registered}/{event.capacity}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Fee</p>
                        <p className="text-sm font-bold text-green-600">
                          {event.fee === 0 ? 'Free' : `$${event.fee}`}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {event.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-blue-600">
                            <Ticket className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredEvents.length === 0 && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                  <p className="text-gray-600 mb-4">
                    No events match your current search criteria.
                  </p>
                  <Button onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('All')
                    setTypeFilter('All')
                  }}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </motion.main>
    </div>
  )
}
