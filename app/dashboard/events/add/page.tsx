'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SidebarNav from "@/components/sidebar-nav"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  ArrowLeft,
  Save,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  FileText,
  Tag,
  AlertCircle,
  Upload,
  Eye
} from "lucide-react"

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

export default function AddEventPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    venue: '',
    capacity: '',
    fee: '',
    organizer: '',
    isPublic: true,
    requirements: '',
    materials: '',
    tags: '',
    image: null as File | null
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({
      ...prev,
      image: file
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = 'Event title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.type) newErrors.type = 'Event type is required'
    if (!formData.startDate) newErrors.startDate = 'Start date is required'
    if (!formData.endDate) newErrors.endDate = 'End date is required'
    if (!formData.startTime) newErrors.startTime = 'Start time is required'
    if (!formData.endTime) newErrors.endTime = 'End time is required'
    if (!formData.venue.trim()) newErrors.venue = 'Venue is required'
    if (!formData.capacity) newErrors.capacity = 'Capacity is required'
    if (!formData.organizer.trim()) newErrors.organizer = 'Organizer is required'

    // Date validation
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = 'End date must be after start date'
      }
    }

    // Capacity validation
    if (formData.capacity && parseInt(formData.capacity) <= 0) {
      newErrors.capacity = 'Capacity must be greater than 0'
    }

    // Fee validation
    if (formData.fee && parseFloat(formData.fee) < 0) {
      newErrors.fee = 'Fee cannot be negative'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('New event data:', formData)
      
      // Redirect to events list with success message
      router.push('/dashboard/events?success=Event created successfully')
    } catch (error) {
      console.error('Error creating event:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = async () => {
    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Event saved as draft:', formData)
      router.push('/dashboard/events?success=Event saved as draft')
    } catch (error) {
      console.error('Error saving draft:', error)
    } finally {
      setIsSubmitting(false)
    }
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div className="mb-3" variants={itemVariants}>
            <div className="flex items-center gap-4 mb-2">
              <Link href="/dashboard/events">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
                <p className="text-gray-600 text-sm">Plan and organize a new church event</p>
              </div>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Basic Information */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Essential details about the event
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title" className="text-sm">Event Title *</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`text-sm ${errors.title ? 'border-red-500' : ''}`}
                        placeholder="Enter event title"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.title}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="type" className="text-sm">Event Type *</Label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className={`w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select Event Type</option>
                        <option value="Conference">Conference</option>
                        <option value="Retreat">Retreat</option>
                        <option value="Outreach">Outreach</option>
                        <option value="Spiritual">Spiritual</option>
                        <option value="Camp">Camp</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Meeting">Meeting</option>
                      </select>
                      {errors.type && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.type}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm">Description *</Label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Describe the event purpose and activities..."
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="organizer" className="text-sm">Organizer *</Label>
                    <Input
                      id="organizer"
                      name="organizer"
                      value={formData.organizer}
                      onChange={handleInputChange}
                      className={`text-sm ${errors.organizer ? 'border-red-500' : ''}`}
                      placeholder="Event organizer name"
                    />
                    {errors.organizer && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.organizer}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Date & Time */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5" />
                    Date & Time
                  </CardTitle>
                  <CardDescription className="text-sm">
                    When the event will take place
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate" className="text-sm">Start Date *</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className={`text-sm ${errors.startDate ? 'border-red-500' : ''}`}
                      />
                      {errors.startDate && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.startDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="endDate" className="text-sm">End Date *</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className={`text-sm ${errors.endDate ? 'border-red-500' : ''}`}
                      />
                      {errors.endDate && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.endDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startTime" className="text-sm">Start Time *</Label>
                      <Input
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        className={`text-sm ${errors.startTime ? 'border-red-500' : ''}`}
                      />
                      {errors.startTime && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.startTime}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="endTime" className="text-sm">End Time *</Label>
                      <Input
                        id="endTime"
                        name="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        className={`text-sm ${errors.endTime ? 'border-red-500' : ''}`}
                      />
                      {errors.endTime && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.endTime}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Venue & Capacity */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5" />
                    Venue & Capacity
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Location and attendance details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="venue" className="text-sm">Venue *</Label>
                      <Input
                        id="venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleInputChange}
                        className={`text-sm ${errors.venue ? 'border-red-500' : ''}`}
                        placeholder="Event location"
                      />
                      {errors.venue && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.venue}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="capacity" className="text-sm">Capacity *</Label>
                      <Input
                        id="capacity"
                        name="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        className={`text-sm ${errors.capacity ? 'border-red-500' : ''}`}
                        placeholder="Maximum attendees"
                      />
                      {errors.capacity && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.capacity}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fee" className="text-sm">Registration Fee</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="fee"
                          name="fee"
                          type="number"
                          step="0.01"
                          value={formData.fee}
                          onChange={handleInputChange}
                          className={`pl-10 text-sm ${errors.fee ? 'border-red-500' : ''}`}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.fee && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.fee}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <input
                        type="checkbox"
                        id="isPublic"
                        name="isPublic"
                        checked={formData.isPublic}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <Label htmlFor="isPublic" className="text-sm">
                        Public Event (visible to all)
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Additional Details */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Tag className="h-5 w-5" />
                    Additional Details
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Extra information and requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="requirements" className="text-sm">Requirements</Label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Any special requirements or restrictions..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="materials" className="text-sm">Materials Provided</Label>
                    <textarea
                      id="materials"
                      name="materials"
                      value={formData.materials}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Materials, resources, or items provided to attendees..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags" className="text-sm">Tags</Label>
                    <Input
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="text-sm"
                      placeholder="Separate tags with commas (e.g., youth, leadership, worship)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="image" className="text-sm">Event Image</Label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="image"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image"
                              name="image"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                    {formData.image && (
                      <p className="text-sm text-green-600 mt-2">
                        Selected: {formData.image.name}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Submit Buttons */}
            <motion.div className="flex justify-end gap-3 pt-2" variants={itemVariants}>
              <Link href="/dashboard/events">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button 
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSubmitting}
              >
                Save as Draft
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Event...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create Event
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.main>
    </div>
  )
}
