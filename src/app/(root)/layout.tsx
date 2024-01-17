import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Ecommerce V2 | Malaysia',
    description: 'mock e ccommerce home page',
  }
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <Navbar/>
        {children}
        <Toaster/>
        <Footer/>
      </>
    )
  }
  