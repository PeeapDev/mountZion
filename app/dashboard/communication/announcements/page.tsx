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
import { 
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Send,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Megaphone,
  Pin,
  MessageSquare
} from "lucide-react"

// Mock announcements data
const mockAnnouncements = [
  {
    id: 'ANN001',
    title: 'New Course Registration Open',
    content: 'Registration for the Fall 2024 semester is now open. Early bird discount available until August 15th.',
    type: 'Course Update',
    priority: 'High',
    status: 'Published',
    author: 'Pastor John Smith',
    publishDate: '2024-08-01',
    expiryDate: '2024-08-15',
    targetAudience: 'All Students',
    views: 245,
    isPinned: true,
    category: 'Academic'
  },
  {
    id: 'ANN002',
    title: 'Prayer Meeting Schedule Change',
    content: 'Weekly prayer meetings will now be held on Wednesdays at 7:00 PM instead of Thursdays.',
    type: 'Schedule Change',
    priority: 'Medium',
    status: 'Published',
    author: 'Rev. Mary Johnson',
    publishDate: '2024-07-30',
    expiryDate: '2024-08-30',
    targetAudience: 'All Members',
    views: 189,
    isPinned: false,
    category: 'Spiritual'
  },
  {
    id: 'ANN003',
    title: 'Facility Maintenance Notice',
    content: 'The main auditorium will be closed for maintenance from August 10-12. Alternative venues available.',
    type: 'Maintenance',
    priority: 'High',
    status: 'Published',
    author: 'Dr. Michael Davis',
    publishDate: '2024-07-28',
    expiryDate: '2024-08-12',
    targetAudience: 'All Users',
    views: 156,
    isPinned: true,
    category: 'Facility'
  },
  {
    id: 'ANN004',
    title: 'New Staff Introduction',
    content: 'Please join us in welcoming Rev. Sarah Wilson as our new Youth Pastor. Meet and greet on Sunday.',
    type: 'Staff Update',
    priority: 'Medium',
    status: 'Draft',
    author: 'Pastor John Smith',
    publishDate: '2024-08-05',
    expiryDate: '2024-08-20',
    targetAudience: 'All Members',
    views: 0,
    isPinned: false,
    category: 'Staff'
  },
  {
    id: 'ANN005',
    title: 'Financial Aid Applications',
    content: 'Financial aid applications for the upcoming semester are due by August 20th. Contact the office for assistance.',
    type: 'Financial',
    priority: 'High',
    status: 'Published',
    author: 'Rev. David Brown',
    publishDate: '2024-07-25',
    expiryDate: '2024-08-20',
    targetAudience: 'Students',
    views: 98,
    isPinned: false,
    category: 'Financial'
  },
  {
    id: 'ANN006',
    title: 'Community Outreach Program',
    content: 'Join our community outreach program this Saturday. Volunteers needed for food distribution.',
    type: 'Event',
    priority: 'Medium',
    status: 'Published',
    author: 'Pastor Sarah Wilson',
    publishDate: '2024-08-02',
    expiryDate: '2024-08-10',
    targetAudience: 'All Members',
    views: 67,
    isPinned: false,
    category: 'Community'
  }
]

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

export default function AnnouncementsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

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
          <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-green-700 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  // Filter announcements
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || announcement.status === statusFilter
    const matchesPriority = priorityFilter === 'All' || announcement.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge className="bg-red-100 text-red-800 text-xs"><AlertCircle className="w-3 h-3 mr-1" />High</Badge>
      case 'Medium':
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs"><Clock className="w-3 h-3 mr-1" />Medium</Badge>
      case 'Low':
        return <Badge className="bg-green-100 text-green-800 text-xs"><CheckCircle className="w-3 h-3 mr-1" />Low</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{priority}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published':
        return <Badge className="bg-green-100 text-green-800 text-xs"><Send className="w-3 h-3 mr-1" />Published</Badge>
      case 'Draft':
        return <Badge className="bg-gray-100 text-gray-800 text-xs"><Edit className="w-3 h-3 mr-1" />Draft</Badge>
      case 'Scheduled':
        return <Badge className="bg-blue-100 text-blue-800 text-xs"><Calendar className="w-3 h-3 mr-1" />Scheduled</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>
    }
  }

  // Calculate stats
  const stats = {
    totalAnnouncements: announcements.length,
    published: announcements.filter(a => a.status === 'Published').length,
    drafts: announcements.filter(a => a.status === 'Draft').length,
    totalViews: announcements.reduce((sum, a) => sum + a.views, 0)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav />
      
      <motion.main 
        className="flex-1 ml-64 p-2 max-h-screen overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto space-y-2">
          {/* Header */}
          <motion.div variants={itemVariants}>
            <div className="flex justify-between items-center mb-2">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Announcements</h1>
                <p className="text-gray-600 text-xs">Manage church announcements and communications</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-xs px-3 py-1">
                <Plus className="mr-1 h-3 w-3" />
                New Announcement
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div className="grid grid-cols-4 gap-2 mb-2" variants={itemVariants}>
            <Card>
              <CardContent className="p-2">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-1.5 rounded-full">
                    <Megaphone className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-gray-600">Total</p>
                    <p className="text-lg font-bold text-gray-900">{stats.totalAnnouncements}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-2">
                <div className="flex items-center">
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <Send className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-gray-600">Published</p>
                    <p className="text-lg font-bold text-gray-900">{stats.published}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-2">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-1.5 rounded-full">
                    <Edit className="h-3 w-3 text-yellow-600" />
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-gray-600">Drafts</p>
                    <p className="text-lg font-bold text-gray-900">{stats.drafts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-2">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-1.5 rounded-full">
                    <Eye className="h-3 w-3 text-purple-600" />
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-gray-600">Total Views</p>
                    <p className="text-lg font-bold text-gray-900">{stats.totalViews}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Search and Filters */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-2">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
                      <Input
                        placeholder="Search announcements..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-7 text-xs h-8"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    >
                      <option value="All">All Status</option>
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                      <option value="Scheduled">Scheduled</option>
                    </select>
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    >
                      <option value="All">All Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                      <Download className="mr-1 h-3 w-3" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Announcements List */}
          <motion.div className="space-y-2" variants={itemVariants}>
            {filteredAnnouncements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {announcement.isPinned && <Pin className="h-3 w-3 text-yellow-600" />}
                          <Badge variant="outline" className="text-xs">{announcement.id}</Badge>
                          {getPriorityBadge(announcement.priority)}
                          {getStatusBadge(announcement.status)}
                          <Badge variant="outline" className="text-xs">{announcement.category}</Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{announcement.title}</h3>
                        <p className="text-gray-600 text-xs mb-2 line-clamp-2">{announcement.content}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-500">
                          <div>
                            <span className="font-medium">Author:</span> {announcement.author}
                          </div>
                          <div>
                            <span className="font-medium">Published:</span> {new Date(announcement.publishDate).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">Expires:</span> {new Date(announcement.expiryDate).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">Audience:</span> {announcement.targetAudience}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{announcement.views} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{announcement.targetAudience}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{announcement.type}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-1 ml-3">
                        <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs px-2 py-1 text-blue-600">
                          <Send className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs px-2 py-1 text-red-600">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredAnnouncements.length === 0 && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 text-center">
                  <Megaphone className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <h3 className="text-sm font-medium text-gray-900 mb-1">No announcements found</h3>
                  <p className="text-gray-600 text-xs mb-3">
                    No announcements match your current search criteria.
                  </p>
                  <Button size="sm" onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('All')
                    setPriorityFilter('All')
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
