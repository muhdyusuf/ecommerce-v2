'use client'
import {InfoPopover,InfoPopoverContent, InfoPopoverTrigger } from '../../../components/InfoPopover'
import { Popover, PopoverTrigger } from '../../../components/ui/popover'
import { Checkbox } from "@/components/ui/checkbox"

import {FC, SyntheticEvent, useEffect, useState } from 'react'


import { PRICE_MULTIPLIER, cn, formatPrice } from '@/lib/utils'
import { Button, buttonVariants } from '../../../components/ui/button'
import CartItem from '../../../components/CartItem'
import { Loader2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import useCart, { CartItemLocal } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { validateLocalCartItems } from '@/actions/cart'
import { useToast } from '@/components/ui/use-toast'
  

interface CartListProps {
  cartList?:CartItemLocal[]
}

const CartList: FC<CartListProps> = ({cartList}) => {
    const [isMounted, setIsMounted] = useState(false)
    const {cart,updateItem,removeItem}=useCart()
    const [isAllSelected, setIsAllSelected] = useState(false)
    const [updatedId,setUpdatedId]=useState<number[]>([])
    const [loading,setLoading]=useState(false)

    const router=useRouter()
    const {toast}=useToast()

    function handleAllSelected(val:boolean){
        if(val){
            cart.map(product=>updateItem({...product,selected:true}))
        }
        else{
            cart.map(product=>updateItem({...product,selected:false}))
        }
        setIsAllSelected(Boolean(val))
        
    }

    function handleItemSelected(cartItem:CartItemLocal,selected:boolean){
        updateItem({...cartItem,selected})
        const isAllSelected=cart.every(cartItem=>cartItem.selected)
        setIsAllSelected(isAllSelected)
    }
    
    
    useEffect(() => {
        setIsMounted(true)
        const isAllSelected=cart.every(cartItem=>cartItem.selected)
        setIsAllSelected(isAllSelected)
    }, [cart])

    useEffect(()=>{
        if(updatedId.length===0)return
        const timer=setTimeout(()=>setUpdatedId([]),5000)
        return()=>{
            clearTimeout(timer)
        }
    },[updatedId])

    

   

    async function handleCheckout(event:SyntheticEvent){
        event.preventDefault()
        setLoading(true)
        const supabase=createClientComponentClient()
        const {data:{user}}=await supabase.auth.getUser()

        const selectedItem=cart.filter(item=>item.selected)

        const validatedCartList=await validateLocalCartItems(selectedItem)

       
        const _upadatedId:number[]=[]
        validatedCartList.map(cartItem=>{
            if(!cartItem)return
            const product=selectedItem.find(item=>cartItem.id===item.id)
            
            if(!product){
                removeItem(cartItem.id)
            }
            else if(product.quantity!==cartItem.quantity){
                updateItem({...product,...cartItem})
                _upadatedId.push(product.id)
            }
        })
        if(_upadatedId.length>0){
            setUpdatedId(_upadatedId)
            toast({
                title:'some item have been updated'
            })
            setLoading(false)
            return
        }

        const response=await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/checkout`,{
          method:"POST",
          body:JSON.stringify({
              cartItems:cart.filter(item=>item.selected).map(({id,quantity})=>({id,quantity:quantity||1})),
              email:user?.email
        })
        })
      
        if(response.status===200){
            setLoading(false)
          const {url}=await response.json()
          window.location=url
        }
      }

    if(!isMounted)return(
        <div
            className='m-auto flex justify-center'
        >
            <Loader2
                className='animate-spin stroke-muted-foreground'
                size={50}
            />
        </div>
    )


   const total=cart.reduce((total,cartItem)=>{
    if(!cartItem.selected)return total
    const cartItemTotal=(cartItem.price*PRICE_MULTIPLIER)*cartItem.quantity
    return((total*PRICE_MULTIPLIER)+cartItemTotal)/PRICE_MULTIPLIER
    },0)
    const paymentCharge=total*(3/100)

   
  return cart.length===0?(
        <div
        className='outline-dashed outline-6 outline-secondary rounded-md w-full  flex flex-col justify-center items-center text-center'
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

        ):(
        <div
            className='relative w-[min(100%,1000px)] flex flex-col md:flex-row gap-8'
        >
            <div
                className='w-full grid grid-cols-2 auto-rows-min gap-4'
            >  
                <h2
                    className='text-4xl font-bold'
                >
                    Bag
                </h2>
                <label 
                    htmlFor='cartSelectAll'
                    className='flex justify-end gap-1 items-end leading-none px-2'
                >    
                    Select All 
                    <Checkbox 
                        name="select all cart item" 
                        id="cartSelectAll"
                        checked={isAllSelected}
                        onCheckedChange={handleAllSelected}
                
                    /> 
                </label>
                <div
                    className='col-span-full '
                >
                    {cart.map(cartItem=>(
                        <CartItem 
                            className={updatedId.includes(cartItem.id)?"bg-orange-100/40":""}
                            key={cartItem.id} 
                            cartItem={cartItem}
                            onSelected={(selected=>handleItemSelected(cartItem,selected))}
                        />
                    ))}
                </div>
            </div>
            <div
                className='w-full md:w-[600px] flex flex-col gap-2 md:gap-6 sticky md:top-16 bottom-0 right-0  bg-muted h-min  p-2 md:p-6 md:rounded-lg'
            >
                <h2
                     className='text-xl md:text-4xl font-bold'
                >
                    Summary
                </h2>
               
                <div
                    className='flex justify-between'
                >
                    <p>
                        Subtotal
                    </p>
                    <p>
                        {formatPrice(total)}
                    </p>
                </div>
                <div
                    className='flex justify-between'
                >
                    <p>
                        Delivery and Handling
                    </p>
                    <p>
                        Free
                    </p>
                </div>

                <div
                    className='flex justify-between'
                >
                    <div
                        className='flex items-center'
                    >
                        <p>Payment Charge</p> 
                        <Popover>
                            <InfoPopoverTrigger/>
                            <InfoPopoverContent
                                className='p-4'
                            >   
                                Enjoy our services with peace of mind! For a limited time, we re offering a special promotion where the payment charge is excluded from your total spend. Our standard payment charge is 3% of the total amount, plus an additional RM1.<br/>
                                
                                Please note that this exclusive offer won t last forever, so make the most of it while it lasts. Take advantage of this opportunity to save on your transactions and experience seamless payments.

                            </InfoPopoverContent>
                        </Popover>
                    </div>
                    <p>                    
                        <span
                            className='line-through'
                        >{formatPrice(1+paymentCharge)}</span> {formatPrice(0)}
                    </p>
                </div>
                <div
                    className='border-y-[1px] border-y-1 border-black/30 flex justify-between font-bold py-4'
                >
                    <p>{`Total (${cart.filter(cart=>cart.selected).length})`}</p>
                    <p>{formatPrice(total)}</p>
                </div>
                <div
                    className='flex flex-col gap-4'
                >
                    <Button
                        type='button'
                        disabled={cart.every(cart=>!cart.selected)||loading}
                        onClick={handleCheckout}
                    >
                        
                        <Loader2
                            className={loading?"flex animate-spin mr-2 ":"hidden"}
                            size={14}
                        />
                        Checkout
                    </Button>

                </div>
            </div>

            </div>
        )
    }
  
  


export default CartList