import { supabase } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export interface Profile {
  id: string
  email: string
  first_name?: string
  last_name?: string
  full_name?: string
  phone?: string
  date_of_birth?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  emergency_contact?: string
  emergency_phone?: string
  role: 'admin' | 'instructor' | 'student'
  status: 'active' | 'inactive' | 'suspended'
  registration_date?: string
  subscribe_newsletter?: boolean
  avatar_url?: string
}

export interface RegistrationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  city: string
  state: string
  zipCode: string
  emergencyContact: string
  emergencyPhone: string
  interestedPrograms: string[]
  password: string
  subscribeNewsletter: boolean
}

export class SupabaseAuthService {
  // Sign up new user
  static async signUp(data: RegistrationData): Promise<{ user: User | null; profile: Profile | null; error: string | null }> {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            full_name: `${data.firstName} ${data.lastName}`,
          }
        }
      })

      if (authError) {
        return { user: null, profile: null, error: authError.message }
      }

      if (!authData.user) {
        return { user: null, profile: null, error: 'Failed to create user' }
      }

      // Update profile with additional information
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          full_name: `${data.firstName} ${data.lastName}`,
          phone: data.phone,
          date_of_birth: data.dateOfBirth,
          address: data.address,
          city: data.city,
          state: data.state,
          zip_code: data.zipCode,
          emergency_contact: data.emergencyContact,
          emergency_phone: data.emergencyPhone,
          subscribe_newsletter: data.subscribeNewsletter,
          role: 'student'
        })
        .eq('id', authData.user.id)
        .select()
        .single()

      if (profileError) {
        console.error('Profile update error:', profileError)
        // Don't return error here as user is created, just profile update failed
      }

      // Add program interests
      if (data.interestedPrograms.length > 0) {
        // First get program IDs
        const { data: programs } = await supabase
          .from('programs')
          .select('id, name')
          .in('name', data.interestedPrograms)

        if (programs && programs.length > 0) {
          const interests = programs.map(program => ({
            student_id: authData.user!.id,
            program_id: program.id
          }))

          await supabase
            .from('student_program_interests')
            .insert(interests)
        }
      }

      return { 
        user: authData.user, 
        profile: profileData || null, 
        error: null 
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { 
        user: null, 
        profile: null, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      }
    }
  }

  // Sign in user
  static async signIn(email: string, password: string): Promise<{ user: User | null; profile: Profile | null; error: string | null }> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (authError) {
        return { user: null, profile: null, error: authError.message }
      }

      if (!authData.user) {
        return { user: null, profile: null, error: 'Authentication failed' }
      }

      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (profileError) {
        console.error('Profile fetch error:', profileError)
        return { user: authData.user, profile: null, error: null }
      }

      return { 
        user: authData.user, 
        profile: profileData, 
        error: null 
      }
    } catch (error) {
      console.error('Sign in error:', error)
      return { 
        user: null, 
        profile: null, 
        error: error instanceof Error ? error.message : 'Sign in failed' 
      }
    }
  }

  // Sign out user
  static async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut()
      return { error: error ? error.message : null }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error: error instanceof Error ? error.message : 'Sign out failed' }
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<{ user: User | null; profile: Profile | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { user: null, profile: null }
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      return { user, profile: profileData || null }
    } catch (error) {
      console.error('Get current user error:', error)
      return { user: null, profile: null }
    }
  }

  // Get user session
  static async getSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      return session
    } catch (error) {
      console.error('Get session error:', error)
      return null
    }
  }

  // Listen to auth changes
  static onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }

  // Update user profile
  static async updateProfile(userId: string, updates: Partial<Profile>): Promise<{ profile: Profile | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        return { profile: null, error: error.message }
      }

      return { profile: data, error: null }
    } catch (error) {
      console.error('Update profile error:', error)
      return { 
        profile: null, 
        error: error instanceof Error ? error.message : 'Profile update failed' 
      }
    }
  }

  // Reset password
  static async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      return { error: error ? error.message : null }
    } catch (error) {
      console.error('Reset password error:', error)
      return { error: error instanceof Error ? error.message : 'Password reset failed' }
    }
  }

  // Update password
  static async updatePassword(newPassword: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      return { error: error ? error.message : null }
    } catch (error) {
      console.error('Update password error:', error)
      return { error: error instanceof Error ? error.message : 'Password update failed' }
    }
  }
}
