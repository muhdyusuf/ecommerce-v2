import {FC} from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { CartItem, Order,Product } from '@prisma/client'
import { Separator } from './ui/separator'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import { OrderCartItemProduct } from '@/types/prisma'



interface OrderCardProps {
    order:OrderCartItemProduct
}


const OrderCard:FC<OrderCardProps>=({order})=>{
 return(
    <Card>
        <CardHeader>
            <CardTitle>
    	        {`order #${order.id}`}
            </CardTitle>
        
        </CardHeader>
        <CardContent>
            <ul
           
            >
                {order.cartItem.map(item=>(
                    <li
                        key={item.product.name+item.product.id}
                        className='border-b py-1 grid grid-cols-[100px,1fr,1fr] gap-4'
                    >
                        <Image
                            
                            width={100}
                            height={100}
                            className='aspect-square object-cover'
                            alt='itemImage'
                            src={item.product?.imageUrls[0]}
                        />
                        <div>
                            <p>
                                {item.product.name}
                            </p>
                            <p>
                                x{item.quantity}
                            </p>
                        </div>
                        <p 
                            className='justify-self-end'
                        >
                            {formatPrice(item.product.price*item.quantity)}
                        </p>
                    </li>
                ))}
            </ul>
            
        </CardContent>
        <CardFooter
         className='flex justify-end'
        >
            <p>
                Order Total : 
                <span
                    className='font-bold md:text-lg text-primary'
                >{formatPrice(order.total)}</span>
            </p>
        </CardFooter>
    </Card>
)}

export default OrderCard