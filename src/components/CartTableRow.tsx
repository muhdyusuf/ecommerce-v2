import { FC, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import QuantityInput from './QuantityInput'

interface CartTableRowProps extends CartItem {}

const CartTableRow: FC<CartTableRowProps> = (cartItem) => {
 const [quantity, setQuantity] = useState<number>(cartItem.quantity||1)
  return (
    <TableRow>
        <TableCell className="font-medium">
            <input 
                type="checkbox"
                name=""
                id=""
                defaultChecked={cartItem.selected||false}
                />   
        </TableCell>
        <TableCell>
            {cartItem.name||cartItem.title}
        </TableCell>
        <TableCell
            className='hidden md:block'
        >
            {cartItem.price}
        </TableCell>
        <TableCell
            className='w-32 p-0'
        >
            <QuantityInput
                 value={quantity} 
                 setValue={setQuantity}
                className='w-full grid grid-cols-[1fr,2fr,1fr] gap-1 items-center'
            />
        </TableCell>
        <TableCell 
            className="text-right"
        >   
            <p>
            <span
                className='mr-1'
            >
                Rm
            </span>
            {((cartItem.price*100000)*(cartItem.quantity||1))/100000}
            </p>
        
        </TableCell>
    </TableRow>
   )
}

export default CartTableRow