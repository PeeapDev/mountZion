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
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Globe,
  Target
} from "lucide-react"

// Mock notifications data
const mockNotifications = [
  {
    id: 'NOT001',
    title: 'Course Enrollment Reminder',
    message: 'Don\'t forget to complete your enrollment for the Fall 2024 semester. Deadline is August 15th.',
    type: 'Reminder',
    channel: 'Email',
    status: 'Sent',
    priority: 'High',
    recipients: 156,
    opened: 89,
    clicked: 23,
    sentDate: '2024-08-01T10:00:00',
    scheduledDate: null,
    targetAudience: 'Prospective Students',
    category: 'Academic',
    template: 'enrollment-reminder'
  },
  {
    id: 'NOT002',
    title: 'Prayer Meeting Tonight',
    message: 'Join us for tonight\'s prayer meeting at 7:00 PM in the main chapel.',
    type: 'Event Alert',
    channel: 'SMS',
    status: 'Sent',
    priority: 'Medium',
    recipients: 234,
    opened: 198,
    clicked: 45,
    sentDate: '2024-08-02T15:30:00',
    scheduledDate: null,
    targetAudience: 'All Members',
    category: 'Spiritual',
    template: 'event-alert'
  },
  {
    id: 'NOT003',
    title: 'System Maintenance Notice',
    message: 'Our online portal will be down for maintenance on August 10th from 2-4 AM.',
    type: 'System Alert',
    channel: 'Push',
    status: 'Scheduled',
    priority: 'High',
    recipients: 445,
    opened: 0,
    clicked: 0,
    sentDate: null,
    scheduledDate: '2024-08-09T20:00:00',
    targetAudience: 'All Users',
    category: 'Technical',
    template: 'system-alert'
  },
  {
    id: 'NOT004',
    title: 'New Course Available',
    message: 'Check out our new course on Biblical Leadership starting next month.',
    type: 'Promotional',
    channel: 'Email',
    status: 'Draft',
    priority: 'Medium',
    recipients: 0,
    opened: 0,
    clicked: 0,
    sentDate: null,
    scheduledDate: '2024-08-05T09:00:00',
    targetAudience: 'All Students',
    category: 'Academic',
    template: 'course-promotion'
  },
  {
    id: 'NOT005',
    title: 'Payment Due Reminder',
    message: 'Your tuition payment is due in 3 days. Please make your payment to avoid late fees.',
    type: 'Payment Alert',
    channel: 'Email',
    status: 'Sent',
    priority: 'High',
    recipients: 67,
    opened: 45,
    clicked: 12,
    sentDate: '2024-07-30T08:00:00',
    scheduledDate: null,
    targetAudience: 'Students with Outstanding Payments',
    category: 'Financial',
    template: 'payment-reminder'
  },
  {
    id: 'NOT006',
    title: 'Weekly Newsletter',
    message: 'This week\'s highlights: New staff introductions, upcoming events, and community news.',
    type: 'Newsletter',
    channel: 'Email',
    status: 'Sent',
    priority: 'Low',
    recipients: 389,
    opened: 234,
    clicked: 67,
    sentDate: '2024-07-29T06:00:00',
    scheduledDate: null,
    targetAudience: 'Newsletter Subscribers',
    category: 'General',
    template: 'weekly-newsletter'
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

export default function NotificationsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [channelFilter, setChannelFilter] = useState('All')

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

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.targetAudience.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || notification.status === statusFilter
    const matchesChannel = channelFilter === 'All' || notification.channel === channelFilter
    
    return matchesSearch && matchesStatus && matchesChannel
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

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Email':
        return <Mail className="w-3 h-3" />
      case 'SMS':
        return <Smartphone className="w-3 h-3" />
      case 'Push':
        return <Bell className="w-3 h-3" />
      case 'Web':
        return <Globe className="w-3 h-3" />
      default:
        return <MessageSquare className="w-3 h-3" />
    }
  }

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

  // Calculate stats
  const stats = {
    totalNotifications: notifications.length,
    sent: notifications.filter(n => n.status === 'Sent').length,
    scheduled: notifications.filter(n => n.status === 'Scheduled').length,
    totalRecipients: notifications.reduce((sum, n) => sum + n.recipients, 0),
    totalOpened: notifications.reduce((sum, n) => sum + n.opened, 0),
    openRate: notifications.reduce((sum, n) => sum + n.recipients, 0) > 0 
      ? Math.round((notifications.reduce((sum, n) => sum + n.opened, 0) / notifications.reduce((sum, n) => sum + n.recipients, 0)) * 100)
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
                <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600 text-xs">Manage push notifications, emails, and SMS</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-xs px-3 py-1">
                <Plus className="mr-1 h-3 w-3" />
                New Notification
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-2" variants={itemVariants}>
            <Card>
              <CardContent className="p-2">
                <div className="text-center">
                  <div className="bg-blue-100 p-1.5 rounded-full w-fit mx-auto mb-1">
                    <Bell className="h-3 w-3 text-blue-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-600">Total</p>
                  <p className="text-lg font-bold text-gray-900">{stats.totalNotifications}</p>
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
                  <p className="text-xs font-medium text-gray-600">Recipients</p>
                  <p className="text-lg font-bold text-gray-900">{stats.totalRecipients}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-2">
                <div className="text-center">
                  <div className="bg-orange-100 p-1.5 rounded-full w-fit mx-auto mb-1">
                    <Eye className="h-3 w-3 text-orange-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-600">Opened</p>
                  <p className="text-lg font-bold text-gray-900">{stats.totalOpened}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-2">
                <div className="text-center">
                  <div className="bg-teal-100 p-1.5 rounded-full w-fit mx-auto mb-1">
                    <Target className="h-3 w-3 text-teal-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-600">Open Rate</p>
                  <p className="text-lg font-bold text-gray-900">{stats.openRate}%</p>
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
                        placeholder="Search notifications..."
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
                      value={channelFilter}
                      onChange={(e) => setChannelFilter(e.target.value)}
                      className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    >
                      <option value="All">All Channels</option>
                      <option value="Email">Email</option>
                      <option value="SMS">SMS</option>
                      <option value="Push">Push</option>
                      <option value="Web">Web</option>
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

          {/* Notifications List */}
          <motion.div className="space-y-2" variants={itemVariants}>
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">{notification.id}</Badge>
                          {getStatusBadge(notification.status)}
                          {getPriorityBadge(notification.priority)}
                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                            {getChannelIcon(notification.channel)}
                            {notification.channel}
                          </Badge>
                          <Badge variant="outline" className="text-xs">{notification.category}</Badge>
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{notification.title}</h3>
                        <p className="text-gray-600 text-xs mb-2 line-clamp-2">{notification.message}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-500 mb-2">
                          <div>
                            <span className="font-medium">Type:</span> {notification.type}
                          </div>
                          <div>
                            <span className="font-medium">Recipients:</span> {notification.recipients}
                          </div>
                          <div>
                            <span className="font-medium">Audience:</span> {notification.targetAudience}
                          </div>
                          <div>
                            <span className="font-medium">Template:</span> {notification.template}
                          </div>
                        </div>

                        {notification.status === 'Sent' && (
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{notification.opened} opened ({Math.round((notification.opened / notification.recipients) * 100)}%)</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              <span>{notification.clicked} clicked ({Math.round((notification.clicked / notification.recipients) * 100)}%)</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>Sent: {new Date(notification.sentDate!).toLocaleString()}</span>
                            </div>
                          </div>
                        )}

                        {notification.status === 'Scheduled' && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>Scheduled for: {new Date(notification.scheduledDate!).toLocaleString()}</span>
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
                        {notification.status === 'Draft' && (
                          <Button variant="outline" size="sm" className="text-xs px-2 py-1 text-blue-600">
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

          {filteredNotifications.length === 0 && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 text-center">
                  <Bell className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <h3 className="text-sm font-medium text-gray-900 mb-1">No notifications found</h3>
                  <p className="text-gray-600 text-xs mb-3">
                    No notifications match your current search criteria.
                  </p>
                  <Button size="sm" onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('All')
                    setChannelFilter('All')
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
