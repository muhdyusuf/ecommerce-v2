'use client'

import { FC, useEffect, useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Input } from './ui/input'
import { Minus, Plus } from 'lucide-react'
import { useToast } from './ui/use-toast'
import { ToastAction } from './ui/toast'
import { QuantityInput } from './QuantityInput'
import { Category, Colour, Product, Size } from '@prisma/client'
import useCart from '@/hooks/useCart'
import { useRouter } from 'next/navigation'

interface ProductButtonsProps {
  product:Product&{
    category:Category
    size:Size
    colour:Colour
  }
}

const ProductButtons: FC<ProductButtonsProps> = ({product}) => {
    const [quantity, setQuantity] = useState<number>(1)
    const [isAdded, setIsAdded] = useState<boolean>(false)
    const {cart,addItem,updateItem}=useCart()
    const router=useRouter()
    const {toast}=useToast()
    const formattedCart={
      id:product.id,
      name:product.name,
      price:product.price,
      stock:product.stock,
      imageUrls:product.imageUrls,
      quantity:quantity,
      updatedAt:new Date(),
      selected:true,
      category:product.category.name,
      colour:product.colour.name,
      size:product.size.name,
    }

    

   

    async function handleAddToCart(){
       addItem(formattedCart)
    }
    function handleQuantity(val:number){
      if(product.stock<=val){
        setQuantity(val)
      }
      else{
        setQuantity(product.stock)
      }
    }

    function handleBuyNow(){
      cart.map(item=>{
        updateItem({...item,selected:false})
      })
      addItem(formattedCart)
      router.push(`${process.env.NEXT_PUBLIC_APP_URL}/cart`)
    }

  return (
  <div>
    
      <QuantityInput
        className='w-32 grid grid-cols-3'
        defaultValue={quantity}
        onChange={handleQuantity}
      />
   

    <Button
      type='button'
      variant={"secondary"}
      onClick={handleAddToCart}
      >
      Add to cart
    </Button>

    <Button
      className=''
      onClick={handleBuyNow}      
    > 
      Buy Now
    </Button>
    </div>
   )
}

export default ProductButtons