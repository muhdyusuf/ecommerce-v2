import page from '@/app/cart/page'
import { type } from 'os'
import { FC, useEffect, useRef, useState } from 'react'
import { Input} from './ui/input'
import { Button } from './ui/button'
import { Minus } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

type InputValue={
    minPrice?:number,
    maxPrice?:number,
}

interface PriceRangeInputProps {
  onChange:({}:InputValue)=>void,
  value:InputValue,
  watch:(val:string)=>void

}



const PriceRangeInput: FC<PriceRangeInputProps> = ({value,onChange,watch})=>{
    const [inputValue, setInputValue] = useState<InputValue>({...value})

    useEffect(()=>{
        setInputValue({...value})
    },[watch])
  

  return (
    <div
        className='grid grid-cols-[5fr,1rem,5fr] gap-y-2'
    >
    <Input  
        className='remove-arrow'
        placeholder='min'
        type="number" 
        defaultValue={inputValue.minPrice} 
        onChange={(e)=>{
            if(isNaN(parseInt(e.target.value))&&e.target.value!="")return
            setInputValue(val=>({
                ...val,
                minPrice:isNaN(parseInt(e.target.value))?undefined:parseInt(e.target.value)
            }))
        }}
       
        />
    <Minus 
        strokeWidth={1}
        className='m-auto stroke-slate-500 w-full'
    />
    <Input 
        className='remove-arrow'
        placeholder='max'
        type="number" 
        defaultValue={inputValue.maxPrice}
        onChange={(e)=>{
            if(isNaN(parseInt(e.target.value))&&e.target.value!=="")return
            setInputValue(val=>({
                ...val,
                maxPrice:isNaN(parseInt(e.target.value))?undefined:parseInt(e.target.value)
            }))
        }}
    />
    <Button
        type='button'
        variant={"outline"}
        className='col-span-full'
        onClick={(e)=>{
        return onChange(inputValue)
    }}
    >Apply</Button>
    </div>
   )
}

export default PriceRangeInput