'use client'
import {FC, useState} from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

interface HamburgerMenuProps {
 
}

const HamburgerMenu:FC<HamburgerMenuProps>=({})=>{
    const [open, setOpen] = useState(false)
    function handleClose(){
        setOpen(false)
    }
 return(
    <Sheet
        open={open}
        onOpenChange={()=>setOpen(!open)}
    >
    <SheetTrigger
        className='flex md:hidden'
        asChild
    >
        <Menu />
    </SheetTrigger>

    <SheetContent
        side={"left"}
    >
        <SheetHeader
            className='flex items-end'
        >
            
            <SheetClose
                className='w-min'
                asChild
            >
                <Button
                    variant={"outline"}
                    className='p-1 h-min'
                >
                    <X
                        className='stroke-foreground'
                        size={14}
                        strokeWidth={4}
                    />
                </Button>
            </SheetClose>
        </SheetHeader>
  
            <ul>
                <li>
                <Link
                    href={"/"}
                    onClick={handleClose}
                    >
                    Home
                </Link>
                </li>
                <li>
                <Link
                    href={"/cart"}
                    onClick={handleClose}
                >
                    Cart
                </Link>
                </li>

                <li>
                    <Button
                        variant={"ghost"}
                        className='w-min h-min p-0 text-base font-normal '
                    >
                        Log Out
                    </Button>
                </li>
            </ul>

    </SheetContent>
</Sheet>
)}

export default HamburgerMenu