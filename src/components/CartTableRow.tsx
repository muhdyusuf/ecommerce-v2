import { ChangeEvent, FC, useEffect, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import {QuantityInput} from './QuantityInput'
import Link from 'next/link'
import { useCart } from '@/context/cartContext'
import { CART_ACTION } from '@/context/contextAction'

interface CartTableRowProps extends CartItem {}

const CartTableRow: FC<CartTableRowProps> = (cartItem) => {
const url=process.env.NEXT_PUBLIC_APP_URL


 const {dispatch}=useCart()
 
function handleSetQuantity(val:number){
    console.log(val,"hello")
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



    
  return (
    <TableRow>
        <TableCell className="font-medium">
            <input 
                type="checkbox"
                name=""
                id=""
                defaultChecked={cartItem.selected||false}
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
            className="text-right"
        >   
            <p>
            <span
                className='mr-1'
            >
                Rm
            </span>
            {((cartItem.price*100000)*(cartItem.quantity||1))/100000}
            </p>
        
        </TableCell>
    </TableRow>
   )
}

export default CartTableRow