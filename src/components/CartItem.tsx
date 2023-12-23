import {ChangeEvent, FC} from 'react'
import { Button, buttonVariants } from './ui/button'

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
import { Trash, Trash2, X } from 'lucide-react'
import Link from 'next/link'
import { Input } from './ui/input'
import useCart, { CartItemLocal } from '@/hooks/useCart'
import { Checkbox } from './ui/checkbox'
 

interface CartItemProps {
   cartItem:CartItemLocal
   onSelected:(val:boolean)=>void
}

const CartItem:FC<CartItemProps>=({cartItem,onSelected=()=>{}})=>{
   const {cart,updateItem,removeItem}=useCart()
  
   function handleSetQuantity(val:number){
     updateItem({...cartItem,quantity:val})
   }
   function handleSetSelected(checked:boolean){
      onSelected(checked)
   }
     
 return(

    <div
      className='w-full py-4 p-2 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] md:gap-x-6 gap-2 border-b border-black/30'
    > 
  
            
         <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}/product/${cartItem.id}`}
            className='w-full h-auto aspect-square overflow-hidden row-span-2 rounded-md'
         >
            <Image 
               src={cartItem.imageUrls[0]}
               width={300}
               height={300}
               className='object-cover w-full h-full'
               alt={`${cartItem.name}image`}
            />
         </Link>

        <div
         className='flex flex-col justify-between h-full gap-4'
        >
            <div
            >
               <div
                  className='flex justify-between items-start'
               >
                  <Link
                        href={`${process.env.NEXT_PUBLIC_APP_URL}/product/${cartItem.id}`}
                        className='font-bold'
                        >
                     {cartItem.name}
                  </Link>
                  <Checkbox 
                     name={cartItem.name+"selected"}
                     id={cartItem.id+"selected"}
                     checked={cartItem.selected}
                     onCheckedChange={handleSetSelected}
                  />  
               </div>
               <p>
               {cartItem.category}
               </p> 
               <p>
               {cartItem.colour}
               </p> 

               <div
                  className='flex flex-col w-max md:flex-row md:items-center items-start md:gap-2'
                  >
                  <p>
                     size: {cartItem.size}
                  </p>
                  <QuantityInput
                     onChange={handleSetQuantity}
                     defaultValue={cartItem.quantity}
                     maxValue={cartItem.stock}
                     className='w-32 grid grid-cols-[1fr,2fr,1fr] gap-1 items-center self-end'
                  />
               </div>
            </div>
            <AlertDialog>
               <AlertDialogTrigger
               >
                  <Trash2 
                     size={20}
                     className='stroke-muted-foreground'
                  />
               </AlertDialogTrigger>
               <AlertDialogContent>
                  <AlertDialogHeader>
                     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                     <AlertDialogDescription>
                     This action cannot be undone. This will permanently remove {cartItem.name} from your cart.
                     </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                     <AlertDialogCancel>Cancel</AlertDialogCancel>
                     <AlertDialogAction
                        onClick={()=>removeItem(cartItem.id)}
                        >
                        Remove
                     </AlertDialogAction>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialog>

         </div>
         <p
            className='col-span-full md:col-span-1 text-end'
         >
            {
               formatPrice(((cartItem.price*PRICE_MULTIPLIER)*(cartItem.quantity||1))/PRICE_MULTIPLIER)
            }
         </p>
                  
    </div>
)}

export default CartItem