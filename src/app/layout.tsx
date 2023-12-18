import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { CartProvider } from '../context/cartContext'
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils'
import Footer from '@/components/Footer'



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
        className={"flex flex-col justify-around min-h-[100dvh] gap-6"} 
          suppressHydrationWarning={true}>
        <CartProvider>
           {children}
        </CartProvider>
        <Toaster />
      </body>
    </html>
  )
}
