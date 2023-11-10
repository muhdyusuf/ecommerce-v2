import { ChangeEvent, FC, useEffect, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import {QuantityInput} from './QuantityInput'
import Link from 'next/link'
import { useCart } from '@/context/cartContext'
import { CART_ACTION } from '@/context/contextAction'
import { PRICE_MULTIPLIER } from '@/lib/utils'

interface CartTableRowProps extends CartItem {}

const CartTableRow: FC<CartTableRowProps> = (cartItem) => {
const url=process.env.NEXT_PUBLIC_APP_URL


 const {dispatch}=useCart()
 
function handleSetQuantity(val:number){
    console.log(cartItem)
   dispatch({
        type:CART_ACTION.UPDATE_ITEM,
        payload:{...cartItem,quantity:val}
    })
}
function handleSetSelected(e:ChangeEvent<HTMLInputElement>){

    const isSelected=e.target.checked
    dispatch({
        type:CART_ACTION.UPDATE_ITEM,
        payload:{...cartItem,selected:isSelected}
    })
}
useEffect(()=>{
    console.log("rerender")
},[cartItem])





    
  return (
    <TableRow>
        <TableCell className="font-medium">
            <input 
                type="checkbox"
                name=""
                id=""
                checked={cartItem.selected||false}
                onChange={handleSetSelected}
            />   
        </TableCell>
        <TableCell>
            <Link
                href={`${url}/product/${cartItem.id}`}
            >
                {cartItem.name||cartItem.title}
            </Link>
        </TableCell>
        <TableCell
            className='hidden md:block'
        >
            {cartItem.price}
        </TableCell>
        <TableCell
            className='w-32 p-0 overflow-hidden'
        >
            <QuantityInput
                onChange={handleSetQuantity}
                defaultValue={cartItem.quantity}
                className='w-full grid grid-cols-[1fr,2fr,1fr] gap-1 items-center'
            >
                
            </QuantityInput>
       
        </TableCell>
        <TableCell 
            className="text-right w-32"
        >   
            <p>
            <span
                className='mr-1'
            >
                Rm
            </span>
            {((cartItem.price*PRICE_MULTIPLIER)*(cartItem.quantity||1))/PRICE_MULTIPLIER}
            </p>
        
        </TableCell>
    </TableRow>
   )
}

export default CartTableRow