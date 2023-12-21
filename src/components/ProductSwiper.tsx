'use client'
import { Product } from '@prisma/client'
import {FC, useRef, useState} from 'react'
import { Swiper, SwiperRef, SwiperSlide, useSwiper } from 'swiper/react'
import ProductCard from './ProductCard'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'


interface ProductSWiperProps {
    products:Product[]
    className?:string
}

const ProductSWiper:FC<ProductSWiperProps>=({products,className})=>{
    const swiperRef=useRef<SwiperRef|null>(null)
    // const [isBeginning, setIsBeginning] = useState(true)
    // const [isEnd, setIsEnd] = useState(false)
 return(
  
        <Swiper
            ref={swiperRef}
            // onReachEnd={()=>setIsEnd(true)}
            // onReachBeginning={()=>setIsBeginning(true)}
            // onSlideChange={()=>{
            //     setIsBeginning(false)
            //     setIsEnd(false)
            // }}
            slidesPerView={"auto"}
            spaceBetween={4}
            className={cn(className,"w-full relative group/swiper")}

        >
        {products.map(product=>(
            <SwiperSlide
            key={product.name+product.id}
            className='max-w-[200px]'
            >
                <ProductCard
                    product={product}
                    />
            </SwiperSlide>
        ))}
        <Button
            type='button'
            className='absolute top-0 bottom-0 left-2 m-auto z-50 p-0 w-10 h-auto aspect-square rounded-full invisible group-hover/swiper:visible'
            onClick={()=>swiperRef.current?.swiper.slidePrev()}
            //todo:fix disable
            // disabled={isBeginning}
            >
            <ArrowLeft 
                size={20}
                />
        </Button>
        <Button
            type='button'
            className='absolute top-0 bottom-0 right-2 m-auto z-50 p-0 w-10 h-auto aspect-square rounded-full invisible group-hover/swiper:visible'
            onClick={()=>swiperRef.current?.swiper.slideNext()}
            //todo:fix disable
            // disabled={isEnd}
            >
            <ArrowRight
                size={20}
                />
        </Button>
    </Swiper>

)}

export default ProductSWiper





