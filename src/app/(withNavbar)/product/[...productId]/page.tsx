import {FC} from 'react'
import prisma from '../../../../../prisma/client'
import ProductImageSlider from '@/components/ProductImageSlider'
import FeaturedProduct from '@/components/FeaturedProduct'
import { formatPrice } from '@/lib/utils'
import ProductButtons from '@/components/ProductButtons'

interface pageProps {
 params:{
  productId:string
 }
}

const page:FC<pageProps>=async({params})=>{
  const {productId}=params
  
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
  if(!product) return null
  
 return(
    <>
    <main
      className='md:container mb-6'
    >
      <div
        className='grid lg:grid-cols-[450px,1fr]'
        >
          <div
            className='w-full aspect-square'
            >
            <ProductImageSlider 
              images={product.imageUrls}
              imageSize={800}  
            />
          </div>

          <div
            className='min-h-full w-full flex flex-col justify-between p-8'
          >
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
            <h5>Size</h5>
            <p>{product.size.name}</p>
            <h5>
              COLOR
            </h5>
            <div
              className='rounded-md w-8 h-auto aspect-square outline outline-slate-300 outline-4 outline-offset-2'
              style={{
                backgroundColor:`${product.colour.value}`
              }}
            />
            <h5>
              Description
            </h5>
            <p>
              {product.description}
            </p>
            <ProductButtons product={product}/>

          </div>
      </div>

    </main>
    <section
      className='bg-secondary'
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
          <FeaturedProduct
            className={`grid grid-cols-[repeat(auto-fit,200px)] gap-4`}
            productId={product.id}
          
          />
        </div>

      </div>
    </section>
    </>
)}

export default page