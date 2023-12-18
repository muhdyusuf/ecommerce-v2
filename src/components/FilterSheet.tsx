'use client'
import {FC, ReactNode, useState} from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Separator } from '@/components/ui/separator'
import { Button, buttonVariants } from './ui/button'

import {SlidersHorizontal, X } from 'lucide-react'
import { Cross2Icon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

import Filter from '@/components/Filter'


interface FilterSheetProps {

}

const FilterSheet:FC<FilterSheetProps>=({})=>{
    const [open, setOpen] = useState(false)
 return(
    <Sheet
        open={open}
        onOpenChange={()=>setOpen(!open)}
    >
        <SheetTrigger
            asChild
        >
            <Button
                variant={"ghost"}
                type='button'
                className='flex gap-2'
            >
                <MixerHorizontalIcon />
                <p>Filter</p>
            </Button>
        </SheetTrigger>
        <SheetContent
            side={"left"}
        >
            <div
                className='flex justify-between'
            >
                <SheetTitle >Filters</SheetTitle>

                <SheetClose
                    className='relative'
                    asChild
                >
                    <Button 
                        variant={"ghost"}
                        className={cn(
                            buttonVariants({variant:"ghost"}),
                            "rounded-sm w-min opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary p-2"
                        )}
                         
                    >
                        <Cross2Icon className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </SheetClose>
           
            </div>
            <Separator/>
            <Filter 
                close={()=>setOpen(false)}
            />
        </SheetContent>
    </Sheet>
)}

export default FilterSheet