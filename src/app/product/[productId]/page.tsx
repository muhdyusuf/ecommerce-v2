
import { FC } from 'react'
import ProductButtons from '@/components/ProductButtons'
import Image from 'next/image'

interface pagesProps {
  params:{
    productId:string
  },
  searchParams:string,
}

const pages: FC<pagesProps> = async ({params,searchParams}) => {
    let product:Product|undefined
    console.log(params)
    try {
      await fetch('https://fakestoreapi.com/products/'+params.productId)
      .then(res=>res.json())
      .then((res:Product)=>product=res)
    } catch (error) {
      console.log(error)
    }
    
    
  return (
    <>
    <main>
      {product&&(
      <div
        className='w-full grid sm:grid-cols-[400px,1fr]'
      >
        <div
          className=''
        >
          <div
            className=''
          >
          <Image
            width={300}
            height={300}
            className='w-full h-auto aspect-square object-contain'
            alt="product iamge"
            src={product?.image}
            />
          </div>
          <div className='hidden sm:block'>
            <ul
              className='w-full grid grid-cols-4 gap-5'
            >
              <li
                className='bg-blue-300 w-full h-auto aspect-square rounded-md'
              >
              </li>
              <li
                className='bg-blue-300 w-full h-auto aspect-square rounded-md'
              >
              </li>
              <li
                className='bg-blue-300 w-full h-auto aspect-square rounded-md'
              >
              </li>
            </ul>
          </div>


        </div>

        <div
          className='w-full flex flex-col justify-between'
        >
          <div>
            {product.name||product.title}
          </div>

          <div>
            <p>
            {product?.rating.rate}
            </p>
            <p>
              {product.rating.count}
            </p>
          </div>

          <div>
            {product.description}
          </div>

          <div>
            {product.price}
          </div>

        <ProductButtons product={product}/>
        </div>

      </div>)}
    </main>
    <section>
      <div>
      </div>
    </section>
   </>
   )
}

export default pages