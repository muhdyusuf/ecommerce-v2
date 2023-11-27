'use client'
import { FC } from 'react'
import Cart from './CartPopover'
import SearchInput from './SearchInput'
import Link from 'next/link'
import { CartProvider } from '@/context/cartContext'

interface NavbarProps {
  
}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <header
        className='fixed top-0 left-0 w-full bg-accent-500/50 backdrop-blur-[2px] z-50 h-navbar'
    >
        <nav
            className='p-2 md:container flex justify-between items-center h-full gap-2'
        >
            <Link
                href={"/"}
                className='hidden sm:block'
            >
                home
            </Link>
         
        
            <SearchInput/>
            
            <Cart />

            
        </nav>
    </header>
   )
}

export default Navbar