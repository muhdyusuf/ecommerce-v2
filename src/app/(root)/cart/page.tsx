import CartList from '@/app/(root)/cart/CartList'
import { Metadata } from 'next'
import { FC } from 'react'

interface pageProps {

}

export const metadata: Metadata = {
  title: 'Your cart | Ecommerce V2',
  description: 'mock e commerce',
}

const Page: FC<pageProps> = async({}) => {


  return (
    <main
      className='md:container min-h-[calc(100vh-3rem)] flex justify-center'
    >
      <CartList/>
    </main>
  )
}

export default Page