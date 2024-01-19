'use client'
import {useRouter,useSearchParams,usePathname} from 'next/navigation'
import { FC} from 'react'
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from './ui/button';
import qs from 'querystring'
import PriceRangeInput from './PriceRangeInput';
import RatingInput from './RatingInput';



 const filterSchema=z.object({
    rating:z.number().optional(),
    priceRange:z.object({
        minPrice:z.number().optional(),
        maxPrice:z.number().optional(),
    }).refine(data=>{
        if(data.maxPrice==undefined&&data.minPrice==undefined)return true
        if(!data?.maxPrice||(!data?.minPrice&&data.minPrice!==0))return false
        return (data.maxPrice>data.minPrice)
    },{
        message:"range is invalid",
    }).optional()
})
type FilterSchema=z.infer<typeof filterSchema>

interface FilterProps {
  close?:()=>void
}



const Filter: FC<FilterProps> = ({close=()=>{}}) => {

    const router=useRouter()
    const searchParams=useSearchParams()
    const url=process.env.NEXT_PUBLIC_APP_URL

    
   
    let urlFilterQuery

      const filterQuery:{[key:string]:any}={}
  
      searchParams.forEach((value:string,key:string)=>{
        if(parseInt(value)){
          filterQuery[key]=parseInt(value)
        }
   
      })
      const {minPrice,maxPrice,...rest}=filterQuery
      if(minPrice){
        urlFilterQuery={
          priceRange:{
            minPrice,
            maxPrice
          },
          ...rest
        }
      }
      else{
        urlFilterQuery={...rest}
      }
    

    


  
    const {    
        control,
        setValue,
        handleSubmit,
        reset,
        watch,
        trigger,
        formState: { errors },
      } = useForm<FilterSchema>({
        resolver: zodResolver(filterSchema),
        defaultValues:urlFilterQuery,
        values:{
          priceRange:{
            maxPrice:undefined,
            minPrice:undefined
          },
          rating:undefined
        },
      
      });

   
    
    const onSubmit:SubmitHandler<FilterSchema>=(data)=>{
   
      const search=searchParams.get("search")
  
    
      const {priceRange,...rest}=data
      const flatennedData={
        ...priceRange,...rest
      }

   
     if(Object.values(flatennedData).map((value)=>{
       if(typeof value==="number")return true
        if(!value)return false
        return true
      }).every(value=>value===false))return(router.push(`${url}/shop?search=${search}`))

     

     const filteredQueryParams = Object.fromEntries(
      Object.entries(flatennedData).filter(([_,value]) => value !== undefined)
     );

      const query=qs.stringify(filteredQueryParams)

    
      router.push(`${url}/shop?search=${search}&${query}`)
      close()

    }
  
      function resetFilter(){ 
        reset()
        router.push(`${url}/shop?search=${searchParams.get("search")}`)
      }

     
      

     
      
      

  return (
   
     <form
         className='flex flex-col gap-8 '
         onSubmit={handleSubmit(onSubmit)}
         onReset={resetFilter}
     >
        <fieldset
          className='flex flex-col gap-2'
        >
          <label>
            Price Range
          </label>
          {errors.priceRange&&<span>{errors.priceRange.message}</span>}
         <Controller
            name="priceRange"
            control={control}
            render={({field:{onChange,value}}) => (
              <PriceRangeInput
                value={{...value}}
                onChange={onChange}
                trigger={()=>{trigger("priceRange")}}
              />  
            )}
          /> 
        </fieldset>
       
        <fieldset>
          <label>
              Rating
          </label>
          <Controller
            name="rating"
            control={control}
            render={({field:{onChange,value}}) => (
              <RatingInput
                onChange={onChange}
                value={value}
                watch={()=>watch("rating")}
              />  
              )}
              /> 
        </fieldset>
       
      <fieldset
       className='flex flex-col gap-2'
      >
        <Button
          type='submit'
          >
          Apply Filter
        </Button>

        <Button
          type='reset'
          variant={"outline"}
          
          >
          Reset
        </Button>
      </fieldset>
     


     </form>
  
   )
}

export default Filter