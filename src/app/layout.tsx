import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ui/theme-provider'

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
        className={cn("flex flex-col justify-between gap-8 min-h-screen ",
        inter.className
        )} 
        suppressHydrationWarning={true}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
       
          </ThemeProvider>

      </body>
    </html>
  )
}
