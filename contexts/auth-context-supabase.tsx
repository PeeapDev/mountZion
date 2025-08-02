'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { SupabaseAuthService, Profile } from '@/lib/auth-supabase'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { user: currentUser, profile: currentProfile } = await SupabaseAuthService.getCurrentUser()
        setUser(currentUser)
        setProfile(currentProfile)
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = SupabaseAuthService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session)
        
        if (session?.user) {
          setUser(session.user)
          
          // Fetch user profile
          const { user: currentUser, profile: currentProfile } = await SupabaseAuthService.getCurrentUser()
          setProfile(currentProfile)
        } else {
          setUser(null)
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      const { user: signedInUser, profile: userProfile, error } = await SupabaseAuthService.signIn(email, password)
      
      if (error) {
        console.error('Sign in error:', error)
        return false
      }

      setUser(signedInUser)
      setProfile(userProfile)
      return true
    } catch (error) {
      console.error('Sign in error:', error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true)
      await SupabaseAuthService.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>): Promise<boolean> => {
    if (!user) return false

    try {
      const { profile: updatedProfile, error } = await SupabaseAuthService.updateProfile(user.id, updates)
      
      if (error) {
        console.error('Update profile error:', error)
        return false
      }

      setProfile(updatedProfile)
      return true
    } catch (error) {
      console.error('Update profile error:', error)
      return false
    }
  }

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signIn,
    signOut,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
