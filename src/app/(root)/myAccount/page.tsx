import {FC} from 'react'
import prisma from '../../../../prisma/client'
import { getSession, getUserDetails } from '@/app/supabase-server'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/SignOutButton'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Order } from '@prisma/client'
import OrderCard from '@/components/OrderCard'
import User from './user'
import Guest from './guest'

interface pageProps {
 
}

const page:FC<pageProps>=async ({})=>{
    const sessionUser=await getUserDetails()
    if(!sessionUser)return<Guest/>

    const user=await prisma.user.findUnique({
        where:{
            email:sessionUser?.email
        }
    })

    if(user)return <User user={user}/>
 

}

export default page