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
  Mail,
  FileText,
  TrendingUp,
  Target,
  Image,
  Link,
  BarChart3
} from "lucide-react"

// Mock newsletter data
const mockNewsletters = [
  {
    id: 'NWS001',
    title: 'Mount Zion Weekly - August 2024',
    subject: 'This Week at Mount Zion: New Courses, Events & Community News',
    content: 'Welcome to this week\'s newsletter featuring new course announcements, upcoming events, staff introductions, and community highlights.',
    status: 'Sent',
    type: 'Weekly',
    template: 'weekly-digest',
    author: 'Pastor John Smith',
    createdDate: '2024-07-29T06:00:00',
    sentDate: '2024-07-29T08:00:00',
    scheduledDate: null,
    subscribers: 445,
    delivered: 442,
    opened: 298,
    clicked: 87,
    unsubscribed: 3,
    bounced: 3,
    openRate: 67.4,
    clickRate: 19.6,
    categories: ['General', 'Academic', 'Community'],
    featured: true
  },
  {
    id: 'NWS002',
    title: 'Course Catalog - Fall 2024',
    subject: 'New Fall Courses Available - Early Bird Registration Open',
    content: 'Discover our exciting new course offerings for Fall 2024. Biblical Studies, Leadership, Theology, and more.',
    status: 'Sent',
    type: 'Course Catalog',
    template: 'course-catalog',
    author: 'Rev. David Brown',
    createdDate: '2024-07-25T10:00:00',
    sentDate: '2024-07-26T09:00:00',
    scheduledDate: null,
    subscribers: 389,
    delivered: 385,
    opened: 267,
    clicked: 124,
    unsubscribed: 2,
    bounced: 4,
    openRate: 69.4,
    clickRate: 32.2,
    categories: ['Academic', 'Enrollment'],
    featured: false
  },
  {
    id: 'NWS003',
    title: 'Community Outreach Update',
    subject: 'Making a Difference: Our Community Impact This Month',
    content: 'See how Mount Zion Training Centre is making a positive impact in our local community through various outreach programs.',
    status: 'Draft',
    type: 'Community Update',
    template: 'community-impact',
    author: 'Pastor Sarah Wilson',
    createdDate: '2024-08-01T14:00:00',
    sentDate: null,
    scheduledDate: '2024-08-05T10:00:00',
    subscribers: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    unsubscribed: 0,
    bounced: 0,
    openRate: 0,
    clickRate: 0,
    categories: ['Community', 'Outreach'],
    featured: false
  },
  {
    id: 'NWS004',
    title: 'Financial Aid & Scholarships',
    subject: 'Scholarship Opportunities & Financial Aid Information',
    content: 'Learn about available scholarships, financial aid programs, and how to apply for assistance with your education.',
    status: 'Scheduled',
    type: 'Financial Aid',
    template: 'financial-aid',
    author: 'Dr. Michael Davis',
    createdDate: '2024-07-30T16:00:00',
    sentDate: null,
    scheduledDate: '2024-08-08T11:00:00',
    subscribers: 234,
    delivered: 0,
    opened: 0,
    clicked: 0,
    unsubscribed: 0,
    bounced: 0,
    openRate: 0,
    clickRate: 0,
    categories: ['Financial', 'Academic'],
    featured: true
  },
  {
    id: 'NWS005',
    title: 'Alumni Success Stories',
    subject: 'Celebrating Our Graduates: Where Are They Now?',
    content: 'Read inspiring stories from our alumni and see how their Mount Zion education has impacted their ministries and careers.',
    status: 'Sent',
    type: 'Alumni Feature',
    template: 'alumni-stories',
    author: 'Rev. Mary Johnson',
    createdDate: '2024-07-20T12:00:00',
    sentDate: '2024-07-22T10:00:00',
    scheduledDate: null,
    subscribers: 356,
    delivered: 352,
    opened: 198,
    clicked: 45,
    unsubscribed: 1,
    bounced: 4,
    openRate: 56.3,
    clickRate: 12.8,
    categories: ['Alumni', 'Success Stories'],
    featured: false
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

export default function NewsletterPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [newsletters, setNewsletters] = useState(mockNewsletters)
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
          <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-green-700 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  // Filter newsletters
  const filteredNewsletters = newsletters.filter(newsletter => {
    const matchesSearch = newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         newsletter.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         newsletter.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || newsletter.status === statusFilter
    const matchesType = typeFilter === 'All' || newsletter.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Sent':
        return <Badge className="bg-green-100 text-green-800 text-xs"><CheckCircle className="w-3 h-3 mr-1" />Sent</Badge>
      case 'Draft':
        return <Badge className="bg-gray-100 text-gray-800 text-xs"><Edit className="w-3 h-3 mr-1" />Draft</Badge>
      case 'Scheduled':
        return <Badge className="bg-blue-100 text-blue-800 text-xs"><Clock className="w-3 h-3 mr-1" />Scheduled</Badge>
      case 'Failed':
        return <Badge className="bg-red-100 text-red-800 text-xs"><AlertCircle className="w-3 h-3 mr-1" />Failed</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>
    }
  }

  // Calculate stats
  const stats = {
    totalNewsletters: newsletters.length,
    sent: newsletters.filter(n => n.status === 'Sent').length,
    drafts: newsletters.filter(n => n.status === 'Draft').length,
    scheduled: newsletters.filter(n => n.status === 'Scheduled').length,
    totalSubscribers: Math.max(...newsletters.map(n => n.subscribers)),
    avgOpenRate: newsletters.filter(n => n.status === 'Sent').length > 0 
      ? Math.round(newsletters.filter(n => n.status === 'Sent').reduce((sum, n) => sum + n.openRate, 0) / newsletters.filter(n => n.status === 'Sent').length)
      : 0,
    avgClickRate: newsletters.filter(n => n.status === 'Sent').length > 0 
      ? Math.round(newsletters.filter(n => n.status === 'Sent').reduce((sum, n) => sum + n.clickRate, 0) / newsletters.filter(n => n.status === 'Sent').length)
      : 0
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
                <h1 className="text-xl font-bold text-gray-900">Newsletter</h1>
                <p className="text-gray-600 text-xs">Create and manage email newsletters</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="text-xs px-3 py-1">
                  <BarChart3 className="mr-1 h-3 w-3" />
                  Analytics
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-xs px-3 py-1">
                  <Plus className="mr-1 h-3 w-3" />
                  New Newsletter
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div className="grid grid-cols-2 md:grid-cols-7 gap-2 mb-2" variants={itemVariants}>
            <Card>
              <CardContent className="p-2">
                <div className="text-center">
                  <div className="bg-blue-100 p-1.5 rounded-full w-fit mx-auto mb-1">
                    <Mail className="h-3 w-3 text-blue-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-600">Total</p>
                  <p className="text-lg font-bold text-gray-900">{stats.totalNewsletters}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-2">
                <div className="text-center">
                  <div className="bg-green-100 p-1.5 rounded-full w-fit mx-auto mb-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-600">Sent</p>
                  <p className="text-lg font-bold text-gray-900">{stats.sent}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-2">
                <div className="text-center">
                  <div className="bg-gray-100 p-1.5 rounded-full w-fit mx-auto mb-1">
                    <Edit className="h-3 w-3 text-gray-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-600">Drafts</p>
                  <p className="text-lg font-bold text-gray-900">{stats.drafts}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-2">
                <div className="text-center">
                  <div className="bg-yellow-100 p-1.5 rounded-full w-fit mx-auto mb-1">
                    <Clock className="h-3 w-3 text-yellow-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-600">Scheduled</p>
                  <p className="text-lg font-bold text-gray-900">{stats.scheduled}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-2">
                <div className="text-center">
                  <div className="bg-purple-100 p-1.5 rounded-full w-fit mx-auto mb-1">
                    <Users className="h-3 w-3 text-purple-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-600">Subscribers</p>
                  <p className="text-lg font-bold text-gray-900">{stats.totalSubscribers}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-2">
                <div className="text-center">
                  <div className="bg-orange-100 p-1.5 rounded-full w-fit mx-auto mb-1">
                    <Eye className="h-3 w-3 text-orange-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-600">Avg Open</p>
                  <p className="text-lg font-bold text-gray-900">{stats.avgOpenRate}%</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-2">
                <div className="text-center">
                  <div className="bg-teal-100 p-1.5 rounded-full w-fit mx-auto mb-1">
                    <Target className="h-3 w-3 text-teal-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-600">Avg Click</p>
                  <p className="text-lg font-bold text-gray-900">{stats.avgClickRate}%</p>
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
                        placeholder="Search newsletters..."
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
                      <option value="Sent">Sent</option>
                      <option value="Draft">Draft</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Failed">Failed</option>
                    </select>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    >
                      <option value="All">All Types</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Course Catalog">Course Catalog</option>
                      <option value="Community Update">Community Update</option>
                      <option value="Financial Aid">Financial Aid</option>
                      <option value="Alumni Feature">Alumni Feature</option>
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

          {/* Newsletters List */}
          <motion.div className="space-y-2" variants={itemVariants}>
            {filteredNewsletters.map((newsletter, index) => (
              <motion.div
                key={newsletter.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">{newsletter.id}</Badge>
                          {getStatusBadge(newsletter.status)}
                          <Badge variant="outline" className="text-xs">{newsletter.type}</Badge>
                          {newsletter.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">Featured</Badge>
                          )}
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{newsletter.title}</h3>
                        <p className="text-gray-700 text-xs mb-1 font-medium">{newsletter.subject}</p>
                        <p className="text-gray-600 text-xs mb-2 line-clamp-2">{newsletter.content}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-500 mb-2">
                          <div>
                            <span className="font-medium">Author:</span> {newsletter.author}
                          </div>
                          <div>
                            <span className="font-medium">Template:</span> {newsletter.template}
                          </div>
                          <div>
                            <span className="font-medium">Created:</span> {new Date(newsletter.createdDate).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">Categories:</span> {newsletter.categories.join(', ')}
                          </div>
                        </div>

                        {newsletter.status === 'Sent' && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-500 mb-2">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{newsletter.delivered}/{newsletter.subscribers} delivered</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{newsletter.opened} opened ({newsletter.openRate}%)</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              <span>{newsletter.clicked} clicked ({newsletter.clickRate}%)</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>{newsletter.unsubscribed} unsubscribed</span>
                            </div>
                          </div>
                        )}

                        {newsletter.status === 'Scheduled' && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>Scheduled for: {new Date(newsletter.scheduledDate!).toLocaleString()}</span>
                          </div>
                        )}

                        {newsletter.status === 'Sent' && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>Sent: {new Date(newsletter.sentDate!).toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-1 ml-3">
                        <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs px-2 py-1 text-blue-600">
                          <BarChart3 className="h-3 w-3" />
                        </Button>
                        {newsletter.status === 'Draft' && (
                          <Button variant="outline" size="sm" className="text-xs px-2 py-1 text-green-600">
                            <Send className="h-3 w-3" />
                          </Button>
                        )}
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

          {filteredNewsletters.length === 0 && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 text-center">
                  <Mail className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <h3 className="text-sm font-medium text-gray-900 mb-1">No newsletters found</h3>
                  <p className="text-gray-600 text-xs mb-3">
                    No newsletters match your current search criteria.
                  </p>
                  <Button size="sm" onClick={() => {
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
