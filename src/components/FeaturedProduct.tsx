import {FC} from 'react'
import prisma from '../../prisma/client'
import { cn } from '@/lib/utils'
import ProductSWiper from './ProductSwiper'

interface FeaturedProductProps {
 className?:string
 productId?:number[]
}

const FeaturedProduct:FC<FeaturedProductProps>=async({className,productId})=>{

    const whereCondition=productId?{isFeatured:true,id:{not:{in:productId}}}:{isFeatured:true}

    const featuredProducts=await prisma.product.findMany({
        where:{
            ...whereCondition,
            isArchived:false,
            stock:{
              gte:1
            }
        },
        take:10
    })
 
    return(
      <section
        className={cn("bg-secondary my-8",className)}
      >
        <div
          className='p-4 md:container flex flex-col py-10 md:gap-8 gap-4'
          >
            <div
              className='flex flex-col justify-center items-center gap-4'
              >
              <h2
                className='text-4xl font-bold'
                >
                Featured
              </h2>
              <p
                className='w-[min(100%,600px)] text-center hidden md:block'
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.Minus iure voluptates ab laudantium soluta vitae natus reprehenderit blanditiis dolorum nam!
              </p>
          </div>

          <ProductSWiper
              products={featuredProducts}
              className='w-full'
          />
  
        </div>
      </section>
)}

export default FeaturedProduct