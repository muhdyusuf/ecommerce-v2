'use server'
import Footer from '@/components/Footer'
import SwiperAuto from '@/components/SwiperAuto'
import Image from 'next/image'

export default async function Home() {

  return (
    <>
    <main
    className='md:container'
    >
      <section
        className='grid grid-cols-2 grid-rows-2 md:grid-cols-4 gap-2'
      >   
          <div
            className='col-span-full md:col-span-3 md:row-span-full'
          >
            <SwiperAuto/>
          </div>
          <div
            className='bg-red-600 aspect-video md:aspect-auto'
          >

          </div>
          <div
            className='bg-blue-200 aspect-video md:aspect-auto'
          >

          </div>
      </section>

    </main>
    <Footer />
    </>
  )
}
