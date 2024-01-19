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

  const [value, setValue] = useState<string>(defaultValue.toString()||"1")
 

  

  const increment = () => {
    const newValue=Number(value)+1
    if(newValue>maxValue){
      setValue(maxValue.toString())
      onChange(maxValue)
    }
    else if(newValue<=maxValue){
      setValue(newValue.toString())
      onChange(newValue)
    }
    else{
      setValue("1")
      onChange(1)
    }
  }
  const decrement = () => {
    const newValue=Number(value)-1
    if(newValue>=0){
      setValue(newValue.toString())
      onChange(newValue)
    }
    else{
      setValue("1")
      onChange(1)

    }
  }

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleOnBlur = (e:ChangeEvent<HTMLInputElement>) => {
   const newValue=Number(e.target.value)
   if(newValue&&newValue<=maxValue)return

    if(newValue&&newValue>maxValue){
      setValue(maxValue.toString())
      onChange(maxValue)
    }
    else{
      setValue("1")
      onChange(1)
    }

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
        disabled={Number(value)<=1}
      
        >
        <Minus strokeWidth={4} className='text-muted-foreground w-3'/>
      </Button>

      <Input
        type={"number"}
        className='text-center remove-arrow'
        value={value}
        onChange={handleInputChange}
        onBlur={handleOnBlur}
    
      
      />

       <Button
        type='button'
        variant={"outline"}
        aria-label='button-add-quantity'
        name='button-add-quantity'
        className={cn("p-0 w-full h-auto aspect-square")}
        onClick={increment}
        disabled={Number(value)>=maxValue}
     
        >
        <Plus strokeWidth={4} className='text-muted-foreground w-3'/>
      </Button>
    </fieldset>
   )
}




export {QuantityInput}


