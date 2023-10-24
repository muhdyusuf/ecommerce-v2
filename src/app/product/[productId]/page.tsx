import { FC } from 'react'
import { CartProvider } from '../../context/cartContext'
import AddToCartButton from '@/components/AddToCartButton'

interface pagesProps {
  params:{
    productId:string
  },
  searchParams:string,
}

const pages: FC<pagesProps> = async ({params,searchParams}) => {
    const products:Product|{}={}

    console.log(params.productId)
  return (
    <>
    <main>
      <div>
       <AddToCartButton productId={params.productId} />
      </div>
    </main>
    <section>
      <div>
      </div>
    </section>
   </>
   )
}

export default pages