import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/contexts/AuthContext'
import RoleSwitcher from '@/components/RoleSwitcher'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <RoleSwitcher />
    </AuthProvider>
  )
} 