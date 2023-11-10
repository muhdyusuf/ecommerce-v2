'use client'
import { useState, useEffect, useRef,FC, ReactNode} from 'react';
import { Button } from './ui/button';
import { SwiperSlide,Swiper, SwiperRef} from 'swiper/react';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// const Carousel:FC = () => {

//   const [currentSlide, setCurrentSlide] = useState({index:0,progress:0});

//   const [current, setCurrent] = useState(0);

//   const containerRef = useRef<HTMLDivElement>(null);
//   const touchStartX = useRef<number | null>(null);
//   const touchEndX = useRef<number | null>(null);
  
  

//   const items = ['image1.jpg', 'image2.jpg', 'image3.jpg'];


//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX;
//   };


//   const handleTouchMove = (e: React.TouchEvent) => {
//     if (touchStartX.current === null) return;
   
//     touchEndX.current = e.touches[0].clientX;
  

//     const deltaX = touchEndX.current - touchStartX.current;
//     if (!containerRef.current)return
//       const rect = containerRef.current.getBoundingClientRect();
//       const width = rect.width;
//       const moveFactor=deltaX/width
      
     
//     if(moveFactor>0.99||moveFactor<-0.99)return
//       setCurrentSlide({...currentSlide,progress:(currentSlide.index*width)+deltaX})
      
    
//   };

//   function handleTouchEnd(){
//     if(!containerRef.current)return
//     const rect = containerRef.current.getBoundingClientRect();
//     const width = rect.width;
//     const deltaProgress=currentSlide.progress-currentSlide.index
//     console.log(deltaProgress)
//     console.log(deltaProgress>-0.3&&deltaProgress<0.3)
 
    
 
//   // if(deltaProgress>-0.3&&deltaProgress<0.3){
//   //     setCurrentSlide({index:currentSlide.index,progress:(currentSlide.index*-1)})
//   // }
//   // else if(deltaProgress<-0.3 && currentSlide.index+1<items.length){
//   //   //set next
//   //   setCurrentSlide({index:currentSlide.index+1,progress:(currentSlide.index+1)*-1})
//   // }
//   // else if(deltaProgress>0.3 && currentSlide.index>0){
//   //   //set prev
//   //   setCurrentSlide({index:currentSlide.index-1,progress:(currentSlide.index-1)*-1})
//   // }
//   // else{
//   //   console.log(currentSlide)
//   //   setCurrentSlide({index:currentSlide.index,progress:(currentSlide.index*-1)})
//   // }

//   // return ()=>{
//   //   touchEndX.current=null
//   //   touchStartX.current=null
//   // }


  
  
//   }


//   return (
//     <>
//     {/* <Button
//       onClick={()=>setCurrentSlide({index:currentSlide.index+1,progress:100})}
//     >
//       next
//     </Button> */}
//     <div 
//       ref={containerRef}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}

//       className="relative overflow-hidden">
//       <div
//         className="flex"
//         style={{
//           transform: `translateX(${currentSlide.progress}px)`,
//           transition: 'transform .3s ease-in-out',
//         }}
//       >
      
//         {items.map((item, index) => (
//           <div key={index} className="w-full flex-shrink-0 aspect-square bg-red-600">
//             <img src={item} alt={`Slide ${index}`} className="w-full" />
//           </div>
//         ))}
       
//       </div>
//     </div>
//     </>
//   );
// };

// export default Carousel;


interface ProductImageSliderProps {
  images:string[]
  className:string
}

const ProductImageSlider: FC<ProductImageSliderProps> = ({images,className}) => {
  const swiperRef=useRef<SwiperRef|null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <div
      className='w-full relative'
    >
    <Swiper
      className='w-full'
      ref={swiperRef}
      onSlideChange={(slide)=>{
        setCurrentIndex(slide.activeIndex)
      }}
    >
      {images.map(image=>(
        <SwiperSlide
          className='w-full'
        >
          <Image
            width={300}
            height={300}
            alt="photo"
            src={image}
            className='w-full h-auto aspect-square object-contain'
            />
        </SwiperSlide>
      ))}
      
    </Swiper>

    <Button 
      className='absolute top-0 bottom-0 mb-auto mt-auto left-0 z-50'
      type="button"
      disabled={currentIndex===0}
      onClick={()=>{
        if(!swiperRef.current)return
        swiperRef.current.swiper.slidePrev()
      }}
    >
      Prev
    </Button>
    <Button 
      className='absolute top-0 bottom-0 mb-auto mt-auto right-0 z-50'
      type="button"
      disabled={currentIndex+1>=images.length}
      onClick={()=>{
        if(!swiperRef.current)return
        swiperRef.current.swiper.slideNext()
      }}
    >
      next
    </Button>
    <div
      className='absolute bottom-0 right-0 m-4 bg-white/80 shadow-md rounded-full p-1 px-2 z-50'
    >
      {`${currentIndex+1}/${images.length}`}
    </div>
    </div>
   )
}

export  default ProductImageSlider
