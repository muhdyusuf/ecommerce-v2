'use server'
import Footer from '@/components/Footer'
import SwiperAuto from '@/components/SwiperAuto'
import Image from 'next/image'
import prisma from '../../../prisma/client'
import FeaturedProduct from '@/components/FeaturedProduct'
import ProductSWiper from '@/components/ProductSwiper'

export default async function Home() {
  const billboards=await prisma.billboard.findMany()
  const newArrivals=await prisma.product.findMany({
    where:{
        isArchived:false
    },
    orderBy:{
        createdAt:"desc"
    },
    take:10
})

  return (
    <>
    <main
    className='md:container'
    >

          <div
            className='w-full'
          >
          <SwiperAuto billboards={billboards}/>
          </div>



    </main>
    <section>
      <div
        className='md:container flex flex-col gap-4 md:gap-6'
      >
        <h2
          className='text-xl font-fold'
        >
          New Arrival
        </h2>
        <ProductSWiper
          products={newArrivals}
        />
      </div>
    </section>
        <FeaturedProduct/>
    </>
  )
}
