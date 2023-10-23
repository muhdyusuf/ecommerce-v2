
import Filter from '@/components/Filter'
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
}

const page: FC<pageProps> = async ({searchParams}) => {
    const {search}=searchParams
    console.log(search,searchParams)



    async function getProducts(){
      let data:IProduct[]|[]=[]
        return(fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(res=>data=res))
    }

    const data:[]=[]
    
  
  return (
   <main
    className='flex md:container w-full pt-32'
   >
     <aside
        className='w-36 bg-bue-100 h-screen '
     >
      <Filter/>
        
     </aside>
     <div
      className='grid grid-cols-4 gap-8'
     >
      {data.map((product:IProduct)=>(
        <div
          className='p-4 bg-blue-100'
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
   </main>
   )
}

export default page



