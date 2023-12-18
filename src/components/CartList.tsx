'use client'
import { useCart } from '@/context/cartContext'
import {FC, useEffect, useState } from 'react'


import { CART_ACTION } from '@/context/contextAction'
import { PRICE_MULTIPLIER, formatPrice } from '@/lib/utils'
import { Button } from './ui/button'
import CartItem from './CartItem'
  

interface CartListProps {
  cartList?:CartList
}

const CartList: FC<CartListProps> = ({cartList}) => {
    const {cart,dispatch}=useCart()
    const [isAllSelected, setIsAllSelected] = useState(false)

    function handleAllSelected(val:boolean){
        if(val){
            cart.map(cartItem=>dispatch({
                type:CART_ACTION.UPDATE_ITEM,
                payload:{...cartItem,selected:true}
            }))
        }
        else{
            cart.map(cartItem=>dispatch({
                type:CART_ACTION.UPDATE_ITEM,
                payload:{...cartItem,selected:false}
            }))
        }
        setIsAllSelected(val)
     
    }

    useEffect(()=>{
        const _isAllSelected=cart.every(cartItem=>cartItem.selected)
        setIsAllSelected(_isAllSelected)
    },[cart])
   
    
   
  return cart.length===0?(
        <div
            className='outline-muted-foreground/20 outline-dashed rounded-md flex flex-col justify-center items-center w-[min(100%,600px)] p-24 h-min'
        >
            <h2>
            Your cart is empty 



            
            </h2>
            <p>explore some item</p>
        </div>
        ):(
        <div
            className='relative flex flex-col gap-6 w-[min(100%,1000px)]'
        >
          <h2
            className='text-4xl font-bold'
          >
            Your Cart
          </h2>
            <div>
                <div>    
                {cart.map(cartItem=>(
                    <CartItem key={cartItem.id} cartItem={cartItem}/>
                    ))}
                </div>
            </div>

            <div 
                className='p-3 sticky bottom-0 flex justify-between items-end gap-4 w-full bg-background border-t-2 border-secondary'
            >
                
                <label htmlFor=""
                    className='justify-self-start'
                >    
                    <input 
                        type="checkbox" 
                        name="select all cart item" 
                        id="cart select all"
                        checked={isAllSelected}
                        onChange={()=>handleAllSelected(!isAllSelected)} 
                    /> 
                    Select All 
                </label>

                <div className='flex h-full'>
                    <div
                        className='border-s-2 border-background px-4 text-start'
                        >
                        <span
                            className='text-muted-foreground'
                            >
                            Total
                        </span>
                        <p
                            className='flex gap-2 font-medium'
                            >
                        {formatPrice(cart.reduce((total,cartItem)=>{
                            if(!cartItem.selected)return total
                            const cartItemTotal=(cartItem.price*PRICE_MULTIPLIER)*cartItem.quantity
                            return((total*PRICE_MULTIPLIER)+cartItemTotal)/PRICE_MULTIPLIER
                        },0))}
                        </p>
                    </div>
                    <Button
                        type='button'
                        disabled={cart.every(cartItem=>!cartItem.selected)}
                        className='flex px-12 w-min h-full gap-4 '
                        >
                        <p>
                            checkout
                        </p>

                    </Button>
                </div>
            </div>
            </div>
        )
    }
  
  


export default CartList