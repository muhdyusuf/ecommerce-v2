'use client'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

interface SwiperAutoProps {
  
}

const SwiperAuto: FC<SwiperAutoProps> = ({}) => {
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
      <SwiperSlide
        className='bg-blue-300'
      >Slide 1</SwiperSlide>
      <SwiperSlide
        className='bg-red-300'
      >Slide 2</SwiperSlide>
      <SwiperSlide
        className='bg-green-300'
      >Slide 3</SwiperSlide>
      <SwiperSlide
        className='bg-red-300'
      >Slide 4</SwiperSlide>
   </Swiper>
   )
}

export default SwiperAuto