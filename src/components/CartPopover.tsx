'use client'
import { ShoppingBag, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { FC,useEffect,useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import { cn, formatPrice } from '@/lib/utils'
import { Popover, PopoverTrigger } from './ui/popover'
import { PopoverClose, PopoverContent } from '@radix-ui/react-popover'
import { CartProvider, useCart } from '@/context/cartContext'
import { CART_ACTION } from '@/context/contextAction'
import Image from 'next/image'

interface CartProps {
  
}

const Cart: FC<CartProps> = ({}) => {
const {cart,dispatch}=useCart()
const url=process.env.NEXT_PUBLIC_APP_URL
    
    useEffect(()=>{
        if(cart.length===0){
            let cartArr:CartItem[]=[]
            ///fetch cart data
            


            cartArr.map(product=>{
                dispatch({
                    type:CART_ACTION.ADD_ITEM,
                    payload:product
                })
            })
            
        }
    },[])





  return (
   <>
    <Link
        href={"cart"}
        className={cn(
            buttonVariants({variant:"ghost"}),
            `hover:bg-slate-100/10 m-0 p-1 relative md:hidden`

        )}
    >

        <span
            className='empty:hidden absolute bg-primary text-white top-0 right-0 rounded-md h-4 aspect-square overflow-hidden leading-none text-center p-1 text-[.8rem] grid place-content-center'
            >
            {cart.length>0?cart.length:null}
        </span>
        <ShoppingBag
            strokeWidth={2}
            className='w-6 h-auto aspect-square'
            />
        
    </Link>
    <Popover>
        <PopoverTrigger
            className='hidden md:block'
            asChild
        >

            <Button
                aria-label="cart-button-open-popover"
                className={cn(`hover:bg-slate-100/10 m-0 p-1 relative`)}
                variant={"ghost"}
                >
        
                <span
                    className='empty:hidden absolute bg-primary text-white top-0 right-0 rounded-md h-4 aspect-square overflow-hidden leading-none text-center p-1 text-[.8rem] grid place-content-center'
                    >
                    {cart.length>0?cart.length:null}
                </span>
                <ShoppingBag
                    strokeWidth={2}
                    className='w-6 h-auto aspect-square'
                    />
                
            </Button>
        </PopoverTrigger>
        <PopoverContent
            className='shadow-md bg-background p-4 rounded-md flex flex-col gap-2'
            align='end'
        >
            <h4 className='font-medium'>
                Your Cart
            </h4>
            <ul
                className='flex flex-col gap-1'
            >
            {cart.slice(0,4).map(product=>(
                <li
                    key={crypto.randomUUID()}
                    className='grid grid-cols-[4rem,300px,1fr] items-start gap-1'
                >
                    <div
                        className='w-12 h-auto aspect-square overflow-hidden'
                    >
                        <Image
                            src={product.image}
                            alt={`${product.title} image`}
                            width={48}
                            height={48}
                            className='w-full h-full object-contain'
                        />
                    </div>
                    <p
                        className='break-words overflow-hidden h-min'
                    >
                        {product.name||product.title}
                    </p>
                    <p>
                        {formatPrice(product.price)}
                    </p>
                </li>
            
            ))}
            </ul>
            <PopoverClose asChild>
                <Link
                    href={`${url}/cart`}
                    className='text-primary'
                >
                    See All..
                </Link>
            </PopoverClose>
       
        </PopoverContent>
    </Popover>
    
   </>
   ) 
}

export default Cart