import { supabase } from '@/lib/supabase/client'

// Types
export interface Program {
  id: string
  name: string
  description?: string
  duration_weeks?: number
  fee?: number
  status: 'active' | 'inactive' | 'draft'
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  program_id?: string
  name: string
  description?: string
  instructor_id?: string
  start_date?: string
  end_date?: string
  schedule_days?: string[]
  schedule_time?: string
  max_students?: number
  current_students?: number
  fee?: number
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
  program?: Program
  instructor?: any
}

export interface Event {
  id: string
  title: string
  description?: string
  event_type: 'general' | 'course' | 'workshop' | 'ceremony' | 'meeting'
  start_date: string
  end_date?: string
  location?: string
  venue_id?: string
  max_attendees?: number
  current_attendees?: number
  fee?: number
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
  created_by?: string
  created_at: string
  updated_at: string
  venue?: Venue
}

export interface Venue {
  id: string
  name: string
  description?: string
  capacity: number
  location?: string
  facilities?: string[]
  manager_name?: string
  manager_contact?: string
  hourly_rate?: number
  status: 'available' | 'maintenance' | 'unavailable'
  notes?: string
  created_at: string
  updated_at: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  announcement_type: 'general' | 'urgent' | 'academic' | 'event' | 'system'
  target_audience: 'all' | 'students' | 'instructors' | 'staff'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  published: boolean
  publish_date?: string
  expire_date?: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  student_id?: string
  course_id?: string
  event_id?: string
  amount: number
  payment_type: 'course_fee' | 'event_fee' | 'facility_booking' | 'other'
  payment_method?: 'cash' | 'bank_transfer' | 'mobile_money' | 'card' | 'other'
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  payment_date?: string
  reference_number?: string
  notes?: string
  created_at: string
  updated_at: string
}

export class DatabaseService {
  // Programs
  static async getPrograms() {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('status', 'active')
      .order('name')

    if (error) throw error
    return data as Program[]
  }

  static async createProgram(program: Omit<Program, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('programs')
      .insert(program)
      .select()
      .single()

    if (error) throw error
    return data as Program
  }

  // Courses
  static async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        program:programs(*),
        instructor:profiles(*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Course[]
  }

  static async createCourse(course: Omit<Course, 'id' | 'created_at' | 'updated_at' | 'program' | 'instructor'>) {
    const { data, error } = await supabase
      .from('courses')
      .insert(course)
      .select()
      .single()

    if (error) throw error
    return data as Course
  }

  static async updateCourse(id: string, updates: Partial<Course>) {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Course
  }

  // Events
  static async getEvents() {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        venue:venues(*)
      `)
      .order('start_date', { ascending: false })

    if (error) throw error
    return data as Event[]
  }

  static async createEvent(event: Omit<Event, 'id' | 'created_at' | 'updated_at' | 'venue'>) {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single()

    if (error) throw error
    return data as Event
  }

  static async updateEvent(id: string, updates: Partial<Event>) {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Event
  }

  // Venues
  static async getVenues() {
    const { data, error } = await supabase
      .from('venues')
      .select('*')
      .order('name')

    if (error) throw error
    return data as Venue[]
  }

  static async createVenue(venue: Omit<Venue, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('venues')
      .insert(venue)
      .select()
      .single()

    if (error) throw error
    return data as Venue
  }

  static async updateVenue(id: string, updates: Partial<Venue>) {
    const { data, error } = await supabase
      .from('venues')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Venue
  }

  // Announcements
  static async getAnnouncements() {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Announcement[]
  }

  static async createAnnouncement(announcement: Omit<Announcement, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('announcements')
      .insert(announcement)
      .select()
      .single()

    if (error) throw error
    return data as Announcement
  }

  static async updateAnnouncement(id: string, updates: Partial<Announcement>) {
    const { data, error } = await supabase
      .from('announcements')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Announcement
  }

  // Payments
  static async getPayments() {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        student:profiles(*),
        course:courses(*),
        event:events(*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Payment[]
  }

  static async createPayment(payment: Omit<Payment, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('payments')
      .insert(payment)
      .select()
      .single()

    if (error) throw error
    return data as Payment
  }

  static async updatePayment(id: string, updates: Partial<Payment>) {
    const { data, error } = await supabase
      .from('payments')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Payment
  }

  // Students/Profiles
  static async getStudents() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'student')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  // Course Enrollments
  static async enrollInCourse(studentId: string, courseId: string) {
    const { data, error } = await supabase
      .from('course_enrollments')
      .insert({
        student_id: studentId,
        course_id: courseId,
        status: 'enrolled'
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async getStudentEnrollments(studentId: string) {
    const { data, error } = await supabase
      .from('course_enrollments')
      .select(`
        *,
        course:courses(*)
      `)
      .eq('student_id', studentId)
      .order('enrollment_date', { ascending: false })

    if (error) throw error
    return data
  }

  // Dashboard Statistics
  static async getDashboardStats() {
    try {
      const [
        studentsResult,
        coursesResult,
        eventsResult,
        paymentsResult
      ] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'student'),
        supabase.from('courses').select('id', { count: 'exact' }).eq('status', 'active'),
        supabase.from('events').select('id', { count: 'exact' }).gte('start_date', new Date().toISOString()),
        supabase.from('payments').select('amount').eq('payment_status', 'completed')
      ])

      const totalRevenue = paymentsResult.data?.reduce((sum, payment) => sum + payment.amount, 0) || 0

      return {
        totalStudents: studentsResult.count || 0,
        activeCourses: coursesResult.count || 0,
        upcomingEvents: eventsResult.count || 0,
        totalRevenue
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      return {
        totalStudents: 0,
        activeCourses: 0,
        upcomingEvents: 0,
        totalRevenue: 0
      }
    }
  }
}
