import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY.")
}

export const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
  cookies: {
    get(name: string) {
      return cookies().get(name)?.value
    },
    set(name: string, value: string, options: CookieOptions) {
      cookies().set({ name, value, ...options })
    },
    remove(name: string, options: CookieOptions) {
      cookies().set({ name, value: "", ...options })
    },
  },
})
