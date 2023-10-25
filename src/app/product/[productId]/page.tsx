
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
      <div>
        <Image
          width={300}
          height={300}
          alt="product iamge"
          src={product?.image}

        />
        <ProductButtons product={product}/>

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