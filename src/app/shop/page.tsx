
import Filter from '@/components/Filter'
import ServerFilter from '@/components/ServerFilter'
import Sorter from '@/components/Sorter'
import SorterInput from '@/components/SorterInput'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface IProduct{
  id:number,
  title:string,
  price:number,
  description:string,
  category:string,
  image:string,
  rating:{
    rate:number,
    count:number
  }
}

interface pageProps {
    searchParams:string
    params:string
}

const page: FC<pageProps> = async ({searchParams,params}) => {
    const query=searchParams
    console.log(query)

    
    

      let data:IProduct[]|[]=[]
      try {
        const response=await fetch('https://fakestoreapi.com/products')
        
        if(!response.ok){
          throw new Error("Failed")
        }
        data=await response.json()
        
      } catch (error) {
        
      }

    



    
    
  
  return (
   <main
    className='min-h-screen-minus-navbar md:container'
   >
    <div
      className='grid grid-cols-[250px,1fr] w-full'
    >
      <aside
          className='hidden md:block'
          >
        <Filter />
        {/* <ServerFilter searchParams={searchParams} params={params}/> */}

          
      </aside>
      <div>
      <div 
      className='w-full flex justify-end'>
        <SorterInput/>
      </div>
        <div
          className='flex flex-wrap justify-between'
          >
          {data.map((product:IProduct)=>(
            <div
              key={crypto.randomUUID()}
              className='w-[min(100%,300px)]'
            >
              <div
                className='p-4'
                >
                <Image
                  width={1000}
                  height={1000}
                  alt='image'
                  className='aspect-square object-contain'
                  src={product.image}
                  />
                
              </div>
              <Link
                href={`/product/${product.id}`}
              >
                {product.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      </div>
   </main>
   )
}

export default page



