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
  CreditCard,
  Calendar,
  User,
  CheckCircle,
  Clock,
  XCircle,
  Receipt,
  Banknote
} from "lucide-react"

// Mock payment data
const mockPayments = [
  {
    id: 'PAY001',
    studentId: 'MZT001',
    studentName: 'John Doe',
    course: 'Explorer Training Foundation',
    amount: 150,
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
    date: '2024-08-01',
    reference: 'TXN-2024-001',
    description: 'Course fee payment',
    receiptNumber: 'RCP-001',
    processedBy: 'Admin User'
  },
  {
    id: 'PAY002',
    studentId: 'MZT002',
    studentName: 'Mary Johnson',
    course: 'Timothy Leadership Training',
    amount: 200,
    paymentMethod: 'Mobile Money',
    status: 'Completed',
    date: '2024-08-01',
    reference: 'TXN-2024-002',
    description: 'Course fee payment',
    receiptNumber: 'RCP-002',
    processedBy: 'Admin User'
  },
  {
    id: 'PAY003',
    studentId: 'MZT003',
    studentName: 'David Williams',
    course: 'Explorer Training Foundation',
    amount: 150,
    paymentMethod: 'Cash',
    status: 'Pending',
    date: '2024-08-02',
    reference: 'TXN-2024-003',
    description: 'Course fee payment',
    receiptNumber: 'RCP-003',
    processedBy: 'Admin User'
  },
  {
    id: 'PAY004',
    studentId: 'MZT004',
    studentName: 'Sarah Brown',
    course: 'Timothy Leadership Training',
    amount: 200,
    paymentMethod: 'Bank Transfer',
    status: 'Failed',
    date: '2024-08-02',
    reference: 'TXN-2024-004',
    description: 'Course fee payment',
    receiptNumber: 'RCP-004',
    processedBy: 'Admin User'
  },
  {
    id: 'PAY005',
    studentId: 'MZT005',
    studentName: 'Michael Davis',
    course: 'Advanced Explorer Methods',
    amount: 180,
    paymentMethod: 'Mobile Money',
    status: 'Completed',
    date: '2024-08-02',
    reference: 'TXN-2024-005',
    description: 'Course fee payment',
    receiptNumber: 'RCP-005',
    processedBy: 'Admin User'
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

export default function PaymentsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [payments, setPayments] = useState(mockPayments)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [methodFilter, setMethodFilter] = useState('All')

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

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || payment.status === statusFilter
    const matchesMethod = methodFilter === 'All' || payment.paymentMethod === methodFilter
    
    return matchesSearch && matchesStatus && matchesMethod
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case 'Failed':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'Bank Transfer':
        return <CreditCard className="w-4 h-4 text-blue-600" />
      case 'Mobile Money':
        return <Banknote className="w-4 h-4 text-green-600" />
      case 'Cash':
        return <DollarSign className="w-4 h-4 text-orange-600" />
      default:
        return <Receipt className="w-4 h-4 text-gray-600" />
    }
  }

  // Calculate stats
  const stats = {
    totalPayments: payments.length,
    completedPayments: payments.filter(p => p.status === 'Completed').length,
    totalAmount: payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0),
    pendingPayments: payments.filter(p => p.status === 'Pending').length
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
                <h1 className="text-2xl font-bold text-gray-900">Payment Records</h1>
                <p className="text-gray-600 text-sm">Track and manage all student payments</p>
              </div>
              <Link href="/dashboard/finance/payments/add">
                <Button className="bg-green-600 hover:bg-green-700 text-sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Record Payment
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
                    <Receipt className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Total Payments</p>
                    <p className="text-xl font-bold text-gray-900">{stats.totalPayments}</p>
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
                    <p className="text-xs font-medium text-gray-600">Completed</p>
                    <p className="text-xl font-bold text-gray-900">{stats.completedPayments}</p>
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
                    <p className="text-xs font-medium text-gray-600">Total Amount</p>
                    <p className="text-xl font-bold text-gray-900">${stats.totalAmount}</p>
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
                    <p className="text-xs font-medium text-gray-600">Pending</p>
                    <p className="text-xl font-bold text-gray-900">{stats.pendingPayments}</p>
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
                        placeholder="Search by student name, payment ID, or reference..."
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
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                      <option value="Failed">Failed</option>
                    </select>
                    <select
                      value={methodFilter}
                      onChange={(e) => setMethodFilter(e.target.value)}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="All">All Methods</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Mobile Money">Mobile Money</option>
                      <option value="Cash">Cash</option>
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

          {/* Payments Table */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Payment Records ({filteredPayments.length})</CardTitle>
                <CardDescription className="text-sm">
                  Complete list of all payment transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Payment ID</th>
                        <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Student</th>
                        <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Course</th>
                        <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Method</th>
                        <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredPayments.map((payment, index) => (
                        <motion.tr 
                          key={payment.id}
                          className="hover:bg-gray-50"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <td className="p-3">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{payment.id}</p>
                              <p className="text-xs text-gray-500">{payment.reference}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{payment.studentName}</p>
                              <p className="text-xs text-gray-500">{payment.studentId}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <p className="text-sm text-gray-900">{payment.course}</p>
                          </td>
                          <td className="p-3">
                            <p className="text-sm font-medium text-gray-900">${payment.amount}</p>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {getMethodIcon(payment.paymentMethod)}
                              <span className="text-sm text-gray-700">{payment.paymentMethod}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            {getStatusBadge(payment.status)}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span className="text-sm text-gray-700">
                                {new Date(payment.date).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {filteredPayments.length === 0 && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-8 text-center">
                  <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
                  <p className="text-gray-600 mb-4">
                    No payments match your current search criteria.
                  </p>
                  <Button onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('All')
                    setMethodFilter('All')
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
