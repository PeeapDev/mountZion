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
  DollarSign,
  FileText,
  Calendar,
  User,
  CheckCircle,
  Clock,
  XCircle,
  Send,
  AlertCircle
} from "lucide-react"

// Mock invoice data
const mockInvoices = [
  {
    id: 'INV001',
    invoiceNumber: 'MZT-2024-001',
    studentId: 'MZT001',
    studentName: 'John Doe',
    studentEmail: 'john.doe@email.com',
    course: 'Explorer Training Foundation',
    amount: 150,
    tax: 15,
    totalAmount: 165,
    status: 'Paid',
    issueDate: '2024-07-15',
    dueDate: '2024-08-15',
    paidDate: '2024-08-01',
    description: 'Course enrollment fee for Explorer Training Foundation program',
    paymentTerms: '30 days',
    notes: 'Payment received via bank transfer'
  },
  {
    id: 'INV002',
    invoiceNumber: 'MZT-2024-002',
    studentId: 'MZT002',
    studentName: 'Mary Johnson',
    studentEmail: 'mary.johnson@email.com',
    course: 'Timothy Leadership Training',
    amount: 200,
    tax: 20,
    totalAmount: 220,
    status: 'Sent',
    issueDate: '2024-07-20',
    dueDate: '2024-08-20',
    paidDate: null,
    description: 'Course enrollment fee for Timothy Leadership Training program',
    paymentTerms: '30 days',
    notes: 'Invoice sent to student email'
  },
  {
    id: 'INV003',
    invoiceNumber: 'MZT-2024-003',
    studentId: 'MZT003',
    studentName: 'David Williams',
    studentEmail: 'david.williams@email.com',
    course: 'Advanced Explorer Methods',
    amount: 180,
    tax: 18,
    totalAmount: 198,
    status: 'Overdue',
    issueDate: '2024-06-15',
    dueDate: '2024-07-15',
    paidDate: null,
    description: 'Course enrollment fee for Advanced Explorer Methods program',
    paymentTerms: '30 days',
    notes: 'Payment overdue - follow up required'
  },
  {
    id: 'INV004',
    invoiceNumber: 'MZT-2024-004',
    studentId: 'MZT004',
    studentName: 'Sarah Brown',
    studentEmail: 'sarah.brown@email.com',
    course: 'Timothy Leadership Training',
    amount: 200,
    tax: 20,
    totalAmount: 220,
    status: 'Draft',
    issueDate: '2024-08-02',
    dueDate: '2024-09-02',
    paidDate: null,
    description: 'Course enrollment fee for Timothy Leadership Training program',
    paymentTerms: '30 days',
    notes: 'Draft invoice - not yet sent'
  },
  {
    id: 'INV005',
    invoiceNumber: 'MZT-2024-005',
    studentId: 'MZT005',
    studentName: 'Michael Davis',
    studentEmail: 'michael.davis@email.com',
    course: 'Explorer Training Foundation',
    amount: 150,
    tax: 15,
    totalAmount: 165,
    status: 'Cancelled',
    issueDate: '2024-07-10',
    dueDate: '2024-08-10',
    paidDate: null,
    description: 'Course enrollment fee for Explorer Training Foundation program',
    paymentTerms: '30 days',
    notes: 'Student withdrew from program'
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

export default function InvoicesPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [invoices, setInvoices] = useState(mockInvoices)
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

  // Filter invoices
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.course.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || invoice.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Paid</Badge>
      case 'Sent':
        return <Badge className="bg-blue-100 text-blue-800"><Send className="w-3 h-3 mr-1" />Sent</Badge>
      case 'Overdue':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />Overdue</Badge>
      case 'Draft':
        return <Badge className="bg-gray-100 text-gray-800"><FileText className="w-3 h-3 mr-1" />Draft</Badge>
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Calculate stats
  const stats = {
    totalInvoices: invoices.length,
    paidInvoices: invoices.filter(i => i.status === 'Paid').length,
    totalAmount: invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.totalAmount, 0),
    overdueInvoices: invoices.filter(i => i.status === 'Overdue').length
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
                <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
                <p className="text-gray-600 text-sm">Create and manage student invoices</p>
              </div>
              <Link href="/dashboard/finance/invoices/create">
                <Button className="bg-green-600 hover:bg-green-700 text-sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Invoice
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3" variants={itemVariants}>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Total Invoices</p>
                    <p className="text-xl font-bold text-gray-900">{stats.totalInvoices}</p>
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
                    <p className="text-xs font-medium text-gray-600">Paid</p>
                    <p className="text-xl font-bold text-gray-900">{stats.paidInvoices}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Total Revenue</p>
                    <p className="text-xl font-bold text-gray-900">${stats.totalAmount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-red-100 p-2 rounded-full">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Overdue</p>
                    <p className="text-xl font-bold text-gray-900">{stats.overdueInvoices}</p>
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
                        placeholder="Search by student name, invoice number, or course..."
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
                      <option value="Paid">Paid</option>
                      <option value="Sent">Sent</option>
                      <option value="Overdue">Overdue</option>
                      <option value="Draft">Draft</option>
                      <option value="Cancelled">Cancelled</option>
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

          {/* Invoices Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" variants={itemVariants}>
            {filteredInvoices.map((invoice, index) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{invoice.invoiceNumber}</CardTitle>
                        <CardDescription className="text-sm">{invoice.studentName}</CardDescription>
                      </div>
                      {getStatusBadge(invoice.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Course</p>
                      <p className="text-sm font-medium">{invoice.course}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-gray-600">Amount</p>
                        <p className="text-sm font-medium">${invoice.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-sm font-bold text-green-600">${invoice.totalAmount}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-gray-600">Issue Date</p>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <p className="text-sm">{new Date(invoice.issueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Due Date</p>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <p className="text-sm">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    {invoice.paidDate && (
                      <div>
                        <p className="text-sm text-gray-600">Paid Date</p>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <p className="text-sm text-green-600">{new Date(invoice.paidDate).toLocaleDateString()}</p>
                        </div>
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
                          {invoice.status === 'Draft' && (
                            <Button variant="outline" size="sm" className="text-blue-600">
                              <Send className="h-3 w-3" />
                            </Button>
                          )}
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

          {filteredInvoices.length === 0 && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
                  <p className="text-gray-600 mb-4">
                    No invoices match your current search criteria.
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
