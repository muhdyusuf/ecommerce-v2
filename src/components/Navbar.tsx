import { FC } from 'react'
import SearchInput from './SearchInput'
import Link from 'next/link'
import CartPopover from './CartPopover'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
  

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
            <Sheet>
                <SheetTrigger
                    className='flex md:hidden'
                    asChild
                >
                    <Menu />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader
                        className='text-start'
                    >
                    <SheetTitle>
                        <SheetClose
                            asChild
                        >
                            <Link
                                href={"/"}
                                >
                                Home
                            </Link>
                        </SheetClose>
                    </SheetTitle>
                    <SheetDescription>
                        <ul>
                            <li>
                                <SheetClose
                                    asChild
                                >
                                    <Link
                                        href={"/cart"}
                                    >
                                        Cart
                                    </Link>
                                </SheetClose>
                            </li>
                        </ul>
                    </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            <Link
                href={"/"}
                className='hidden md:block'
                >
                home
            </Link>
            <SearchInput/>
            <CartPopover />



            
        </nav>
    </header>
    
    </>
   )
}

export default Navbar