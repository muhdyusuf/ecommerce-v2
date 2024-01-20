'use client'
import { validateLocalCartItems } from '@/actions/cart'
import { getUserDetails } from '@/app/supabase-server'
import { InfoPopoverContent, InfoPopoverTrigger } from '@/components/InfoPopover'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import useCart from '@/hooks/useCart'
import { PRICE_MULTIPLIER, cn, formatPrice } from '@/lib/utils'
import { Popover } from '@radix-ui/react-popover'
import { Loader2 } from 'lucide-react'
import {FC, SyntheticEvent, useMemo, useState} from 'react'

interface SummaryProps {
  setUpdatedId:(updatedId:number[])=>void
  className?:string
}

const Summary:FC<SummaryProps>=({setUpdatedId,className})=>{

    const [loading,setLoading]=useState(false)
    const {toast}=useToast()
    const {cart,removeItem,updateItem}=useCart()

    const isOneSelected=useMemo(()=>cart.some(item=>item.selected),[cart])
    const total=useMemo(()=>cart.reduce((total,cartItem)=>{
        if(!cartItem.selected)return total
        const cartItemTotal=(cartItem.price*PRICE_MULTIPLIER)*cartItem.quantity
        return((total*PRICE_MULTIPLIER)+cartItemTotal)/PRICE_MULTIPLIER
        },0)
    ,[cart])
    const paymentCharge=total*(3/100)

    async function handleCheckout(event:SyntheticEvent){
        event.preventDefault()
        setLoading(true)
    
        const user=await getUserDetails()
    
        const selectedItem=cart.filter(item=>item.selected)
    
        const validatedCartList=await validateLocalCartItems(selectedItem)
    
        
        const _updatedId:number[]=[]
        validatedCartList.map(cartItem=>{
            if(!cartItem)return
            const product=selectedItem.find(item=>cartItem.id===item.id)
            
            if(!product){
                removeItem(cartItem.id)
            }
            else if(product.quantity!==cartItem.quantity){
                updateItem({...product,...cartItem})
                _updatedId.push(product.id)
            }
        })
        if(_updatedId.length>0){
            setUpdatedId(_updatedId)
            toast({
                title:'some item have been updated'
            })
            setLoading(false)
            return
        }
    
        const response=await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/checkout`,{
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
 return(
    <div
        className={cn("w-full md:w-[400px] flex flex-col bg-muted h-min  p-2 md:p-8 md:rounded-lg md:gap-4 gap-1",className)}
    >
        <h2
                className='hidden md:block text-xl md:text-4xl font-bold'
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
            className='w-full flex justify-between'
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
            className='grid grid-cols-[2fr,1.5fr] md:grid-cols-1 gap-2'
        >
            <div
                className='md:border-y-[1px] border-black/30 flex justify-between font-bold py-4'
                >
                <p>{`Total (${cart.filter(cart=>cart.selected).length})`}</p>
                <p>{formatPrice(total)}</p>
            </div>
            <div
                className='flex flex-col gap-4'
                >
                <Button
                    type='button'
                    disabled={!isOneSelected||loading}
                    onClick={handleCheckout}
                    className='h-full rounded-none md:rounded-md'
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
)}

export default Summary