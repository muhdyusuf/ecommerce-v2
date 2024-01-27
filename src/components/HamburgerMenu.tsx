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
import { AlignJustify, Menu, X } from 'lucide-react'
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
        <AlignJustify
            className='p-0 w-8 h-auto aspect-square'
            strokeWidth={2.5}
            
        />
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
                    className='h-min p-0'
                >
                    <X
                        className='stroke-foreground'

                    />
                </Button>
            </SheetClose>
        </SheetHeader>
  
            <ul
                className='flex flex-col gap-4'
            >
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
                    <Link
                        href={"/order-tracker"}
                        onClick={handleClose}
                    >
                        Track Order
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/settings"}
                        onClick={handleClose}
                    >
                        Setting
                    </Link>
                </li>

         
            </ul>

    </SheetContent>
</Sheet>
)}

export default HamburgerMenu