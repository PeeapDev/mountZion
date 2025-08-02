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
  Users,
  GraduationCap,
  Calendar,
  Filter,
  Search,
  Printer,
  Mail,
  Eye
} from "lucide-react"

// Mock data for reports
const reportData = {
  totalStudents: 156,
  activeStudents: 142,
  graduatedStudents: 14,
  suspendedStudents: 0,
  averageAge: 28.5,
  averageGPA: 3.6,
  programDistribution: [
    { program: 'Explorer Training', count: 89, percentage: 57 },
    { program: 'Timothy Leadership Training', count: 67, percentage: 43 }
  ],
  genderDistribution: [
    { gender: 'Male', count: 92, percentage: 59 },
    { gender: 'Female', count: 64, percentage: 41 }
  ],
  ageGroups: [
    { range: '18-25', count: 34, percentage: 22 },
    { range: '26-35', count: 78, percentage: 50 },
    { range: '36-45', count: 32, percentage: 21 },
    { range: '46+', count: 12, percentage: 7 }
  ],
  enrollmentTrends: [
    { month: 'Jan 2024', enrolled: 23 },
    { month: 'Feb 2024', enrolled: 18 },
    { month: 'Mar 2024', enrolled: 31 },
    { month: 'Apr 2024', enrolled: 27 },
    { month: 'May 2024', enrolled: 22 },
    { month: 'Jun 2024', enrolled: 35 }
  ],
  topPerformers: [
    { name: 'Mary Johnson', program: 'Timothy Leadership', gpa: 3.9, completed: 5 },
    { name: 'John Doe', program: 'Explorer Training', gpa: 3.8, completed: 3 },
    { name: 'Michael Davis', program: 'Explorer Training', gpa: 3.6, completed: 4 }
  ]
}

const reportTemplates = [
  {
    id: 'enrollment-summary',
    title: 'Enrollment Summary Report',
    description: 'Overview of student enrollment statistics and trends',
    icon: Users,
    category: 'Overview'
  },
  {
    id: 'academic-performance',
    title: 'Academic Performance Report',
    description: 'Student GPA, course completion, and performance metrics',
    icon: BarChart3,
    category: 'Academic'
  },
  {
    id: 'program-analysis',
    title: 'Program Analysis Report',
    description: 'Distribution and performance across different programs',
    icon: PieChart,
    category: 'Programs'
  },
  {
    id: 'demographic-report',
    title: 'Demographic Analysis',
    description: 'Age, gender, and geographic distribution of students',
    icon: TrendingUp,
    category: 'Demographics'
  },
  {
    id: 'graduation-report',
    title: 'Graduation & Completion Report',
    description: 'Students who have completed programs and graduation rates',
    icon: GraduationCap,
    category: 'Academic'
  },
  {
    id: 'attendance-report',
    title: 'Attendance Report',
    description: 'Student attendance patterns and statistics',
    icon: Calendar,
    category: 'Attendance'
  }
]

export default function StudentReportsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  })
  const [filters, setFilters] = useState({
    program: 'All',
    status: 'All',
    gender: 'All'
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
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Generated report:', reportId, 'with filters:', filters, 'and date range:', dateRange)
      // In a real app, this would trigger a download or open a new window
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
            <h1 className="text-3xl font-bold text-gray-900">Student Reports</h1>
            <p className="text-gray-600 mt-2">Generate comprehensive reports and analytics for student data</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">{reportData.totalStudents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Average GPA</p>
                    <p className="text-2xl font-bold text-gray-900">{reportData.averageGPA}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <GraduationCap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Graduated</p>
                    <p className="text-2xl font-bold text-gray-900">{reportData.graduatedStudents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Age</p>
                    <p className="text-2xl font-bold text-gray-900">{reportData.averageAge}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Report Templates */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Available Reports</CardTitle>
                  <CardDescription>
                    Select a report template to generate detailed analytics
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
            <div className="space-y-6">
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
                    <Label htmlFor="programFilter">Program</Label>
                    <select
                      id="programFilter"
                      value={filters.program}
                      onChange={(e) => handleFilterChange('program', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="All">All Programs</option>
                      <option value="Explorer Training">Explorer Training</option>
                      <option value="Timothy Leadership Training">Timothy Leadership Training</option>
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
                      <option value="Active">Active</option>
                      <option value="Graduated">Graduated</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="genderFilter">Gender</Label>
                    <select
                      id="genderFilter"
                      value={filters.gender}
                      onChange={(e) => handleFilterChange('gender', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="All">All Genders</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
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
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportData.programDistribution.map((item) => (
                    <div key={item.program} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.program}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportData.ageGroups.map((group) => (
                    <div key={group.range} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{group.range}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${group.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{group.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportData.topPerformers.map((student, index) => (
                    <div key={student.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{student.name}</p>
                        <p className="text-xs text-gray-600">GPA: {student.gpa}</p>
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
