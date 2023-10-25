'use client'
import { useCart } from '@/app/context/cartContext'
import { FC } from 'react'

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
  

interface ClientCartListProps {
  
}

const ClientCartList: FC<ClientCartListProps> = ({}) => {
    const {cart,dispatch}=useCart()
    console.log(cart)
  return (
    <Table
    >
        <TableHeader>
            <TableRow
            >
                <TableHead className="w-4">
                    <input type="checkbox" name="" id="" />   
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
            {cart.reverse().map(cartItem=>(
               <CartTableRow {...cartItem}/>
            ))}
        </TableBody>
    </Table>
   )
}

export default ClientCartList