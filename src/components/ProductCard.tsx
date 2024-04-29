import {FC} from 'react'

import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"




  import { cn, formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Product} from '@prisma/client'
import ProductImageSlider from './ProductImageSlider'


interface ProductCardProps {
 product:Product
 className?:string
}

const ProductCard:FC<ProductCardProps>=({product,className})=>{
 return(
 
    <Card
     className={cn(
         "p-2 rounded-md shadow-none dark:border-none",
         className
         )}
         >
       <CardContent
        className='p-0'
        >
            <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/product/${product.id}`}
                className='w-full'
            >
           <div
            className='w-full h-auto aspect-square overflow-hidden rounded-md'
            >   
                <Image
                    src={product.imageUrls[0]}
                    height={200}
                    width={200}
                    alt={`${product.name}images`}
                    className='w-full h-full object-cover'
                    />
         
           </div>
           <CardFooter
            className='p-2 flex flex-col items-start w-full h-full'
            >
                <h3
                    className='line-clamp-2 font-black capitalize w-full'
                    >
                    {product.name}
                </h3>
                
                <p>
                    {formatPrice(product.price)}
                </p>
                {/* <BuyNowButton product={product}/> */}
           </CardFooter>
                </Link>
       </CardContent>
    </Card>
  

)}

export default ProductCard