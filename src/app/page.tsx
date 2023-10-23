import Footer from '@/components/Footer'
import SwiperAuto from '@/components/SwiperAuto'
import Image from 'next/image'

export default function Home() {
  return (
    <>
    <main
    className='md:container'
    >
      <section>
        <SwiperAuto/>
      </section>

    </main>
    <Footer />
    </>
  )
}
