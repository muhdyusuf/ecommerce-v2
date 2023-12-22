import React, { ChangeEvent, FC, FormEvent, HTMLAttributes, ReactElement, ReactNode, SyntheticEvent, cloneElement, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Minus, Plus } from 'lucide-react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'



interface QuantityInputProps{
  children?:ReactNode,
  defaultValue:number,
  maxValue:number
  onChange:(val:number)=>void,
  className?:string
}



const QuantityInput: FC<QuantityInputProps> = ({children,defaultValue=1,onChange,className,maxValue}) => {

  const [value, setValue] = useState<number|undefined>(defaultValue||1)

  useEffect(()=>{
    if(value===undefined){
      setValue(1)
      onChange(1)
    }
    else if(value>maxValue){
      setValue(maxValue)
      onChange(maxValue)
    }
    else{
      onChange(value)
    }

  },[value])

  const increment = () => {
    
    const newValue = value?value + 1:1
    if(newValue>=1000000)return
    setValue(newValue)

  }
  const decrement = () => {
    if (typeof value==="number" && value > 1) {
      const newValue = value - 1
      setValue(newValue)
 
    }
  }

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    setValue(newValue)

  }

  return (
    <fieldset
      className={className}
    >
      <Button
        type='button'
        variant={"outline"}
        aria-label='button-deduct-quantity'
        name='button-deduct-quantity'
        className={cn("p-0 w-full h-auto aspect-square")}
        onClick={decrement}
      
        >
        <Minus strokeWidth={4} className='text-muted-foreground w-3'/>
      </Button>

      <Input
        type={"number"}
        className='text-center remove-arrow'
        value={value}
        onChange={handleInputChange}
    
      
      />

       <Button
        type='button'
        variant={"outline"}
        aria-label='button-add-quantity'
        name='button-add-quantity'
        className={cn("p-0 w-full h-auto aspect-square")}
        onClick={increment}
     
        >
        <Plus strokeWidth={4} className='text-muted-foreground w-3'/>
      </Button>
    </fieldset>
   )
}




export {QuantityInput}


