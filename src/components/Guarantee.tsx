import { Headphones, Package, Receipt, Send, Truck, Undo2, Wallet } from 'lucide-react'
import {FC} from 'react'

interface GuaranteeProps {
 
}

const Guarantee:FC<GuaranteeProps>=({})=>{
 return(
    <section
        className='md:container bg-secondary my-6'
    >
       <div
        className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm py-12 p-2'
       >
        <div
            className='flex items-center gap-2 md:justify-center'
        >
            <Send
                size={36}
                strokeWidth={1.5}
                className='h-9 w-auto aspect-square'
            />
            <div>
                <h5>
                    Free Shipping
                </h5>
                <p className='text-muted-foreground'>
                    Order Above Rm1000
                </p>
            </div>
        </div>
        <div
            className='flex items-center gap-2 md:justify-center'
        >
            <Wallet
                size={36}
                strokeWidth={1.5}
                className='h-9 w-auto aspect-square'
            />
            <div>
                <h5>
                    Money Back Guarantee
                </h5>
                <p className='text-muted-foreground'>
                    Guarantee Within 30 Days                
                </p>
            </div>
        </div>
        <div
            className='flex items-center gap-2 md:justify-center'
        >
            <Package
                size={36}
                strokeWidth={1.5}
                className='h-9 w-auto aspect-square'
            />
            <div>
                <h5>
                    Easy 30 Day Returns
                </h5>
                <p className='text-muted-foreground'>
                    Back Return in & Days
                </p>
            </div>
        </div>
        <div
            className='flex items-center gap-2 md:justify-center'
        >
            <Headphones
                size={36}
                strokeWidth={1.5}
                className='h-9 w-auto aspect-square'
            />
            <div>
                <h5>
                    Easy Online Support
                </h5>
                <p className='text-muted-foreground'>
                    Any Time Support
                </p>
            </div>
        </div>
        
      
       </div>
    </section>
)}

export default Guarantee