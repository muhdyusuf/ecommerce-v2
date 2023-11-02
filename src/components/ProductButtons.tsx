'use client'
import { useCart } from '@/context/cartContext'
import { CART_ACTION } from '@/context/contextAction'
import { FC, useEffect, useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Input } from './ui/input'
import { Minus, Plus } from 'lucide-react'
import { useToast } from './ui/use-toast'
import { ToastAction } from './ui/toast'
import { QuantityInput } from './QuantityInput'

interface ProductButtonsProps {
  product:Product
}

const ProductButtons: FC<ProductButtonsProps> = ({product}) => {
    const [quantity, setQuantity] = useState<number>(1)
    const [isAdded, setIsAdded] = useState<boolean>(false)
    const {dispatch}=useCart()

    const {toast}=useToast()

    

   

    async function handleAddToCart(){
      toast({
        title: "Added to Cart",
        description: `${product.title} is added to your cart`,
        action: (
          <ToastAction 
            altText="Goto schedule to undo"
          >
            Undo
          </ToastAction>
        ),
      })

      dispatch({type:CART_ACTION.ADD_ITEM,payload:{...product,quantity}})    
    }
    function handleQuantity(val:number){
      setQuantity(val)

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

    <Link
      className={buttonVariants({variant:"default"})}
      href={`/checkout?cartItem=${product.id}&quantity=${quantity}`}
    > 
      Buy Now
    </Link>
    </div>
   )
}

export default ProductButtons