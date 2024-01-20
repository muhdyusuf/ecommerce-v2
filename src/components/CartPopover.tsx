'use client'
import { ShoppingBag, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { FC,useEffect,useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import { cn, formatPrice } from '@/lib/utils'
import { Popover, PopoverTrigger } from './ui/popover'
import { PopoverClose, PopoverContent } from '@radix-ui/react-popover'
import Image from 'next/image'
import useCart from '@/hooks/useCart'

interface CartProps {
  
}

const CartPopover: FC<CartProps> = ({}) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
      setIsMounted(true)
    }, [])
    
    const {cart}=useCart()
    const url=process.env.NEXT_PUBLIC_APP_URL
    
    
    
  return !isMounted?(
    <Button
    aria-label="cart-button-open-popover"
    className={cn(`hover:bg-slate-100/10 m-0 p-1 relative`)}
    variant={"ghost"}
    >
        <ShoppingBag
            strokeWidth={2}
            className='w-6 h-auto aspect-square'
        />
    </Button>
  ):(
   <>
   <div
    className='relative md:hidden'
   >
        <div
            className='empty:hidden absolute bg-primary text-white top-0 right-0 text-[.6rem] h-4 w-auto aspect-square rounded-full grid place-content-center dark:text-black font-bold'
            >
            {cart.length>0?cart.length:null}
        </div>
        <Link
            href={"/cart"}
            className={cn(
                buttonVariants({variant:"ghost"}),
                `hover:bg-slate-100/10 m-0 p-1`

                )}
                >

            <ShoppingBag
                strokeWidth={2}
                className='w-6 h-auto aspect-square'
                />
            
        </Link>
    </div>
    <Popover>
        <PopoverTrigger
            className='hidden md:block'
            asChild
        >
            <Button
                variant={"link"}
                className='relative hidden md:flex p-0'
            >
                    <div
                        className='empty:hidden absolute bg-primary text-white top-0 right-0 text-[.6rem] h-4 w-auto aspect-square rounded-full grid place-content-center dark:text-black font-bold'
                        >
                        {cart.length>0?cart.length:null}
                    </div>
                    <Link
                        href={"/cart"}
                        className={cn(
                            buttonVariants({variant:"ghost"}),
                            `hover:bg-slate-100/10 m-0 p-1`

                            )}
                            >

                        <ShoppingBag
                            strokeWidth={2}
                            className='w-6 h-auto aspect-square'
                            />
                        
                    </Link>
                </Button>
        </PopoverTrigger>
        <PopoverContent
            className='shadow-md bg-background p-4 rounded-md flex flex-col gap-2'
            align='end'
        >
            <h4 className='font-medium'>
                Your Cart
            </h4>
            <ul
                className='flex flex-col gap-1'
            >
            {cart.slice(0,4).map(product=>(
                <li
                    key={crypto.randomUUID()}
                    className='grid grid-cols-[4rem,300px,1fr] items-start gap-1'
                >
                    <div
                        className='w-12 h-auto aspect-square overflow-hidden'
                    >
                        <Image
                            src={product.imageUrls[0]}
                            alt={`${product.name} image`}
                            width={48}
                            height={48}
                            className='w-full h-full object-contain'
                        />
                    </div>
                    <p
                        className='break-words overflow-hidden h-min'
                    >
                        {product.name}
                    </p>
                    <p>
                        {formatPrice(product.price)}
                    </p>
                </li>
            
            ))}
            </ul>
            <PopoverClose asChild>
                <Link
                    href={`${url}/cart`}
                    className='text-primary'
                >
                    See All..
                </Link>
            </PopoverClose>
       
        </PopoverContent>
    </Popover>
    
   </>
   ) 
}

export default CartPopover