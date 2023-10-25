import { FC} from 'react'
import { Input} from './ui/input'
import { Button } from './ui/button'
import { Minus } from 'lucide-react'

type InputValue={
    minPrice?:number,
    maxPrice?:number,
}

interface PriceRangeInputProps {
  onChange:({}:InputValue)=>void,
  value:InputValue,
  watch:(val:string)=>void
  trigger:()=>void

}



const PriceRangeInput: FC<PriceRangeInputProps> = (
    {value,onChange,watch,trigger})=>{
   

  return (
    <div
        className='grid grid-cols-[5fr,1rem,5fr] gap-y-2'
    >
    <Input  
        className='remove-arrow'
        placeholder='min'
        type="number" 
        defaultValue={value.minPrice} 
        onChange={(e)=>{
            if(isNaN(parseInt(e.target.value))&&e.target.value!="")return
            onChange({
                minPrice:isNaN(parseInt(e.target.value))?undefined:parseInt(e.target.value),
                maxPrice:value.maxPrice
            })
           
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
        defaultValue={value.maxPrice}
        onChange={(e)=>{
            if(isNaN(parseInt(e.target.value))&&e.target.value!=="")return
            onChange({
                maxPrice:isNaN(parseInt(e.target.value))?undefined:parseInt(e.target.value),
                minPrice:value.minPrice
            })
         
        }}
    />
    <Button
        type='button'
        variant={"outline"}
        className='col-span-full'
        onClick={trigger}

    
    >Apply</Button>
    </div>
   )
}

export default PriceRangeInput