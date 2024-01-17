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
  if(!productId)throw new Error('Invalid Product Id')
  const product=await prisma.product.findUnique({
    where:{
      id:Number(productId)
    },
    include:{
      rating:true,
      size:true,
      colour:true,
      category:true
    }
  })
  if(!product)throw new Error('Product not exist')
  
 return(
    <>
    <main
      className='md:container mb-6'
    >
      <div
       className='flex md:flex-col w-full justify-center gap-2'
        >
          
          <ProductImageSlider 
            images={product.imageUrls}
            imageSize={800}  
          />
       

          <div
            className='min-h-full flex flex-col justify-between md:p-8 p-2'
          >
            <div>
              <h2
                className='text-4xl'
                >
                {product.name}
              </h2>
              <h3
                className='text-2xl'
                >
                {formatPrice(product.price)}
              </h3>
            </div>

            <ul
              className='flex flex-col gap-4'
            >
              <li>

              <h5>Size</h5>
              <p>{product.size.name}</p>
              </li>
              

              <li>
                <h5>
                  COLOR
                </h5>
                <div
                  className='rounded-md md:w-8 w-6 h-auto aspect-square outline outline-slate-300 outline-2 outline-offset-2'
                  style={{
                    backgroundColor:`${product.colour.value}`
                  }}
                  />
              </li>
             
              
              <li>
                <h5>
                  Description
                </h5>
                <p>
                  {product.description}
                </p>
              </li>
            </ul>
            <ProductButtons product={product}/>

          </div>
      </div>

    </main>
    <FeaturedProduct
      productId={[product.id]}
    />
    </>
)}

export default page