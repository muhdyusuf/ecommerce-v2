import React, { ChangeEvent, FC, FormEvent, HTMLAttributes, ReactElement, ReactNode, SyntheticEvent, cloneElement, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Minus, Plus } from 'lucide-react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'



interface QuantityInputProps{
  children?:ReactNode,
  defaultValue:number,
  onChange:(val:number)=>void,
  className?:string
}



const QuantityInput: FC<QuantityInputProps> = ({children,defaultValue,onChange,...props}) => {

  const [value, setValue] = useState<number|"">(defaultValue||1)


  const increment = () => {
    
    const newValue = value?value + 1:1
    if(newValue>=1000000)return
    setValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }
  const decrement = () => {
    if (typeof value==="number" && value > 1) {
      const newValue = value - 1
      setValue(newValue)
      if (onChange) {
        onChange(newValue)
      }
    }
  }

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    if(newValue>=1000000)return
    if (!isNaN(newValue)) {
      setValue(newValue)
      if (onChange) {
        onChange(newValue)
      }
    }
    else{
      setValue("")
  
    }

  }

  return (
    <fieldset
      {...props}
    >
      <Button
        type='button'
        aria-label='button-deduct-quantity'
        name='button-deduct-quantity'
        className={cn("p-0 w-full h-auto aspect-square")}
        onClick={decrement}
      
        >
        <Minus/>
      </Button>

      <Input
        type={"number"}
        className='text-center remove-arrow'
        value={value}
        onChange={handleInputChange}
        onBlur={(e)=>{
          const value=parseInt(e.target.value)
          if(!value||value===0){
            setValue(1)
          }
        }}
      
      />

       <Button
        type='button'
        aria-label='button-add-quantity'
        name='button-add-quantity'
        className={cn("p-0 w-full h-auto aspect-square")}
        onClick={increment}
     
        >
        <Plus/>
      </Button>
    </fieldset>
   )
}




export {QuantityInput}


