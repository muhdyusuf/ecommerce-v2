'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'

interface SorterProps {
  
}

const Sorter: FC<SorterProps> = ({}) => {
    const router=useRouter()
    const searchParams=useSearchParams()

    function handleSorter(selectedvalue:string){
        const url=window.location.origin
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        if(params.sort&&params.sort===selectedvalue)return 
        params.sort=selectedvalue

        const fullUrl=new URLSearchParams(params)

        const sorter=["priceAscending","priceDesscending","ratingAscending","ratingDescending"]

        if(sorter.includes(selectedvalue)){
            router.push(`${url}/shop?${fullUrl}`)
        }

        
    }

  return (
    <div>
        
    </div>
   )
}

export default Sorter