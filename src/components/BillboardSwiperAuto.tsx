'use client'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Billboard } from '@prisma/client';
import Image from 'next/image';

interface BillboardSwiperAutoProps {
  billboards:Billboard[]
}

const BillboardSwiperAuto: FC<BillboardSwiperAutoProps> = ({
  billboards
}) => {
  return (
   <Swiper
        autoplay={{
            delay:10000,
            disableOnInteraction: false,
        }}
        pagination={{
            clickable:true
        }}
        className='w-full aspect-video'
        modules={[Autoplay,Pagination]}
   >
      {
        billboards.map(billboard=>(
          <SwiperSlide
            key={billboard.imageUrl+billboard.id}
            className='relative w-full h-auto aspect-video'
          >
            <Image
              src={billboard.imageUrl}
              width={1000}
              height={500}
              alt={billboard.label}
              className='absolute top-0 right-0 -z-10 w-full h-full object-cover'
            />
            <div
              className='w-full h-full flex justify-center items-center'
            >
              <p
                className='text-4xl font-bold text-primary whitespace-pre-line'
              >
                {billboard.label}
              </p>
            </div>
          </SwiperSlide>
        ))
      }
   </Swiper>
   )
}

export default BillboardSwiperAuto