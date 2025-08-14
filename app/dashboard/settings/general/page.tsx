'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { supabase } from '@/lib/supabase/client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SidebarNav from "@/components/sidebar-nav"
import { motion } from "framer-motion"
import { 
  Save,
  Settings,
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  Users,
  Shield,
  Bell,
  Database,
  Server,
  Key,
  FileText,
  Image,
  Palette,
  Languages,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Upload,
  Download,
  RefreshCw
} from "lucide-react"

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

export default function GeneralSettingsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [logoUploading, setLogoUploading] = useState(false)

  // Form state
  const [settings, setSettings] = useState({
    // Organization Details
    organizationName: 'Mount Zion Training Centre',
    organizationTagline: 'Equipping Leaders for Kingdom Service',
    organizationDescription: 'A premier Christian training institution dedicated to developing spiritual leaders and ministers.',
    
    // Contact Information
    primaryEmail: 'info@mountziontraining.org',
    supportEmail: 'support@mountziontraining.org',
    primaryPhone: '+1 (555) 123-4567',
    fax: '+1 (555) 123-4568',
    
    // Address
    streetAddress: '123 Faith Avenue',
    city: 'Springfield',
    state: 'Illinois',
    zipCode: '62701',
    country: 'United States',
    
    // Website & Social
    websiteUrl: 'https://mountziontraining.org',
    facebookUrl: 'https://facebook.com/mountziontraining',
    twitterUrl: 'https://twitter.com/mountziontraining',
    instagramUrl: 'https://instagram.com/mountziontraining',
    youtubeUrl: 'https://youtube.com/mountziontraining',
    
    // Academic Settings
    academicYear: '2024-2025',
    semesterSystem: 'Semester',
    defaultCurrency: 'USD',
    timeZone: 'America/Chicago',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour',
    
    // System Settings
    maintenanceMode: false,
    registrationOpen: true,
    publicRegistration: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    
    // Branding
    primaryColor: '#16a34a',
    secondaryColor: '#059669',
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico',
    
    // Limits
    maxStudentsPerCourse: 50,
    maxCoursesPerStudent: 8,
    sessionTimeout: 30,
    fileUploadLimit: 10,
    
    // Features
    enableCourseRatings: true,
    enableDiscussionForums: true,
    enableCertificates: true,
    enablePayments: true,
    enableReports: true,
    enableCalendar: true
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
    if (!isLoading && user && user.role !== 'admin') {
      router.push('/user-dashboard')
    }
    // Initialize logo from localStorage if present
    if (typeof window !== 'undefined') {
      const storedLogo = localStorage.getItem('siteLogoUrl')
      if (storedLogo) {
        setSettings(prev => ({ ...prev, logoUrl: storedLogo }))
      }
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

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLastSaved(new Date())
    setIsSaving(false)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLogoUpload = async (file: File) => {
    if (!file) return
    // Validate type and size
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG/JPG/SVG).')
      return
    }
    const maxBytes = Number(settings.fileUploadLimit || 10) * 1024 * 1024
    if (file.size > maxBytes) {
      alert(`File too large. Max ${settings.fileUploadLimit}MB allowed.`)
      return
    }
    try {
      setLogoUploading(true)
      // Temporarily bypass remote upload. Use a local object URL for preview only.
      const localUrl = URL.createObjectURL(file)
      handleInputChange('logoUrl', localUrl)
      if (typeof window !== 'undefined') {
        localStorage.setItem('siteLogoUrl', localUrl)
        window.dispatchEvent(new CustomEvent('site-logo-updated', { detail: localUrl }))
      }
      // Note: This is not persisted. Replace with API call when Supabase is ready.
      return
    } catch (err) {
      console.error('Logo upload failed:', err)
      alert('Logo upload failed. Please try again.')
    } finally {
      setLogoUploading(false)
    }
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
        <div className="max-w-6xl mx-auto space-y-2">
          {/* Header */}
          <motion.div variants={itemVariants}>
            <div className="flex justify-between items-center mb-2">
              <div>
                <h1 className="text-xl font-bold text-gray-900">General Settings</h1>
                <p className="text-gray-600 text-xs">Configure system-wide settings and preferences</p>
              </div>
              <div className="flex items-center gap-2">
                {lastSaved && (
                  <span className="text-xs text-gray-500">
                    Last saved: {lastSaved.toLocaleTimeString()}
                  </span>
                )}
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-green-600 hover:bg-green-700 text-xs px-3 py-1"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-1 h-3 w-3" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Organization Details */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Organization Details
                  </CardTitle>
                  <CardDescription className="text-xs">Basic information about your organization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="orgName" className="text-xs font-medium">Organization Name</Label>
                    <Input
                      id="orgName"
                      value={settings.organizationName}
                      onChange={(e) => handleInputChange('organizationName', e.target.value)}
                      className="text-xs h-8 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tagline" className="text-xs font-medium">Tagline</Label>
                    <Input
                      id="tagline"
                      value={settings.organizationTagline}
                      onChange={(e) => handleInputChange('organizationTagline', e.target.value)}
                      className="text-xs h-8 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-xs font-medium">Description</Label>
                    <textarea
                      id="description"
                      value={settings.organizationDescription}
                      onChange={(e) => handleInputChange('organizationDescription', e.target.value)}
                      className="w-full text-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 mt-1"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Information
                  </CardTitle>
                  <CardDescription className="text-xs">Primary contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="primaryEmail" className="text-xs font-medium">Primary Email</Label>
                    <Input
                      id="primaryEmail"
                      type="email"
                      value={settings.primaryEmail}
                      onChange={(e) => handleInputChange('primaryEmail', e.target.value)}
                      className="text-xs h-8 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="supportEmail" className="text-xs font-medium">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                      className="text-xs h-8 mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="phone" className="text-xs font-medium">Phone</Label>
                      <Input
                        id="phone"
                        value={settings.primaryPhone}
                        onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                        className="text-xs h-8 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fax" className="text-xs font-medium">Fax</Label>
                      <Input
                        id="fax"
                        value={settings.fax}
                        onChange={(e) => handleInputChange('fax', e.target.value)}
                        className="text-xs h-8 mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Branding */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Branding
                  </CardTitle>
                  <CardDescription className="text-xs">Upload your organization logo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded border bg-white flex items-center justify-center overflow-hidden">
                      {settings.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={settings.logoUrl} alt="Logo preview" className="h-full w-full object-contain" />
                      ) : (
                        <span className="text-[10px] text-gray-400">No Logo</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="logo" className="text-xs font-medium">Logo Image</Label>
                      <div className="mt-1 flex items-center gap-2">
                        <Input
                          id="logo"
                          type="file"
                          accept="image/*"
                          className="text-xs h-8"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleLogoUpload(file)
                          }}
                        />
                        <Button
                          type="button"
                          className="bg-green-600 hover:bg-green-700 text-xs"
                          disabled={logoUploading}
                          onClick={() => document.getElementById('logo')?.click()}
                        >
                          {logoUploading ? (
                            <>
                              <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="mr-1 h-3 w-3" />
                              Upload Logo
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">PNG or JPG up to {settings.fileUploadLimit}MB.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Address */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </CardTitle>
                  <CardDescription className="text-xs">Physical location details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="street" className="text-xs font-medium">Street Address</Label>
                    <Input
                      id="street"
                      value={settings.streetAddress}
                      onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                      className="text-xs h-8 mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="city" className="text-xs font-medium">City</Label>
                      <Input
                        id="city"
                        value={settings.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="text-xs h-8 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-xs font-medium">State</Label>
                      <Input
                        id="state"
                        value={settings.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="text-xs h-8 mt-1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="zip" className="text-xs font-medium">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={settings.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="text-xs h-8 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country" className="text-xs font-medium">Country</Label>
                      <Input
                        id="country"
                        value={settings.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="text-xs h-8 mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Academic Settings */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Academic Settings
                  </CardTitle>
                  <CardDescription className="text-xs">Academic year and system preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="academicYear" className="text-xs font-medium">Academic Year</Label>
                      <Input
                        id="academicYear"
                        value={settings.academicYear}
                        onChange={(e) => handleInputChange('academicYear', e.target.value)}
                        className="text-xs h-8 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="semester" className="text-xs font-medium">System</Label>
                      <select
                        id="semester"
                        value={settings.semesterSystem}
                        onChange={(e) => handleInputChange('semesterSystem', e.target.value)}
                        className="w-full text-xs h-8 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 mt-1"
                      >
                        <option value="Semester">Semester</option>
                        <option value="Quarter">Quarter</option>
                        <option value="Trimester">Trimester</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="currency" className="text-xs font-medium">Currency</Label>
                      <select
                        id="currency"
                        value={settings.defaultCurrency}
                        onChange={(e) => handleInputChange('defaultCurrency', e.target.value)}
                        className="w-full text-xs h-8 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 mt-1"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD (C$)</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="timezone" className="text-xs font-medium">Time Zone</Label>
                      <select
                        id="timezone"
                        value={settings.timeZone}
                        onChange={(e) => handleInputChange('timeZone', e.target.value)}
                        className="w-full text-xs h-8 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 mt-1"
                      >
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* System Features */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    System Features
                  </CardTitle>
                  <CardDescription className="text-xs">Enable or disable system features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.registrationOpen}
                        onChange={(e) => handleInputChange('registrationOpen', e.target.checked)}
                        className="w-3 h-3 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="text-xs">Registration Open</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.publicRegistration}
                        onChange={(e) => handleInputChange('publicRegistration', e.target.checked)}
                        className="w-3 h-3 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="text-xs">Public Registration</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.enableCourseRatings}
                        onChange={(e) => handleInputChange('enableCourseRatings', e.target.checked)}
                        className="w-3 h-3 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="text-xs">Course Ratings</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.enableDiscussionForums}
                        onChange={(e) => handleInputChange('enableDiscussionForums', e.target.checked)}
                        className="w-3 h-3 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="text-xs">Discussion Forums</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.enableCertificates}
                        onChange={(e) => handleInputChange('enableCertificates', e.target.checked)}
                        className="w-3 h-3 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="text-xs">Certificates</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.enablePayments}
                        onChange={(e) => handleInputChange('enablePayments', e.target.checked)}
                        className="w-3 h-3 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="text-xs">Online Payments</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Notification Settings */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </CardTitle>
                  <CardDescription className="text-xs">Configure notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-xs">Email Notifications</span>
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                      className="w-3 h-3 text-green-600 rounded focus:ring-green-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-xs">SMS Notifications</span>
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                      className="w-3 h-3 text-green-600 rounded focus:ring-green-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-xs">Push Notifications</span>
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                      className="w-3 h-3 text-green-600 rounded focus:ring-green-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-xs">Maintenance Mode</span>
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                      className="w-3 h-3 text-green-600 rounded focus:ring-green-500"
                    />
                  </label>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* System Limits */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  System Limits & Performance
                </CardTitle>
                <CardDescription className="text-xs">Configure system limits and performance settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <Label htmlFor="maxStudents" className="text-xs font-medium">Max Students/Course</Label>
                    <Input
                      id="maxStudents"
                      type="number"
                      value={settings.maxStudentsPerCourse}
                      onChange={(e) => handleInputChange('maxStudentsPerCourse', e.target.value)}
                      className="text-xs h-8 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxCourses" className="text-xs font-medium">Max Courses/Student</Label>
                    <Input
                      id="maxCourses"
                      type="number"
                      value={settings.maxCoursesPerStudent}
                      onChange={(e) => handleInputChange('maxCoursesPerStudent', e.target.value)}
                      className="text-xs h-8 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sessionTimeout" className="text-xs font-medium">Session Timeout (min)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                      className="text-xs h-8 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fileLimit" className="text-xs font-medium">File Upload Limit (MB)</Label>
                    <Input
                      id="fileLimit"
                      type="number"
                      value={settings.fileUploadLimit}
                      onChange={(e) => handleInputChange('fileUploadLimit', e.target.value)}
                      className="text-xs h-8 mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Save Button */}
          <motion.div variants={itemVariants} className="flex justify-end">
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save All Changes
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </motion.main>
    </div>
  )
}
