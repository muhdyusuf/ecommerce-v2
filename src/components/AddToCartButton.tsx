'use client'
import { useCart } from '@/app/context/cartContext'
import { CART_ACTION } from '@/app/context/contextAction'
import { FC } from 'react'
import { Button } from './ui/button'

interface AddToCartButtonProps {
  productId:string
}

const AddToCartButton: FC<AddToCartButtonProps> = ({productId}) => {
    const {dispatch}=useCart()
  
    async function handleAddToCart(product:CartItem){
        dispatch({type:CART_ACTION.ADD_ITEM,payload:{
            name:"hello",
            id:productId,
            price:300,
            quantity:1
        }})

    }
  return (
   <Button
    onClick={()=>dispatch({type:CART_ACTION.ADD_ITEM,payload:{
        name:"hello",
        id:productId,
        price:300,
        quantity:1
    }})}
   >
     {productId}
   </Button>)
}

export default AddToCartButton