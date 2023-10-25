'use client'
import { useCart } from '@/app/context/cartContext'
import { CART_ACTION } from '@/app/context/contextAction'
import { FC, useEffect, useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Input } from './ui/input'
import { Minus, Plus } from 'lucide-react'
import { useToast } from './ui/use-toast'
import { ToastAction } from './ui/toast'

interface ProductButtonsProps {
  product:Product
}

const ProductButtons: FC<ProductButtonsProps> = ({product}) => {
    const [quantity, setQuantity] = useState<number>(1)
    const [isAdded, setIsAdded] = useState<boolean>(false)
    const {dispatch}=useCart()

    const {toast}=useToast()

    

    async function AddToCart(){

    }

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
    console.log(quantity)

  return (
  <div>
    <div
      className='grid grid-cols-4 w-32'
    >
      <Button
        aria-label='button-deduct-quantity'
        name='button-deduct-quantity'
        className='p-0 '
        onClick={()=>setQuantity(quantity===1?quantity:quantity-1)}
      >
        <Minus />
      </Button>
      <Input
        type={"number"}
        className='col-span-2 text-center remove-arrow'
        value={quantity}
        onChange={(e)=>{
          const value=parseInt(e.target.value)
          if(value<=0)return
          setQuantity(value)
        }}
        onBlur={(e)=>{
          const value=parseInt(e.target.value)
          if(isNaN(value)){
            setQuantity(1)
          }
        }}
        
        
      />
      
      <Button
        aria-label='button-add-quantity'
        name='button-add-quantity'
        className='p-0'
        onClick={()=>setQuantity(quantity+1)}
      >
        <Plus />
      </Button>
      
    </div>
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