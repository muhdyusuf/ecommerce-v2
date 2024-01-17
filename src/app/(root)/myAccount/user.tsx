import OrderCard from '@/components/OrderCard'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { User } from '@prisma/client'
import Link from 'next/link'
import {FC} from 'react'
import prisma from '../../../../prisma/client'
import SignOutButton from '@/components/SignOutButton'

interface userProps {
 user:User
}

const User:FC<userProps>=async({user})=>{
    const orderList=await prisma.order.findMany({
        where:{
            email:user.email
        },
        include:{
            cartItem:{
                include:{
                    product:true
                }
            }
        }
    })
 return(
    <>
    <main
        className='md:container'
    >
     
            <div>
                <p>
                    {user.email}
                </p>
                <SignOutButton/>
            </div>
        
    </main>
    <section
        className='md:container'
    >
        <h2>
            My Order
        </h2>
        <div>
                <ul
                    className='flex flex-col gap-8 shadow-sm'
                >
                   {orderList.map(order=>(
                    <li
                        key={order.id}
                    >
                        <OrderCard order={order}/>
                    </li>
                   ))}
                </ul>
      
        </div>
        
    </section>

    
    </>
)}

export default User