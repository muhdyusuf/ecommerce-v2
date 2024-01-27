import {FC} from 'react'
import prisma from '../../../../../prisma/client'
import ProductImageSlider from '@/components/ProductImageSlider'
import FeaturedProduct from '@/components/FeaturedProduct'
import { formatPrice } from '@/lib/utils'
import ProductButtons from '@/app/(root)/product/[productId]/ProductButtons'
import { NextResponse } from 'next/server'
import { redirect } from 'next/dist/server/api-utils'

interface pageProps {
 params:{
  productId:string
 }
}

const page:FC<pageProps>=async({params})=>{
  const {productId}=params
  if(!productId||isNaN(Number(productId)))throw new Error('Invalid Product Id')
  const product=await prisma.product.findUnique({
    where:{
      id:Number(productId),
      stock:{
        gte:1
      }
    },
    include:{
      rating:true,
      size:true,
      colour:true,
      category:true
    }
  })
  if(!product)throw new Error('Product not exist or sold')
  
 return(
    <>
    <main
      className='md:container mb-6'
    >
      <div
       className='flex flex-wrap md:justify-center gap-4 relative'
        >
          
          <ProductImageSlider
            className='w-[min(100%,600px)] '
            images={product.imageUrls}
            imageSize={800}  
          />
       

          <div
            className='w-[min(100%,400px)] flex flex-col justify-between md:p-8 p-2 gap-4'
          >
            <div>
              <h2
                className='text-4xl capitalize'
                >
                {product.name}
              </h2>
              <h3
                className='text-2xl'
                >
                {formatPrice(product.price)}
              </h3>
            </div>
       
              <ProductButtons product={product}/>
            

            <ul
              className='flex flex-col gap-4 list-disc list-inside'
            >
              <li>
                    Size : {product.size.name.toUpperCase()}
              </li>
              
              <li
                className='capitalize'
              >
                  Color : {product.colour.name}
           
              </li>
             
              
              <li>
          
                  Description
               
                <p
                  className='pl-2'
                >
                  {product.description}
                </p>
              </li>
            </ul>

          </div>
      </div>

    </main>
    <FeaturedProduct
      productId={[product.id]}
    />
    </>
)}

export default page