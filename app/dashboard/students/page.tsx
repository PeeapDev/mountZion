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
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  MoreHorizontal,
  GraduationCap,
  TrendingUp,
  BookOpen,
  Users,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin
} from "lucide-react"

// Mock student data
const mockStudents = [
  {
    id: 1,
    studentId: 'MZT001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+232 76 123 456',
    dateOfBirth: '1995-03-15',
    gender: 'Male',
    address: 'Freetown, Sierra Leone',
    enrollmentDate: '2024-01-15',
    program: 'Explorer Training',
    status: 'Active',
    completedCourses: 3,
    totalCourses: 8,
    gpa: 3.8,
    lastLogin: '2024-12-20'
  },
  {
    id: 2,
    studentId: 'MZT002',
    firstName: 'Mary',
    lastName: 'Johnson',
    email: 'mary.johnson@email.com',
    phone: '+232 76 234 567',
    dateOfBirth: '1992-07-22',
    gender: 'Female',
    address: 'Bo, Sierra Leone',
    enrollmentDate: '2024-02-01',
    program: 'Timothy Leadership Training',
    status: 'Active',
    completedCourses: 5,
    totalCourses: 10,
    gpa: 3.9,
    lastLogin: '2024-12-19'
  },
  {
    id: 3,
    studentId: 'MZT003',
    firstName: 'David',
    lastName: 'Williams',
    email: 'david.williams@email.com',
    phone: '+232 76 345 678',
    dateOfBirth: '1988-11-08',
    gender: 'Male',
    address: 'Kenema, Sierra Leone',
    enrollmentDate: '2023-09-10',
    program: 'Explorer Training',
    status: 'Graduated',
    completedCourses: 8,
    totalCourses: 8,
    gpa: 3.7,
    lastLogin: '2024-12-15'
  },
  {
    id: 4,
    studentId: 'MZT004',
    firstName: 'Sarah',
    lastName: 'Brown',
    email: 'sarah.brown@email.com',
    phone: '+232 76 456 789',
    dateOfBirth: '1990-05-30',
    gender: 'Female',
    address: 'Makeni, Sierra Leone',
    enrollmentDate: '2024-03-20',
    program: 'Timothy Leadership Training',
    status: 'Suspended',
    completedCourses: 2,
    totalCourses: 10,
    gpa: 2.8,
    lastLogin: '2024-11-28'
  },
  {
    id: 5,
    studentId: 'MZT005',
    firstName: 'Michael',
    lastName: 'Davis',
    email: 'michael.davis@email.com',
    phone: '+232 76 567 890',
    dateOfBirth: '1993-12-12',
    gender: 'Male',
    address: 'Freetown, Sierra Leone',
    enrollmentDate: '2024-01-08',
    program: 'Explorer Training',
    status: 'Active',
    completedCourses: 4,
    totalCourses: 8,
    gpa: 3.6,
    lastLogin: '2024-12-21'
  }
]

export default function ViewAllStudentsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [students, setStudents] = useState(mockStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [programFilter, setProgramFilter] = useState('All')

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

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter
    const matchesProgram = programFilter === 'All' || student.program === programFilter
    
    return matchesSearch && matchesStatus && matchesProgram
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Graduated': return 'bg-blue-100 text-blue-800'
      case 'Suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100)
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
                <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
                <p className="text-gray-600 mt-2">Manage all students and their academic progress</p>
              </div>
              <Link href="/dashboard/students/add">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Student
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full">
                      <UserCheck className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Students</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {students.filter(s => s.status === 'Active').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Graduated</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {students.filter(s => s.status === 'Graduated').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-3 rounded-full">
                      <UserX className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Suspended</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {students.filter(s => s.status === 'Suspended').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Students</p>
                      <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search students by name, ID, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  <select
                    value={programFilter}
                    onChange={(e) => setProgramFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="All">All Programs</option>
                    <option value="Explorer Training">Explorer Training</option>
                    <option value="Timothy Leadership Training">Timothy Leadership Training</option>
                  </select>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Students Table */}
          <Card>
            <CardHeader>
              <CardTitle>Students ({filteredStudents.length})</CardTitle>
              <CardDescription>
                Complete list of all registered students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Program</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Progress</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-green-600 font-semibold">
                                {student.firstName[0]}{student.lastName[0]}
                              </span>
                            </div>
                            <div className="ml-3">
                              <p className="font-semibold text-gray-900">
                                {student.firstName} {student.lastName}
                              </p>
                              <p className="text-sm text-gray-600">{student.studentId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="h-3 w-3 mr-1" />
                              {student.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-3 w-3 mr-1" />
                              {student.phone}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-900">{student.program}</p>
                          <p className="text-sm text-gray-600">
                            Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{student.completedCourses}/{student.totalCourses} courses</span>
                              <span>{getProgressPercentage(student.completedCourses, student.totalCourses)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${getProgressPercentage(student.completedCourses, student.totalCourses)}%` }}
                              ></div>
                            </div>
                            <p className="text-sm text-gray-600">GPA: {student.gpa}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(student.status)}>
                            {student.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <Link href={`/dashboard/students/${student.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href={`/dashboard/students/${student.id}/edit`}>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredStudents.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No students found matching your criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
