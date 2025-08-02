'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SidebarNav from "@/components/sidebar-nav"
import { 
  Download,
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  DollarSign,
  CreditCard,
  Calendar,
  Filter,
  Search,
  Printer,
  Mail,
  Eye,
  Receipt,
  Banknote,
  Wallet
} from "lucide-react"

// Mock financial data
const financialData = {
  totalRevenue: 45750,
  totalExpenses: 28400,
  netIncome: 17350,
  pendingPayments: 8200,
  averagePayment: 285,
  totalTransactions: 324,
  revenueByMonth: [
    { month: 'Jan 2024', amount: 7200 },
    { month: 'Feb 2024', amount: 6800 },
    { month: 'Mar 2024', amount: 8100 },
    { month: 'Apr 2024', amount: 7650 },
    { month: 'May 2024', amount: 8000 },
    { month: 'Jun 2024', amount: 8000 }
  ],
  expenseCategories: [
    { category: 'Staff Salaries', amount: 15000, percentage: 53 },
    { category: 'Facility Costs', amount: 6500, percentage: 23 },
    { category: 'Materials & Supplies', amount: 4200, percentage: 15 },
    { category: 'Equipment', amount: 2700, percentage: 9 }
  ],
  paymentMethods: [
    { method: 'Bank Transfer', count: 156, amount: 28400 },
    { method: 'Cash', count: 98, amount: 12200 },
    { method: 'Mobile Money', count: 70, amount: 5150 }
  ]
}

const reportTemplates = [
  {
    id: 'revenue-summary',
    title: 'Revenue Summary Report',
    description: 'Overview of all revenue streams and income sources',
    icon: DollarSign,
    category: 'Revenue'
  },
  {
    id: 'expense-analysis',
    title: 'Expense Analysis Report',
    description: 'Detailed breakdown of all expenses and spending patterns',
    icon: CreditCard,
    category: 'Expenses'
  },
  {
    id: 'payment-records',
    title: 'Payment Records Report',
    description: 'Complete record of all student payments and transactions',
    icon: Receipt,
    category: 'Payments'
  },
  {
    id: 'financial-summary',
    title: 'Financial Summary Report',
    description: 'Comprehensive overview of financial performance',
    icon: BarChart3,
    category: 'Overview'
  },
  {
    id: 'budget-analysis',
    title: 'Budget vs Actual Report',
    description: 'Compare budgeted amounts with actual spending',
    icon: PieChart,
    category: 'Budget'
  },
  {
    id: 'cash-flow',
    title: 'Cash Flow Report',
    description: 'Track money coming in and going out over time',
    icon: TrendingUp,
    category: 'Cash Flow'
  }
]

export default function FinancialReportsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  })
  const [filters, setFilters] = useState({
    category: 'All',
    paymentMethod: 'All',
    status: 'All'
  })
  const [isGenerating, setIsGenerating] = useState(false)

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

  const handleGenerateReport = async (reportId: string) => {
    setIsGenerating(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Generated financial report:', reportId, 'with filters:', filters, 'and date range:', dateRange)
    } catch (error) {
      console.error('Error generating report:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav />
      
      <main className="flex-1 ml-64 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
            <p className="text-gray-600 mt-2">Generate comprehensive financial reports and analytics</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${financialData.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-red-100 p-3 rounded-full">
                    <CreditCard className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                    <p className="text-2xl font-bold text-gray-900">${financialData.totalExpenses.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Net Income</p>
                    <p className="text-2xl font-bold text-gray-900">${financialData.netIncome.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Wallet className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                    <p className="text-2xl font-bold text-gray-900">${financialData.pendingPayments.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Report Templates */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Available Reports</CardTitle>
                  <CardDescription>
                    Select a financial report template to generate detailed analytics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reportTemplates.map((template) => {
                      const IconComponent = template.icon
                      return (
                        <div
                          key={template.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            selectedReport === template.id 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedReport(template.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${
                              selectedReport === template.id 
                                ? 'bg-green-100' 
                                : 'bg-gray-100'
                            }`}>
                              <IconComponent className={`h-5 w-5 ${
                                selectedReport === template.id 
                                  ? 'text-green-600' 
                                  : 'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{template.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                              <Badge variant="outline" className="mt-2 text-xs">
                                {template.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Generation */}
            <div className="space-y-4">
              {/* Date Range */}
              <Card>
                <CardHeader>
                  <CardTitle>Date Range</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={dateRange.startDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="categoryFilter">Category</Label>
                    <select
                      id="categoryFilter"
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="All">All Categories</option>
                      <option value="Revenue">Revenue</option>
                      <option value="Expenses">Expenses</option>
                      <option value="Payments">Payments</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="paymentMethodFilter">Payment Method</Label>
                    <select
                      id="paymentMethodFilter"
                      value={filters.paymentMethod}
                      onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="All">All Methods</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash">Cash</option>
                      <option value="Mobile Money">Mobile Money</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="statusFilter">Status</Label>
                    <select
                      id="statusFilter"
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="All">All Status</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Generate Report */}
              <Card>
                <CardHeader>
                  <CardTitle>Generate Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => selectedReport && handleGenerateReport(selectedReport)}
                    disabled={!selectedReport || isGenerating}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Report
                      </>
                    )}
                  </Button>

                  {selectedReport && (
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Report
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Insights */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {financialData.revenueByMonth.slice(-3).map((item) => (
                    <div key={item.month} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.month}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(item.amount / 10000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">${item.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {financialData.expenseCategories.slice(0, 3).map((category) => (
                    <div key={category.category} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{category.category}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full" 
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">${category.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {financialData.paymentMethods.map((method) => (
                    <div key={method.method} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{method.method}</span>
                      <div className="text-right">
                        <p className="text-sm font-medium">${method.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{method.count} transactions</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
