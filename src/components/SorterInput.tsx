'use client'
import { FC, useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useSearchParams,useRouter} from 'next/navigation'
import qs from 'querystring'
import { Button } from './ui/button'
import {ChevronsUpDown} from 'lucide-react'
import { cn } from '@/lib/utils'
import { sortBySchema } from '@/lib/validations/urlquery'
import {z} from 'Zod'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
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

    const sortByArr=[
        {value:"relevant",label:"Relevant"},
        {value:"ratingAsc",label:"Rating: Low to high"},
        {value:"ratingDesc",label:"Rating: High to low"},
        {value:"priceAsc",label:"Price: Low to high"},
        {value:"priceDesc",label:"Price: High to low"},
    ]

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
      
    },[sorter])

    useEffect(()=>{
        const urlSorter=searchParams.get("sortBy")

        function validateSortBy(value:string){
            const validation=sortBySchema.safeParse(value)
            return validation.success
        }
        
        
        console.log(urlSorter)


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

    },[])

   
  return (
    // <Popover>
    //     <PopoverTrigger
    //         asChild
    //         className='w-max relative'
    //     >
    //         <Button
    //             variant={"outline"}
    //             className='flex gap-2 items-center'
    //         >
    //             {sorter.label}
    //             <ChevronsUpDown className='w-3' />
    //         </Button>
    //     </PopoverTrigger>
    //     <PopoverContent
    //         align='end'
    //         className={cn("p-1 w-max")}
    //     >
    //         <fieldset 
    //             className='flex flex-col  relative p-0 h-min'
    //         >
    //             {sortByArr.map(_sorter=>(
    //                 <label 
    //                 key={crypto.randomUUID()}
    //                 htmlFor="sortByRelevant"
    //                 className='w-full relative'
    //                 >
    //                     <input 
    //                         type="radio" 
    //                         name="sortBy" 
    //                         id="sortByRelevant"
    //                         className='peer opacity-0 absolute w-full h-full p-0'
    //                         defaultChecked={sorter.value===_sorter.value}
    //                         onChange={()=>setSorter(_sorter)}
    //                     />
    //                     <p
    //                         className='peer-checked:bg-slate-200 h-full p-1 rounded peer-hover:bg-slate-100'
    //                     >
    //                         {_sorter.label}
    //                     </p>
    //                 </label>
    //             ))}
 

             
             
              
              
    //         </fieldset>

    //     </PopoverContent>
    // </Popover>
    <Select
        
        value={sorter}
        onValueChange={(val)=>setSorter(val)}
    >
        <SelectTrigger className={"w-[180px]"}>
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