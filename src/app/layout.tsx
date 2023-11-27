import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { CartProvider } from '../context/cartContext'
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Store',
  description: 'mock e commerce',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
        className={inter.className} 
          suppressHydrationWarning={true}>
        <CartProvider>
        <Navbar/>
        {children}
        </CartProvider>
        <Toaster />
      </body>
    </html>
  )
}
