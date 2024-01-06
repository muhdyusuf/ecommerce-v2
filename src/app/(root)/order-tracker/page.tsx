'use server'
import {FC} from 'react'
import OrderTrackerForm from './order-form'

interface pageProps {
 
}

const page:FC<pageProps>=({})=>{

 return(
    <main
      className='md:container space-y-4'
    >
       <h1
         className='md:text-4xl text-2xl font-bold'
       >
        ORDERS AND RETURNS
       </h1>
       <p
         className='w-[min(100%,800px)]'
       >
         Track your order by entering your email address below. You can return an item within 30 days after receiving your order. An in-store return is also possible if you ordered something without a delivery fee – just make sure you have your order number handy.
       </p>
       <OrderTrackerForm/>

    </main>
)}

export default page