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
  MapPin,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Settings,
  Building,
  ArrowLeft
} from "lucide-react"

// Mock venue data
const mockVenues = [
  {
    id: 'VEN001',
    name: 'Main Auditorium',
    description: 'Large auditorium with modern sound system and projection equipment',
    capacity: 500,
    location: 'Main Building, Ground Floor',
    facilities: ['Sound System', 'Projector', 'Air Conditioning', 'Stage', 'Parking'],
    status: 'Available',
    bookings: 12,
    nextBooking: '2024-08-15',
    manager: 'Pastor John Smith',
    hourlyRate: 0,
    setupTime: 60,
    cleanupTime: 30,
    notes: 'Requires advance booking for large events'
  },
  {
    id: 'VEN002',
    name: 'Conference Room A',
    description: 'Medium-sized conference room perfect for meetings and small workshops',
    capacity: 50,
    location: 'Administration Building, 2nd Floor',
    facilities: ['Whiteboard', 'TV Screen', 'Wi-Fi', 'Coffee Station', 'Tables & Chairs'],
    status: 'Available',
    bookings: 8,
    nextBooking: '2024-08-12',
    manager: 'Rev. Mary Johnson',
    hourlyRate: 0,
    setupTime: 15,
    cleanupTime: 15,
    notes: 'Ideal for leadership meetings and training sessions'
  },
  {
    id: 'VEN003',
    name: 'Prayer Chapel',
    description: 'Intimate space for prayer meetings and spiritual gatherings',
    capacity: 30,
    location: 'Main Building, 1st Floor',
    facilities: ['Piano', 'Sound System', 'Comfortable Seating', 'Prayer Altar'],
    status: 'Available',
    bookings: 15,
    nextBooking: '2024-08-08',
    manager: 'Pastor Sarah Wilson',
    hourlyRate: 0,
    setupTime: 10,
    cleanupTime: 10,
    notes: 'Reserved for spiritual activities only'
  },
  {
    id: 'VEN004',
    name: 'Fellowship Hall',
    description: 'Multi-purpose hall for social events, meals, and large gatherings',
    capacity: 200,
    location: 'Community Building',
    facilities: ['Kitchen Access', 'Tables & Chairs', 'Sound System', 'Dance Floor'],
    status: 'Under Maintenance',
    bookings: 5,
    nextBooking: '2024-08-25',
    manager: 'Dr. Michael Davis',
    hourlyRate: 0,
    setupTime: 45,
    cleanupTime: 45,
    notes: 'Currently undergoing renovation - available from August 20th'
  },
  {
    id: 'VEN005',
    name: 'Training Center',
    description: 'Specialized facility for educational programs and practical training',
    capacity: 80,
    location: 'Education Building',
    facilities: ['Interactive Boards', 'Computers', 'Wi-Fi', 'Breakout Rooms', 'Library Access'],
    status: 'Available',
    bookings: 20,
    nextBooking: '2024-08-09',
    manager: 'Rev. David Brown',
    hourlyRate: 0,
    setupTime: 30,
    cleanupTime: 20,
    notes: 'Equipped with modern educational technology'
  },
  {
    id: 'VEN006',
    name: 'Outdoor Pavilion',
    description: 'Covered outdoor space for events and activities',
    capacity: 150,
    location: 'Church Grounds',
    facilities: ['Weather Protection', 'Electrical Outlets', 'Picnic Tables', 'BBQ Area'],
    status: 'Seasonal',
    bookings: 3,
    nextBooking: '2024-08-18',
    manager: 'Pastor John Smith',
    hourlyRate: 0,
    setupTime: 20,
    cleanupTime: 30,
    notes: 'Weather dependent - summer season only'
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

export default function VenueManagementPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [venues, setVenues] = useState(mockVenues)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

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

  // Filter venues
  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || venue.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Available</Badge>
      case 'Under Maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800"><Settings className="w-3 h-3 mr-1" />Maintenance</Badge>
      case 'Seasonal':
        return <Badge className="bg-blue-100 text-blue-800"><Calendar className="w-3 h-3 mr-1" />Seasonal</Badge>
      case 'Unavailable':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Unavailable</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Calculate stats
  const stats = {
    totalVenues: venues.length,
    availableVenues: venues.filter(v => v.status === 'Available').length,
    totalCapacity: venues.reduce((sum, v) => sum + v.capacity, 0),
    totalBookings: venues.reduce((sum, v) => sum + v.bookings, 0)
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
              <div className="flex items-center gap-4">
                <Link href="/dashboard/events">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Events
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Venue Management</h1>
                  <p className="text-gray-600 text-sm">Manage event venues and facilities</p>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Venue
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3" variants={itemVariants}>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Total Venues</p>
                    <p className="text-xl font-bold text-gray-900">{stats.totalVenues}</p>
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
                    <p className="text-xs font-medium text-gray-600">Available</p>
                    <p className="text-xl font-bold text-gray-900">{stats.availableVenues}</p>
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
                    <p className="text-xs font-medium text-gray-600">Total Capacity</p>
                    <p className="text-xl font-bold text-gray-900">{stats.totalCapacity}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Total Bookings</p>
                    <p className="text-xl font-bold text-gray-900">{stats.totalBookings}</p>
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
                        placeholder="Search by venue name, description, or location..."
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
                      <option value="Available">Available</option>
                      <option value="Under Maintenance">Under Maintenance</option>
                      <option value="Seasonal">Seasonal</option>
                      <option value="Unavailable">Unavailable</option>
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

          {/* Venues Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" variants={itemVariants}>
            {filteredVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-600" />
                        <Badge variant="outline" className="text-xs">{venue.id}</Badge>
                      </div>
                      {getStatusBadge(venue.status)}
                    </div>
                    <CardTitle className="text-lg">{venue.name}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {venue.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-600">Location</p>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <p className="text-sm font-medium">{venue.location}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-600">Capacity</p>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <p className="text-sm font-medium">{venue.capacity} people</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Bookings</p>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <p className="text-sm font-medium">{venue.bookings} this month</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600">Manager</p>
                      <p className="text-sm font-medium">{venue.manager}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600">Next Booking</p>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <p className="text-sm font-medium">
                          {new Date(venue.nextBooking).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Facilities</p>
                      <div className="flex flex-wrap gap-1">
                        {venue.facilities.slice(0, 3).map((facility, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                        {venue.facilities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{venue.facilities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-gray-600">Setup Time</p>
                        <p className="font-medium">{venue.setupTime} min</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Cleanup Time</p>
                        <p className="font-medium">{venue.cleanupTime} min</p>
                      </div>
                    </div>

                    {venue.notes && (
                      <div>
                        <p className="text-xs text-gray-600">Notes</p>
                        <p className="text-xs text-gray-800 line-clamp-2">{venue.notes}</p>
                      </div>
                    )}

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
                            <Calendar className="h-3 w-3" />
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

          {filteredVenues.length === 0 && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-8 text-center">
                  <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No venues found</h3>
                  <p className="text-gray-600 mb-4">
                    No venues match your current search criteria.
                  </p>
                  <Button onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('All')
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
