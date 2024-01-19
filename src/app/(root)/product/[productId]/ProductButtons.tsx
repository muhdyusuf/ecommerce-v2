'use client'

import { FC, useEffect, useState } from 'react'
import { Button, buttonVariants } from '../../../../components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Input } from '../../../../components/ui/input'
import { Minus, Plus } from 'lucide-react'
import { useToast } from '../../../../components/ui/use-toast'
import { ToastAction } from '../../../../components/ui/toast'
import { QuantityInput } from '../../../../components/QuantityInput'
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
       toast({
        title:`Item Added to your car`,
       })
    }
    function handleQuantity(val:number){
    
      if(val<=product.stock){
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
    console.log(quantity)

  return (
  <div
    className='flex flex-col gap-4 '
  >
     <div
      className='w-full flex items-center gap-4'
     >
        <QuantityInput
          className='w-36 gap-1 grid grid-cols-[auto,4rem,auto] items-center'
          defaultValue={quantity}
          onChange={handleQuantity}
          maxValue={product.stock}
          />

          <p
            className='text-sm text-muted-foreground font-medium'
          >
            {product.stock} available
          </p>
      </div>

      <div
        className='flex flex-col gap-4'
      >
          <Button
            type='button'
            variant={"secondary"}
            onClick={handleAddToCart}
            >
            Add to cart
          </Button>

          <Button
            onClick={handleBuyNow}      
            > 
            Buy Now
          </Button>
      </div>
      
    </div>
   )
}

export default ProductButtons