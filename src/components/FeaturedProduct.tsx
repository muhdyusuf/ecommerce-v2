import {FC} from 'react'
import prisma from '../../prisma/client'
import ProductCart from './ProductCard'
import { cn } from '@/lib/utils'
import ProductSWiper from './ProductSwiper'
import { Product } from '@prisma/client'

interface FeaturedProductProps {
 className?:string
 productId?:number[]
}

const FeaturedProduct:FC<FeaturedProductProps>=async({className,productId})=>{

    const whereCondition=productId?{isFeatured:true,id:{not:{in:productId}}}:{isFeatured:true}

 const featuredProducts=await prisma.product.findMany({
    where:{
        ...whereCondition
    },
    include:{
        rating:true
    },
    take:10
 })
 
    return(
      <section
        className={cn("bg-secondary",className)}
      >
        <div
          className='md:container py-6'
          >
            <div
              className='flex flex-col md:flex-row md:justify-center md:items-center gap-6'
              >
            <h2
              className='md:text-6xl text-2xl font-bold'
              >
              Featured
            </h2>
            <ProductSWiper
                products={featuredProducts}
                className='w-full'
            />
          </div>
  
        </div>
      </section>
)}

export default FeaturedProduct