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
import { PRICE_MULTIPLIER, formatPrice } from '@/lib/utils'
import { Button } from './ui/button'
import CartItem from './CartItem'
  

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
   
    
   
  return(
    <main
        className='container'
    >
        {cart.length===0?(
        <div
            className='m-auto outline-muted-foreground/20 outline-dashed rounded-md grid place-content-center aspect-square md:aspect-video'
        >
            <h2>
            Your cart is empty 
            </h2>
            <p>explore some item</p>
        </div>
        ):(
        <div
            className='relative'
        >
            {/* <Table
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
                                {formatPrice(cart.reduce((total,cartItem)=>{
                                    if(!cartItem.selected)return total
                                    const cartItemTotal=(cartItem.price*PRICE_MULTIPLIER)*cartItem.quantity
                                    return((total*PRICE_MULTIPLIER)+cartItemTotal)/PRICE_MULTIPLIER
                                },0))}
                                </p>
                            </TableCell>

                            
                        </TableRow>
                    
                </TableFooter>
            </Table> */}
            <div>
                <label htmlFor="">    
                    <input 
                        type="checkbox" 
                        name="select all cart item" 
                        id="cart select all"
                        checked={isAllSelected}
                        onChange={()=>handleAllSelected(!isAllSelected)} 
                    /> 
                    Select All 
                </label>
                <div>    
                {cart.map(cartItem=>(
                    <CartItem cartItem={cartItem}/>
                    ))}
                </div>
            </div>
            <div 
                className='p-3 sticky bottom-0 flex flex-col items-end gap-4 border-t-2 w-full'
            >
                <h2>
                    {formatPrice(cart.reduce((total,cartItem)=>{
                        if(!cartItem.selected)return total
                        const cartItemTotal=(cartItem.price*PRICE_MULTIPLIER)*cartItem.quantity
                        return((total*PRICE_MULTIPLIER)+cartItemTotal)/PRICE_MULTIPLIER
                    },0))}
                </h2>
                <Button
                    type='button'
                    disabled={cart.every(cartItem=>!cartItem.selected)}
                    className=''
                >
                    Checkout
                </Button>
            </div>
            </div>
        )}
    </main>
  )
}

export default ClientCartList