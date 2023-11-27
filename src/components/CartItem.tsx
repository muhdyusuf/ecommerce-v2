import { useCart } from '@/context/cartContext'
import {ChangeEvent, FC} from 'react'
import { Button, buttonVariants } from './ui/button'
import { CART_ACTION } from '@/context/contextAction'

//ui
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
 } from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { QuantityInput } from './QuantityInput'
import { PRICE_MULTIPLIER, cn, formatPrice } from '@/lib/utils'
import { X } from 'lucide-react'
import Link from 'next/link'
 

interface CartItemProps {
   cartItem:CartItem
}

const CartItem:FC<CartItemProps>=({cartItem})=>{
   const {cart,dispatch}=useCart()

  
   function handleSetQuantity(val:number){
     dispatch({
          type:CART_ACTION.UPDATE_ITEM,
          payload:{...cartItem,quantity:val}
      })
  }
  function handleSetSelected(e:ChangeEvent<HTMLInputElement>){

   const isSelected=e.target.checked
   dispatch({
       type:CART_ACTION.UPDATE_ITEM,
       payload:{...cartItem,selected:isSelected}
   })
}
 return(

    <div
      className='w-full  rounded-md py-8 grid grid-cols-[auto,auto,1fr,1fr]  gap-x-4'
    > 
            <input 
                  type="checkbox"
                  name=""
                  id=""
                  checked={cartItem.selected||false}
                  onChange={handleSetSelected}
                  className='row-span-2 self-start'
               />  
            
         <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}/product/${cartItem.id}`}
            className='aspect-square w-[100px] row-span-2'
         >
            <Image 
               src={cartItem.image}
               width={300}
               height={300}
               className='object-cover'
               alt={`${cartItem.name}image`}
            />
         </Link>

        
         <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}/product/${cartItem.id}`}
         >
            {cartItem.name||cartItem.title}
         </Link>
         <AlertDialog>
            <AlertDialogTrigger
               className={cn(
                  buttonVariants({variant:"ghost"}),
                  "justify-self-end p-0"
               )}
               >
               <X />
            </AlertDialogTrigger>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove {cartItem.name||cartItem.title} from your cart.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                     onClick={()=>dispatch({
                        type:CART_ACTION.DELETE_ITEM,
                        payload:cartItem
                     })}
                     >
                     Remove
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
    
    
         <QuantityInput
            onChange={handleSetQuantity}
            defaultValue={cartItem.quantity}
            className='w-32 grid grid-cols-[1fr,2fr,1fr] gap-1 items-center self-end'
            />
         <div
            className='justify-self-end self-end'
         >
            {
               formatPrice(((cartItem.price*PRICE_MULTIPLIER)*(cartItem.quantity||1))/PRICE_MULTIPLIER)
            }
         </div>
    
      
        
    </div>
)}

export default CartItem