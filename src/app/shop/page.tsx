
import Filter from '@/components/Filter'
import ServerFilter from '@/components/ServerFilter'
import Sorter from '@/components/Sorter'
import Image from 'next/image'
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

    
    

    async function getProducts(){
      let data:IProduct[]|[]=[]
        return(fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(res=>data=res))
    }

    const data:[]=[]
    
  
  return (
   <main
    className='flex md:container h-[220vh]'
   >
    <section
      className='grid grid-cols-[250px,1fr]'
    >
      <aside
          className=''
          >
        <Filter />
        {/* <ServerFilter searchParams={searchParams} params={params}/> */}

          
      </aside>
      <div
        className='overflow-visible' 
      >
        <Sorter/>
        <select name="" id="">
          <option value="asda">
            asdasda
          </option>
        </select>
      </div>

        <div
          className='grid grid-cols-4 gap-8'
          >
          {data.map((product:IProduct)=>(
            <div
              className='p-4'
            >
              <Image
                width={1000}
                height={1000}
                alt='image'
                src={product.image}
                />
              
            </div>
          ))}
        </div>
      </section>
   </main>
   )
}

export default page



