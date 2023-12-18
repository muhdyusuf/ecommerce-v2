'use client'
import {FC, useState} from 'react'
import Image, { ImageProps } from 'next/image'
import { Skeleton } from './ui/skeleton'

type ImageWithSkeletonProps=ImageProps

const ImageWithSkeleton:FC<ImageWithSkeletonProps>=(props)=>{
    const [reveal, setReveal] = useState(false)

 return(
    <div
        className='relative z-10'
    >
        <Image
            {...props}
            onLoadingComplete={()=>setReveal(true)}
        />
        <Skeleton
            style={{
                width:props.width+"px",
                height:props.height+"px",
                visibility:reveal?"hidden":"visible"
            }}
            className={`absolute z-50 top-0 left-0 w-full h-full transition-opacity`}
        />

    </div>
)}

export default ImageWithSkeleton