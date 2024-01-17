'use server'
import Filter from '@/components/Filter'
import FilterSheet from '@/components/FilterSheet'
import ProductCart from '@/components/ProductCard'
import SorterInput from '@/components/SorterInput'
import { Metadata, ResolvingMetadata } from 'next'
import { FC } from 'react'
import prisma from '../../../../prisma/client'
import FeaturedProduct from '@/components/FeaturedProduct'
import { FileSearch2 } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'


interface SearchParams {
  rating?: string,
  search?: string,
  sortBy?: "priceAsc"|"priceDesc"|"ratingAsc"|"ratingDesc",
  minPrice?: string,
  maxPrice?: string,
  [key: string]: string | undefined
}

interface pageProps {
    searchParams:SearchParams,

}
export async function generateMetadata(
  { searchParams}: pageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  
  return {
    title: `${searchParams.search||""}-Ecommerce v2`,
    description:`search ${searchParams.search||""} in ecommerce v2 shop page`
  }
}

const page: FC<pageProps> = async ({searchParams}) => {
    const {search,rating,minPrice,maxPrice,sortBy}=searchParams

    console.log(searchParams)

    if(!search) return null

   
    const whereCondition = {
      name:{
        search:" "
      },
      rating:{
        rate:{
          gte:0
        }
      },
      price:{
        gte:0,
        lte:10000
      }
    };

    for (const key in searchParams) {
      if (searchParams[key] !== undefined && key==="search") {
        whereCondition["name"] = {
          search:search
        }
      }
      else if (searchParams[key] !== undefined && key==="rating") {
        whereCondition["rating"] = {
          rate:{gte:Number(searchParams[key])}
        };
      }
   
      else if (searchParams[key] !== undefined && key==="minPrice") {
        if(searchParams["maxPrice"]===undefined)return
        whereCondition["price"] = {
         gte:Number(minPrice),
         lte:Number(maxPrice)
      }}
    }
    type ModelOrderByInput = {
      price?: "asc" | "desc",
      rating?:{
        rate: "asc" | "desc"
      },
      _relevance?:{
        fields: ["name"],
            search:string,
            sort: "asc"
      }
    };
    
    const getOrderBy=(sortBy:string|undefined):ModelOrderByInput=>{
      if(sortBy=="ratingAsc")return({
          rating:{
            rate:"asc"
        }
      })
      else if(sortBy=="ratingDesc")return({
          rating:{
            rate:"desc"
        }
      })
      
      else if(sortBy=="priceAsc")return({
          price:"asc"
      })

      else if(sortBy=="priceDesc")return({
          price:"desc"
      })
      
      else return(
        {
          _relevance: {
            fields: ['name'],
            search: search,
            sort: 'asc'
          },
        })
     
      
    }

    const products=await prisma.product.findMany({
      where:{
        ...whereCondition,
      },
      orderBy:{
        ...getOrderBy(sortBy)
      },
      include:{
        colour:true,
        category:true,
        size:true,
      }
    })

    
  return (
  <>
   <main
    className='w-full p-1 md:container'
    >
    {products.length===0?(
      <div
        className='w-full flex flex-col justify-center items-center gap-6'
      >
        <div
          className='outline-dashed outline-6 outline-secondary rounded-md w-full h-auto md:aspect-[2/0.8] py-8 flex flex-col justify-center items-center text-center '
        >
          <FileSearch2 
            className='stroke-slate-300'
            size={60}
            strokeWidth={1}
            />
          <h2
            className='text-xl font-bold'
            >
            No result found
          </h2>
          <h3
            className='text-muted-foreground'
            >
            {rating||minPrice?"Try different or reset filter":"Try different or more general keywords"}
          </h3>
          {rating||minPrice?(
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/shop?search=${search}`}
              className={cn(buttonVariants())}
              >
              Reset Filter
            </Link>
          ):""}
        </div>
      </div>
      ):(
        <div
        className='grid md:grid-cols-4 w-full gap-4'
        >
        <aside
        className='hidden md:block'
        >
        <Filter />
        </aside>
      
        <div
        className='w-full col-span-3'
        >
        <div
        className='flex justify-between md:justify-end items-center'
        >
        <aside
        className='block md:hidden'
        >
        <FilterSheet/>
        </aside>
        
        
          <SorterInput/>
    
          </div>

          <div
          className='grid grid-cols-[repeat(auto-fit,min(50%,200px))] md:justify-start md:gap-4 w-full '
          >
          {products.map((product)=>(
            <ProductCart
            key={product.id}
            product={product}
            className='m-1'
            
            />
            ))}
            </div>
        </div>
      </div>
      )}
      </main>
      {products.length===0&&(
       <FeaturedProduct/>
      )}
    </>
  )
}
        
        
export default page
        
        
        
        