import CartList from '@/components/CartList'
import { Metadata } from 'next'
import { FC } from 'react'

interface pageProps {
  searchParams:{

  },
  params:string
}

export const metadata: Metadata = {
  title: 'Your cart | Ecommerce V2',
  description: 'mock e commerce',
}

const page: FC<pageProps> = async({searchParams,params}) => {


  return (
    <main
      className='container flex justify-center min-h-screen-minus-navbar'
    >
      <CartList/>
    </main>
  )
}

export default page