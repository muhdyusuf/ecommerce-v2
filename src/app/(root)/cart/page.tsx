'use client'

import CartList from '@/app/(root)/cart/CartList'

import { FC, useEffect, useState } from 'react'
import Summary from './Summary'
import { Loader2, ShoppingBag } from 'lucide-react'
import useCart from '@/hooks/useCart'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'


interface pageProps {

}



const Page: FC<pageProps> = ({}) => {
   const [updatedId, setupdatedId] = useState<number[]>([])
   const [isMounted, setIsMounted] = useState(false)

   useEffect(()=>{
    if(updatedId.length===0)return
    const timer=setTimeout(()=>setupdatedId([]),5000)
    return ()=>{
      clearTimeout(timer)
    }
   },[updatedId])

   const {cart}=useCart()

   useEffect(()=>{
    setIsMounted(true)
   },[])

  return !isMounted?(
    <main
        className='m-auto flex justify-center'
    >
        <Loader2
            className='animate-spin stroke-muted-foreground'
            size={50}
            />
    </main>
  ):cart.length===0?(
      <main
        className='p-1 md:container'
      >
        <div
        className='outline-dashed outline-6 outline-secondary rounded-md w-full aspect-video flex flex-col justify-center items-center text-center'
        >
            <ShoppingBag
                className='stroke-slate-300'
                size={60}
                strokeWidth={1}
                />
            <h2
                className='text-xl text-muted-foreground font-bold'
            >
                There are no items in your bag
            </h2>
            <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}`}
                className={buttonVariants({variant:'link'})}
                >
                Explore Products
            </Link>
        </div>
      </main>
      ):(
      <main
        className='min-h-[calc(100vh-3rem)] grid grid-cols-1 md:grid-cols-[2fr,1fr] justify-items-center md:container gap-4 relative'
        >
          <>
          <CartList
            updatedId={updatedId}
          />
          <Summary
            className='sticky bottom-0 md:top-14 w-full overflow-hidden'
            setUpdatedId={setupdatedId}
          />
          </>
      </main>
      )
  }
  



export default Page