import { Receipt, Truck, Undo2 } from 'lucide-react'
import {FC} from 'react'

interface GuaranteeProps {
 
}

const Guarantee:FC<GuaranteeProps>=({})=>{
 return(
    <section
        className='md:container'
    >
       <div
        className='flex justify-center gap-6'
       >
        <div
            className='flex flex-col justify-center items-center'
        >
            <Truck 
                size={30}
                className='stroke-primary w-min'
            />
            <p>Free Shipping</p>
        </div>
        <div
            className='flex flex-col justify-center items-center'
        >
            <Undo2 
                size={30}
                className='stroke-primary w-min'
            />
            <p>Free Return</p>
        </div>
        <div
            className='flex flex-col justify-center items-center'
        >
            <Receipt 
                size={30}
                className='stroke-primary w-min'
            />
            <p>Best Price</p>
        </div>
      
       </div>
    </section>
)}

export default Guarantee