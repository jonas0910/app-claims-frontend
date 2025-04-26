import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-12">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-gray-700/50 shadow-2xl transition-all duration-300 hover:shadow-indigo-500/10">
        {children}
      </div>
    </div>
  )
}