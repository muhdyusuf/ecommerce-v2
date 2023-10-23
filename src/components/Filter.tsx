'use client'
import { useRouter,useSearchParams } from 'next/navigation'
import { FC } from 'react'
import { z } from "Zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from './ui/input';
import { Button } from './ui/button';
import qs from 'querystring'
import PriceRangeInput from './PriceRangeInput';
import RatingInput from './RatingInput';
import { useRouter as usePagesRouter } from 'next/router';

interface FilterProps {
  
}
 const filterSchema=z.object({
    rating:z.number().optional(),
    priceRange:z.object({
        minPrice:z.number().optional(),
        maxPrice:z.number().optional(),
    }).refine(data=>{
        if(data.maxPrice==undefined&&data.minPrice==undefined)return true
        if(!data?.maxPrice||!data?.minPrice)return false
        return (data.maxPrice>data.minPrice)
    },{
        message:"range is invalid",
    }).optional()
})





const Filter: FC<FilterProps> = ({}) => {
    const pagesRouter=usePagesRouter()
    const router=useRouter()
    const searchParams=useSearchParams()
    
    type FilterSchema=z.infer<typeof filterSchema>
    const {
        
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FilterSchema>({
        resolver: zodResolver(filterSchema),
      });
      
    console.log(errors)
    
    const onSubmit:SubmitHandler<FilterSchema>=(data)=>{
      if(Object.values(data).every(value=>!value))return

        const current=qs.parse(searchParams.toString())

        const query={
            ...current,
            ...data,
            minPrice:data?.priceRange?.minPrice||null,
            maxPrice:data?.priceRange?.maxPrice||null
        }
        query.hasOwnProperty("priceRange")&&delete query.priceRange
        console.log(query)

     
      


       
      }
    
      
      function resetFilter(){ 
        console.log(filterSchema.parse({
            minPrice:"sada",
            maxPrice:"asda"
        }))
        router.push(`/shop?search=${searchParams.get("search")}`)
      }
      
   
     
      
      

  return (
   <div
    className=' text-black '
   >
     <form
         className='flex flex-col'
         onSubmit={handleSubmit(onSubmit)}
         onReset={resetFilter}
     >
        {errors.priceRange&&<span>{errors.priceRange.message}</span>}
         <Controller
            name="priceRange"
            control={control}
            render={({field:{onChange,value}}) => (
              <PriceRangeInput
                value={{...value}}
                onChange={onChange}
              />  
            )}
          /> 

          <label htmlFor="rating">
            <select name="" id=""></select>

          </label>
          <Controller
            name="rating"
            control={control}
            render={({field:{onChange}}) => (
              <RatingInput
                onChange={onChange}
              />  
            )}
          /> 
      <Button
        type='submit'
        variant="secondary"
      >
        123
      </Button>
     


     </form>
   </div>)
}

export default Filter