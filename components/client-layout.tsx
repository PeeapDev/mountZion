'use client'

import dynamic from 'next/dynamic'
import EditModeProvider from '@/components/edit-mode-provider'
import EditToolbar from '@/components/edit-toolbar'

// Dynamically import AuthProvider with SSR disabled to prevent hydration errors
const ClientAuthProvider = dynamic(() => import('@/components/client-auth-provider'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-green-700">Loading...</p>
      </div>
    </div>
  ),
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientAuthProvider>
      <EditModeProvider>
        {children}
        <EditToolbar />
      </EditModeProvider>
    </ClientAuthProvider>
  )
}
