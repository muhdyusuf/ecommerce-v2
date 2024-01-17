import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {FC} from 'react'


const Guest:FC=({})=>{
 return(
    <>
    <main
        className='md:container'
    >
       
            <div>
                <Link
                    href={"/signIn?next=myAccount"}
                    className={cn(buttonVariants())}
                >
                    Sign In
                </Link>
            </div>
     
        
    </main>
    <section
        className='md:container'
    >
        <h2>
            My Order
        </h2>
        <div>
           
                <Link
                    href={"/order-tracker"}
                    className={cn(buttonVariants())}
                >
                    track your order
                </Link>
            
        </div>
        
    </section>

    
    </>
)}

export default Guest