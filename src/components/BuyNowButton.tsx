'use client'
import useCart from '@/hooks/useCart'
import { Category, Colour, Product, Size } from '@prisma/client'
import { useRouter } from 'next/navigation'
import {FC} from 'react'
import { Button } from './ui/button'

interface BuyNowButtonProps {
    product:Product&{
        category:Category
        size:Size
        colour:Colour
    }
}

const BuyNowButton:FC<BuyNowButtonProps>=({product})=>{
    const {cart,updateItem,addItem}=useCart()
    const router=useRouter()
    
    const formattedCart={
        id:product.id,
        name:product.name,
        price:product.price,
        stock:product.stock,
        imageUrls:product.imageUrls,
        quantity:1,
        updatedAt:new Date(),
        selected:true,
        category:product.category?.name||"",
        colour:product.colour?.name,
        size:product.size?.name,
      }

    function handleBuyNow(){
        cart.map(item=>{
          updateItem({...item,selected:false})
        })
        addItem(formattedCart)
        router.push(`${process.env.NEXT_PUBLIC_APP_URL}/cart`)
      }
    
 return(
    <Button
        className='w-full'
        onClick={handleBuyNow}
    >
        Buy Now
    </Button>
)}

export default BuyNowButton