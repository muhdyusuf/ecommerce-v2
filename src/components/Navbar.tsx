'use client'
import { FC } from 'react'
import Cart from './Cart'
import SearchInput from './SearchInput'
import Link from 'next/link'
import { CartProvider } from '@/app/context/cartContext'

interface NavbarProps {
  
}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <header
        className='fixed top-0 left-0 w-full bg-accent-500/50 backdrop-blur-[2px] z-50'
    >
        <nav
            className='md:container w-full flex justify-between p-2 items-center'
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