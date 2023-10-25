
import Filter from '@/components/Filter'
import ServerFilter from '@/components/ServerFilter'
import Sorter from '@/components/Sorter'
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

    
    

      let data:IProduct[]|[]=[]
      try {
        const response=await fetch('https://fakestoreapi.com/products')
        
        if(!response.ok){
          throw new Error("Failed")
        }
        data=await response.json()
        
      } catch (error) {
        
      }
      console.log(data)
    



    
    
  
  return (
   <main
    className='flex'
   >
    <section
      className='grid grid-cols-[250px,1fr]'
    >
      <aside
          className='hidden md:block'
          >
        <Filter />
        {/* <ServerFilter searchParams={searchParams} params={params}/> */}

          
      </aside>
      {/* <div
        className='overflow-visible' 
      >
        <Sorter/>
        <select name="" id="">
          <option value="asda">
            asdasda
          </option>
        </select>
      </div> */}

        <div
          className='grid grid-cols-4 gap-8'
          >
          {data.map((product:IProduct)=>(
            <div
              key={crypto.randomUUID()}
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
      </section>
   </main>
   )
}

export default page



