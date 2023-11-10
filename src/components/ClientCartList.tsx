'use client'
import { useCart } from '@/context/cartContext'
import {FC, useEffect, useState } from 'react'

//ui
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import CartTableRow from './CartTableRow'
import { CART_ACTION } from '@/context/contextAction'
import { PRICE_MULTIPLIER } from '@/lib/utils'
  

interface ClientCartListProps {
  
}

const ClientCartList: FC<ClientCartListProps> = ({}) => {
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
   
    
   
  return (
    <Table
    >
        <TableHeader>
            <TableRow
            >
                <TableHead className="w-4">
                    <input 
                        type="checkbox" 
                        name="select all cart item" 
                        id="cart select all"
                        checked={isAllSelected}
                        onChange={()=>handleAllSelected(!isAllSelected)} 
                    />   
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead
                    className='hidden md:hidden'
                >Unit Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody> 
            {cart.map(cartItem=>(
               <CartTableRow 
                key={cartItem.id}
                {...cartItem}/>
            ))}
        </TableBody>
        <TableFooter>
                <TableRow>
                    <TableCell
                    >
                        
                    </TableCell>
                    <TableCell>
                        total
                    </TableCell>
                    <TableCell>
                        <p>
                        {cart.reduce((total,cartItem)=>{
                            if(!cartItem.selected)return total
                            const cartItemTotal=(cartItem.price*PRICE_MULTIPLIER)*cartItem.quantity
                            return((total*PRICE_MULTIPLIER)+cartItemTotal)/PRICE_MULTIPLIER
                        },0)}
                        </p>
                    </TableCell>

                    
                </TableRow>
               
        </TableFooter>
    </Table>
   )
}

export default ClientCartList