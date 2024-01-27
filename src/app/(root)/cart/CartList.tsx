'use client'

import { Checkbox } from '@/components/ui/checkbox'

import useCart from '@/hooks/useCart'

import {FC, useMemo} from 'react'
import CartItem from './CartItem'

interface CartListProps {
 updatedId:number[]
}

const CartList:FC<CartListProps>=({updatedId})=>{
   
    const {cart,updateItem,selectAll,unSelectAll}=useCart()
    const isAllSelected=useMemo(()=>cart.every(item=>item.selected), [cart])
   

    return (
        <div
            className='relative w-full flex flex-col md:flex-row gap-2 lg:gap-8'
        >
            <div
                className='w-full grid grid-cols-2 auto-rows-min gap-y-4'
            >  

                <h2
                    className='px-2 text-4xl font-bold leading-none'
                >
                    Bag
                </h2>
                <label 
                    htmlFor='cartSelectAll'
                    className='w-full flex justify-end gap-1 items-end leading-none px-2'
                >    
                    Select All 
                    <Checkbox
                        name="select all cart item" 
                        id="cartSelectAll"
                        checked={isAllSelected}
                        onCheckedChange={isAllSelected?unSelectAll:selectAll}
               
                    /> 
                </label>
                <div
                    className='w-full col-span-full'
                >
                    {cart.map(cartItem=>(
                        <CartItem
                            key={"cartItem"+cartItem.id}
                            cartItem={cartItem}
                            onCheckedChange={(val)=>updateItem({...cartItem,selected:val})}
                            className={`${updatedId.includes(cartItem.id)&&"bg-orange-50"}`}
                        
                        />
                    ))}
                    
                </div>
            </div>

            </div>
    )

}

export default CartList