'use client'
import { FC, useEffect, useMemo, useState } from 'react'

import { useSearchParams,useRouter} from 'next/navigation'
import qs from 'querystring'

import { sortBySchema } from '@/lib/validations/urlquery'
import {z} from 'zod'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
interface SorterInputProps {
  
}

type SortByValue=z.infer <typeof sortBySchema>

const SorterInput: FC<SorterInputProps> = ({}) => {
    const [sorter, setSorter] = useState<SortByValue>("relevant")
    const url=process.env.NEXT_PUBLIC_APP_URL
    const searchParams=useSearchParams()
    const router=useRouter()

    const sortByArr=useMemo(()=>[
        {value:"relevant",label:"Relevant"},
        {value:"ratingAsc",label:"Rating: Low to high"},
        {value:"ratingDesc",label:"Rating: High to low"},
        {value:"priceAsc",label:"Price: Low to high"},
        {value:"priceDesc",label:"Price: High to low"},
    ],[])

    // type SortByValue = typeof sortByArr[number];

    useEffect(()=>{
        const urlSorter=searchParams.get("sortBy")
        const params = Object.fromEntries(searchParams.entries());
        
        if(!urlSorter&&sorter!=="relevant"){
            params.sortBy=sorter
            router.push(`${url}/shop?${ qs.stringify(params)}`)
        }
        else if(urlSorter&&sorter==="relevant"){
            delete params.sortBy
            router.push(`${url}/shop?${qs.stringify(params)}`)
        }
        else if(urlSorter&&sorter!=="relevant"){
            params.sortBy=sorter
            router.push(`${url}/shop?${qs.stringify(params)}`)
        }
        else return
      
    },[router,searchParams,url,sorter])


    useEffect(()=>{
        const urlSorter=searchParams.get("sortBy")

        function validateSortBy(value:string){
            const validation=sortBySchema.safeParse(value)
            return validation.success
        }
        
        if(urlSorter&&validateSortBy(urlSorter)){
            console.log(urlSorter)
            let _sorter
            sortByArr.forEach(sort=>{
                if(sort.value===urlSorter){
                    _sorter=sort.value
                }
            })

            if(_sorter){
                setSorter(_sorter)
            } 
        }
        else{
            setSorter(sortByArr[0].value)
        }

    },[sortByArr,searchParams])

   
  return (
 
    <Select
        
        value={sorter}
        onValueChange={(val)=>setSorter(val)}
    >
        <SelectTrigger className={"w-[180px] mb-4"}>
            <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
            
            
            {sortByArr.map(sortBy=>(
                <SelectItem 
                    key={JSON.stringify(sortBy)}
                    value={sortBy.value}
                    className='pointer-event-none'
                >
                    {sortBy.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
   )
}

export default SorterInput