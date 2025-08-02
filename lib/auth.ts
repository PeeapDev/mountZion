// Simple authentication without Supabase
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  firstName?: string
  lastName?: string
  phone?: string
  dateOfBirth?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  emergencyContact?: string
  emergencyPhone?: string
  interestedPrograms?: string[]
  registrationDate?: string
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

// Mock users for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@mountzion.org',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'student@mountzion.org',
    name: 'John Student',
    role: 'user'
  },
  {
    id: '3',
    email: 'member@mountzion.org',
    name: 'Mary Member',
    role: 'user'
  }
]

export class AuthService {
  private static readonly SESSION_KEY = 'mount_zion_session'
  private static readonly USERS_KEY = 'mount_zion_users'

  static async login(email: string, password: string): Promise<User | null> {
    // Get all users (mock + registered)
    const allUsers = this.getAllUsers()
    const user = allUsers.find(u => u.email === email)
    
    if (user && password === 'password123') {
      // Store session in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(user))
      }
      return user
    }
    
    return null
  }

  static async register(data: RegistrationData): Promise<User | null> {
    try {
      // Check if user already exists
      const allUsers = this.getAllUsers()
      const existingUser = allUsers.find(u => u.email === data.email)
      
      if (existingUser) {
        throw new Error('User with this email already exists')
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(), // Simple ID generation
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        role: 'user',
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        emergencyContact: data.emergencyContact,
        emergencyPhone: data.emergencyPhone,
        interestedPrograms: data.interestedPrograms,
        registrationDate: new Date().toISOString()
      }

      // Save to localStorage (in real app, this would be an API call)
      if (typeof window !== 'undefined') {
        const registeredUsers = this.getRegisteredUsers()
        registeredUsers.push(newUser)
        localStorage.setItem(this.USERS_KEY, JSON.stringify(registeredUsers))
      }

      return newUser
    } catch (error) {
      console.error('Registration failed:', error)
      return null
    }
  }

  private static getAllUsers(): User[] {
    return [...mockUsers, ...this.getRegisteredUsers()]
  }

  private static getRegisteredUsers(): User[] {
    if (typeof window === 'undefined') return []
    
    try {
      const users = localStorage.getItem(this.USERS_KEY)
      return users ? JSON.parse(users) : []
    } catch {
      return []
    }
  }

  static logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.SESSION_KEY)
    }
  }

  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null
    
    try {
      const session = localStorage.getItem(this.SESSION_KEY)
      return session ? JSON.parse(session) : null
    } catch {
      return null
    }
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  static isAdmin(): boolean {
    const user = this.getCurrentUser()
    return user?.role === 'admin'
  }
}
