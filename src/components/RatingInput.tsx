import { ChangeEvent, FC, SyntheticEvent, useState } from 'react'
import { Button } from './ui/button'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingInputProps {
  onChange:(out:number|undefined)=>void
}



const RatingInput: FC<RatingInputProps> = ({onChange}) => {
    const [selected, setSelected] = useState<number|undefined>(undefined)
    
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
  return (
   <div>
       <Button
        className={cn(`hover:bg-slate-50 w-full flex justify-start gap-1 ${selected===5?"bg-slate-200":null}`)}
        variant={"ghost"}
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
        className={cn(`hover:bg-slate-50 w-full flex justify-start gap-1 ${selected===4?"bg-slate-200":null}`)}
        variant={"ghost"}
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
        className={cn(`hover:bg-slate-50 w-full flex justify-start gap-1 ${selected===3?"bg-slate-200":null}`)}
        variant={"ghost"}
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
        className={cn(`hover:bg-slate-50 w-full flex justify-start gap-1 ${selected===2?"bg-slate-200":null}`)}
        variant={"ghost"}
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
        className={cn(`hover:bg-slate-50 w-full flex justify-start gap-1 ${selected===1?"bg-slate-200":null}`)}
        variant={"ghost"}
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