import OrderCard from '@/components/OrderCard'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { User } from '@prisma/client'
import Link from 'next/link'
import {FC, use} from 'react'
import prisma from '../../../../prisma/client'
import SignOutButton from '@/components/SignOutButton'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { ClipboardSignature, Package, Package2, Wallet, X } from 'lucide-react'

interface userProps {
 user:User
}

const User:FC<userProps>=async({user})=>{
    const unpaidOrder=await prisma.order.findMany({
        where:{
            email:user.email,
            status:"pending"
        },
        include:{
            cartItem:{
                include:{
                    product:true
                }
            }
        },
        orderBy:{
         updatedAt:"desc"
        } 
    })
    const toReceiveOrder=await prisma.order.findMany({
        where:{
            email:user.email,
            status:"paid"
        },
        include:{
            cartItem:{
                include:{
                    product:true
                }
            }
        },
        orderBy:{
         updatedAt:"desc"
        } 
    })
    const cancelledOrder=await prisma.order.findMany({
        where:{
            email:user.email,
            status:"cancel"
        },
        include:{
            cartItem:{
                include:{
                    product:true
                }
            }
        },
        orderBy:{
         updatedAt:"desc"
        } 
    })
 return(
    <>
    <main
        className='md:container bg-secondary rounded-md p-4 flex flex-col gap-4'
    >
       <h2
            className='text-xl font-bold'
        >
            Profile
        </h2>
        <ul
            className='list-disc list-inside'
        >
            <li>
                email : {user.email}
            </li>
        </ul>
        <div>
            <SignOutButton/>
        </div>
       
        
        
    </main>
    <section
        className='md:container flex flex-col gap-4'
    >
        <h2
            className='text-xl font-bold'
        >
            My Order
        </h2>
        <div>
        <Tabs defaultValue="unPaid" className='flex flex-col gap-4'>
            <TabsList className="flex gap-4 justify-start h-min bg-background">
                <TabsTrigger 
                    className='w-24 h-auto aspect-square flex flex-col gap-2 group/unpaid'
                    value="unPaid" 
              
                >
                   <Wallet
                    className='group-data-[state=active]/unpaid:stroke-blue-500'
                   />
                   <p
                    className='text-muted-foreground'
                   >
                    to paid
                   </p>
                </TabsTrigger>
                <TabsTrigger 
                    className='w-24 h-auto aspect-square flex flex-col gap-2 group/receive'
                    value="toReceived" 
              
                >
                   <Package2
                    className='group-data-[state=active]/receive:stroke-blue-500'
                   />
                   <p
                    className='text-muted-foreground'
                   >
                    To Received
                   </p>
                </TabsTrigger>
                <TabsTrigger 
                    className='w-24 h-auto aspect-square flex flex-col gap-2 group/cancelled'
                    value="cancelled" 
              
                >
                   <X
                    className='group-data-[state=active]/cancelled:stroke-blue-500'
                   />
                   <p
                    className='text-muted-foreground'
                   >
                    Cancelled
                   </p>
                </TabsTrigger>
              
            </TabsList>
            <TabsContent value='unPaid'>
                {unpaidOrder.length===0?(
                <NoOrder/>
                ):(
                <ul
                    className='flex flex-col gap-8 shadow-sm w-[min(100%,600px)]'
                >
                {unpaidOrder.map(order=>(
                    <li
                        key={order.id}
                    >
                        <OrderCard order={order}/>
                    </li>
                ))}
                </ul>)}
            </TabsContent>
            <TabsContent value='toReceived'>
                {toReceiveOrder.length===0?(
                <NoOrder/>  
                ):(
                <ul
                    className='flex flex-col gap-8 shadow-sm w-[min(100%,600px)]'
                >
                {toReceiveOrder.map(order=>(
                    <li
                        key={order.id}
                    >
                        <OrderCard order={order}/>
                    </li>
                ))}
                </ul>)}
            </TabsContent>
            <TabsContent value='cancelled'>
                {cancelledOrder.length===0?(
                <NoOrder/>
                ):(
                <ul
                    className='flex flex-col gap-8 shadow-sm w-[min(100%,600px)]'
                >
                {cancelledOrder.map(order=>(
                    <li
                        key={order.id}
                    >
                        <OrderCard order={order}/>
                    </li>
                ))}
                </ul>)}
            </TabsContent>
        </Tabs>
      
        </div>
        
    </section>

    
    </>
)}

export default User


 
const NoOrder:FC= () => {
    return (
        <div
            className='w-[min(100%,600px)] flex justify-center items-center aspect-video outline-dashed outline-secondary rounded-md flex-col'
        >
            <ClipboardSignature
                strokeWidth={2}
                size={'3rem'}
                scale={3}
            
            />
            <p
                className='text-muted-foreground'
            >
                No order yet
            </p>
        </div>
    )
}
 
