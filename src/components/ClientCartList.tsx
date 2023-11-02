'use client'
import { useCart } from '@/context/cartContext'
import { ChangeEvent, FC } from 'react'

//ui
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import CartTableRow from './CartTableRow'
import { CART_ACTION } from '@/context/contextAction'
  

interface ClientCartListProps {
  
}

const ClientCartList: FC<ClientCartListProps> = ({}) => {
    const {cart,dispatch}=useCart()
    
    function handleAllSelected(e:ChangeEvent<HTMLInputElement>){
        const isAllSelected=e.target.checked
        
        if(isAllSelected){
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
        console.log(isAllSelected,cart)
    }
   
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
                        onChange={handleAllSelected} 
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
    </Table>
   )
}

export default ClientCartList