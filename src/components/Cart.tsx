'use client'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { FC,useEffect,useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Popover, PopoverTrigger } from './ui/popover'
import { PopoverClose, PopoverContent } from '@radix-ui/react-popover'
import { useCart } from '@/app/context/cartContext'
import { CART_ACTION } from '@/app/context/contextAction'

interface CartProps {
  
}

const Cart: FC<CartProps> = ({}) => {
const {cart,dispatch}=useCart()
    
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
        className='md:hidden'
        href="/cart"
    >
        <div
            className='relative w-min'
        >
        <span
            className='empty:hidden absolute bg-red-600 top-0 right-0 rounded-full h-4 aspect-square overflow-hidden leading-none text-center box-content p-[1px] text-[.8rem] grid place-content-center'
        >
            {cart.length>0?cart.length:null}
        </span>
         <ShoppingCart
            strokeWidth={1}
            className='w-8 h-auto aspect-square'
         />
        </div>

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
                    className='empty:hidden absolute bg-slate-300 top-0 right-0 rounded-md h-4 aspect-square overflow-hidden leading-none text-center p-1 text-[.8rem] grid place-content-center'
                    >
                    {cart.length>0?cart.length:null}
                </span>
                <ShoppingCart
                    strokeWidth={2}
                    className='w-6 h-auto aspect-square'
                    />
                
            </Button>
        </PopoverTrigger>
        <PopoverContent
            className='bg-slate-100 p-4 rounded-md'
        >
            {cart.map(product=><p
                key={crypto.randomUUID()}
            >{product.name}</p>)}
       
        </PopoverContent>
    </Popover>
    
   </>
   )
}

export default Cart