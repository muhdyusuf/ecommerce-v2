'use client'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Billboard } from '@prisma/client';
import Image from 'next/image';

interface SwiperAutoProps {
  billboards:Billboard[]
}

const SwiperAuto: FC<SwiperAutoProps> = ({
  billboards
}) => {
  return (
   <Swiper
        autoplay={{
            delay:3000,
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
          >
            <Image
              src={billboard.imageUrl}
              width={1000}
              height={500}
              alt={billboard.label}
              className='w-full h-auto aspect-video object-cover'
            />
          </SwiperSlide>
        ))
      }
   </Swiper>
   )
}

export default SwiperAuto