import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingInputProps {
  onChange:(out:number|undefined)=>void,
  value:number|undefined
  watch:(val:string)=>void
}



const RatingInput: FC<RatingInputProps> = ({onChange,value,watch}) => {
    const [selected, setSelected] = useState<number|undefined>(value)
    
    function handleSelected(value:number){
        if(selected===value){
            setSelected(undefined)
            onChange(undefined)
        }
        else{
            setSelected(value)
            onChange(value)
        }    
        
    }
    useEffect(()=>{
        setSelected(value)
    },[watch])
  return (
   <div>
       <Button
        id='filter-select-5star-rating'
        aria-label='Select 5 star rating rating filter'
        className={cn(`hover:bg-slate-200 w-full flex justify-start gap-1 ${selected===5?"bg-slate-200":"bg-transparent"}`)}
        variant={"ghost"}
        type='button'
        onClick={()=>handleSelected(5)}
       >
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />

       </Button>

       <Button
        id='filter-select-4star-rating'
        aria-label='Select 4 star rating rating filter'
        className={cn(`hover:bg-slate-200 w-full flex justify-start gap-1 ${selected===4?"bg-slate-200":"bg-transparent"}`)}
        variant={"ghost"}
        type='button'
        onClick={()=>handleSelected(4)}
       >
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />

       </Button>

       <Button
        id='filter-select-3star-rating'
        aria-label='Select 3 star rating rating filter'
        className={cn(`hover:bg-slate-200 w-full flex justify-start gap-1 ${selected===3?"bg-slate-200":"bg-transparent"}`)}
        variant={"ghost"}
        type='button'
        onClick={()=>handleSelected(3)}
       >
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />

       </Button>

       <Button
        id='filter-select-2star-rating'
        aria-label='Select 2 star rating rating filter'
        className={cn(`hover:bg-slate-200 w-full flex justify-start gap-1 ${selected===2?"bg-slate-200":"bg-transparent"}`)}
        variant={"ghost"}
        type='button'
        onClick={()=>handleSelected(2)}
       >
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />
      

       </Button>

       <Button
        id='filter-select-1star-rating'
        aria-label='Select 1 star rating rating filter'
        className={cn(`hover:bg-slate-200 w-full flex justify-start gap-1 ${selected===1?"bg-slate-200":"bg-transparent"}`)}
        variant={"ghost"}
        type='button'
        onClick={()=>handleSelected(1)}
       >
        <Star
            className='w-4 aspect-square fill-yellow-500 stroke-yellow-500'
        />
       

       </Button>
  
       
   </div>
   )
}

export default RatingInput