import {FC} from 'react'
import prisma from '../../../../prisma/client'
import { getSession, getUserDetails } from '@/app/supabase-server'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/SignOutButton'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Order } from '@prisma/client'

interface pageProps {
 
}

const page:FC<pageProps>=async ({})=>{
    const user=await getUserDetails()
    let orderList:Order[]=[]
    if(user){
        orderList=await prisma.order.findMany({
            where:{
                email:user.email,
                status:"paid"
            }
        })
    }

 return(
    <>
    <main
        className='md:container'
    >
        {user?(
            <div>
                <p>
                    {user?.user_metadata?.email}
                </p>
                <SignOutButton/>
            </div>
        ):(
            <div>
                <Link
                    href={"/signIn?next=myAccount"}
                    className={cn(buttonVariants())}
                >
                    Sign In
                </Link>
            </div>
        )}
        
    </main>
    <section
        className='md:container'
    >
        <h2>
            My Order
        </h2>
        <div>
            {user?(
                <ul>
                   {orderList.map(order=>(
                    <li>
                        <p>{order.id}</p>
                    </li>
                   ))}
                </ul>
            ):(
                <Link
                    href={"/order-tracker"}
                    className={cn(buttonVariants())}
                >
                    track your order
                </Link>
            )}
        </div>
        
    </section>

    
    </>

)}

export default page