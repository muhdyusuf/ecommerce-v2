'use client'
import { FC, SyntheticEvent } from 'react'
import { NextResponse } from 'next/server'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Metadata } from 'next'
import prisma from '../../../../prisma/client'
interface pageProps {
    searchParams:{
      cartItem?:string,
      quantity?:string
      from?:string
    }
}

// export const metadata: Metadata = {
//   title: 'Checkout | Ecommerce-v2',
//   description: 'mock e commerce',
// }


const page: FC<pageProps> = ({searchParams}) => {
    
    const {cartItem,quantity,from}=searchParams

   
    
    async function onCheckout(event:SyntheticEvent){
      event.preventDefault()
      const response=await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/checkout`,{
        method:"POST",
        body:JSON.stringify({
          cartItems:[{id:Number(cartItem),quantity:Number(quantity)}]
        })
      })
    
      if(response.status===200){
        const {url}=await response.json()
        window.location=url
      }
    }
    
  return (
  <>
    <main
      className='md:container h-full'
    >
      <h1>
        Checkout
      </h1>
      <Button
        type='button'
        onClick={onCheckout}
      >
        checkout
      </Button>
      <div>

      </div>
    </main>
    

  </>
   )
}

export default page