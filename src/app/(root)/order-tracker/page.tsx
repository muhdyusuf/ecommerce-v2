'use client'
import {FC, useEffect, useState} from 'react'
import OrderTrackerForm from './order-form'
import {Order} from "@prisma/client";
import { ClipboardX } from 'lucide-react';
import OrderCard from '@/components/OrderCard';
import { OrderCartItemProduct } from '@/types/prisma';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';




const Page:FC=({})=>{

  const [order, setOrder] = useState<OrderCartItemProduct|null|undefined>(undefined)

  console.log(order)

 return order?(
  <main
  className='md:container flex flex-col gap-4'
  >
    <h2
      className='text-xl font-bold'
    >
      Your Order
    </h2>
    <h3>
      status : {order.status==="paid"?"To Receive":"delivered"}
    </h3>
    <div
      className='w-[min(100%,600px)]'
    >
      <OrderCard
          order={order}
    />
  </div>
</main>
):order===null?(
<InvalidId
  setOrder={setOrder}
/>
):(
  <main
  className='p-4 md:container space-y-4'
  >
    <div>

      <h1
      className='md:text-4xl text-2xl font-bold'
      >
      ORDERS AND RETURNS
      </h1>
      <p
        className='w-[min(100%,800px)] text-muted-foreground'
      >
      Track your order by entering your email address below. You can return an item within 30 days after receiving your order. An in-store return is also possible if you ordered something without a delivery fee – just make sure you have your order number handy.
      </p>
    </div>
    <OrderTrackerForm
      setOrder={setOrder}
    />
  </main>  
)

}


export default Page

interface PageProp {
  setOrder:(order:OrderCartItemProduct|null|undefined)=>void
}
const InvalidId:FC<PageProp>=({setOrder})=>{
    return(
        <main
            className='flex justify-center items-center'
        >
            <div
                className='w-[min(100%,600px)] rounded-md outline-dashed outline-muted flex flex-col justify-center items-center
                aspect-video'
            >
                <ClipboardX
                    size={"3rem"}
                    className='stroke-secondary'

                />
                <p
                    className='text-sm text-muted-foreground'
                >
                    Invalid Order Id
                </p>
                <Button
                  variant={"link"}
                  onClick={()=>setOrder(undefined)}
                >
                  Reset
                </Button>

            </div>
        </main>
    )
}