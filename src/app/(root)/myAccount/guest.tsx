import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {FC} from 'react'


const Guest:FC=({})=>{
 return(
    <>
    <main
        className='md:container flex justify-center items-center'
    >
       
            <div
                className='w-[min(100%,600px)] flex flex-col justify-center items-center gap-4 bg-secondary p-8'
            >
                <h2
                    className='text-2xl font-bold text-center'
                >
                    Sign In to <br/>
                    Enjoy more Feature
                </h2>
                <Link
                    href={"/signIn?next=myAccount"}
                    className={cn(buttonVariants())}
                >
                    Sign In
                </Link>
            </div>
     
        
    </main>
    <section
        className='md:container flex justify-center items-center'
    >
       
            <div
                className='w-[min(100%,600px)] flex flex-col justify-center items-center gap-4  p-8'
            >
                <h2
                    className='text-2xl font-bold text-center'
                >
                    Track your order
                </h2>
                <Link
                    href={"/order-tracker"}
                    className={cn(buttonVariants({variant:"secondary"}))}
                >
                    Track Order
                </Link>
            </div>
     
        
    </section>
    

    
    </>
)}

export default Guest