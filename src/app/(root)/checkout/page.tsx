'use client'
import { FC, useEffect, useState} from 'react'
import { Metadata, ResolvingMetadata} from 'next'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import useCart from '@/hooks/useCart'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

interface pageProps {
    searchParams:{
      success:"1"|"0",

    }
    
}




const Page: FC<pageProps> = ({searchParams}) => {
    const {success}=searchParams
    const [secondLeft, setSecondLeft] = useState(5)   
    
    const {cart,removeItem}=useCart()
    const router=useRouter()
    useEffect(()=>{
      if(success==="1"){
        cart.map(item=>{
          if(item.selected){
            removeItem(item.id)
          }
        })
        setTimeout(()=>router.replace(`${process.env.NEXT_PUBLIC_APP_URL}/myAccount`),5000)
      }
      else if(success==="0"){
        setTimeout(()=>router.replace(`${process.env.NEXT_PUBLIC_APP_URL}/cart`),5000)
      }
      else{
        router.push(`${process.env.NEXT_PUBLIC_APP_URL}`)
      }

      const intervalId = setInterval(() => {
        setSecondLeft((_secondLeft) => {
          if (_secondLeft === 0) {
            clearInterval(intervalId)
            return 0
          } else {
            return _secondLeft - 1;
          }
        })
      }, 1000)

      return ()=>clearInterval(intervalId)
    },[cart, removeItem, router,success])
    
    
    
  return(
    <main
      className='md:container h-full flex justify-center'
    >
      <div
        className='flex justify-center items-center flex-col gap-1 w-full h-auto aspect-video'
      >

        {success==="1"?(
        <>
        <h1>
          order confirmed
        </h1>
        <h2>
          you will be redirected to my account in 
          <span className='text-primary'>{` ${secondLeft}`}</span>s
        </h2>
        <Link
          className={buttonVariants({variant:"link"})}
          href={`${process.env.NEXT_PUBLIC_APP_URL}/myAccount`}
          replace
        >
          back to my account
        </Link>
        </>):(
        <>
        <h1>
          order cancelled
        </h1>
        <h2>
          you will be redirected your cart in 
          <span className='text-primary'>{` ${secondLeft}`}</span>s
        </h2>
        <Link
          className={buttonVariants({variant:"link"})}
          href={`${process.env.NEXT_PUBLIC_APP_URL}/cart`}
          replace
  
        >
          back to cart
        </Link>
        </>)}
        
      </div>
    </main>
  )
   
}

export default Page