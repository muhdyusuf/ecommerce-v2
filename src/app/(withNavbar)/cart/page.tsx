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
      className='md:container min-h-[calc(100vh-3rem)] flex justify-center'
    >
      <CartList/>
    </main>
  )
}

export default page