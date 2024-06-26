
import { FC } from 'react'
import SearchInput from './SearchInput'
import Link from 'next/link'
import CartPopover from './CartPopover'
import HamburgerMenu from './HamburgerMenu'
import { User } from 'lucide-react'

  

interface NavbarProps {
  
}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <>
    <header
        className='sticky top-0 left-0 w-full  h-16 z-50 border-b-2 border-muted bg-background'
        >
        <nav
            className='p-1 md:container flex justify-between items-center h-full gap-2 relative'
            >
            <HamburgerMenu/>
            <Link
                href={"/"}
                className='hidden md:block'
                >
                home
            </Link>
            <SearchInput/>
            <div
                className='flex items-center gap-2 md:gap-4'
            >
                <CartPopover />
                <Link
                    href={"/myAccount"}
                >
                    <User/>
                </Link>
            </div>




        </nav>
    </header>
    </>
   )        
}

export default Navbar