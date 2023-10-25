import { FC, ReactNode } from 'react'
import { Button } from './ui/button'
import { Minus, Plus } from 'lucide-react'
import { Input } from './ui/input'

interface QuantityInputProps extends React.HTMLAttributes<HTMLFieldSetElement>{
  value:number
  setValue:(val:number)=>void
}

const QuantityInput: FC<QuantityInputProps> = ({value,setValue,...props}) => {
  return (
    <fieldset
      {...props}
    >
        <Button
          aria-label='button-deduct-quantity'
          name='button-deduct-quantity'
          className='p-0 w-full h-auto aspect-square'
          onClick={()=>setValue(value===1?value:value-1)}
          >
          <Minus />
        </Button>
        <Input
          type={"number"}
          className='text-center remove-arrow'
          value={value}
          onChange={(e)=>{
            const value=parseInt(e.target.value)
            if(value<=0)return
            setValue(value)
          }}
          onBlur={(e)=>{
            const value=parseInt(e.target.value)
            if(isNaN(value)){
              setValue(1)
            }
          }}
          
          
          />
        <Button
          aria-label='button-add-quantity'
          name='button-add-quantity'
          className='p-0 w-full h-auto aspect-square'
          onClick={()=>setValue(value+1)}
          >
          <Plus/>
        </Button>
    </fieldset>
   )
}

export default QuantityInput



interface QuantityInputAddTriggerProps {
  children:ReactNode,
  className:string
}

// const QuantityInputAddTrigger: FC<QuantityInputAddTriggerProps> = ({children,className}) => {
//   return (
//   <Button
//     aria-label='button-add-quantity'
//     name='button-add-quantity'
//     className='p-0 w-full h-auto aspect-square'
//     onClick={()=>setValue(value+1)}
//     >
//     <Plus/>
//   </Button>
//    )
// }

