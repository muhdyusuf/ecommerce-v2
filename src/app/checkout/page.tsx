'use server'
import { FC } from 'react'

interface pageProps {
    searchParams:{
      cartItem:string,
      quantity?:string
    }
}

const page: FC<pageProps> = async ({searchParams}) => {

    console.log(searchParams)
    const {cartItem,quantity}=searchParams
  
    let product:CartItem|undefined

    await fetch('https://fakestoreapi.com/products/'+cartItem)
    .then(res=>res.json())
    .then((res:Product)=>{
      if(!quantity||isNaN(parseInt(quantity))){
       product={...res,quantity:1} 
      }
      else{
        product={...res,quantity:parseInt(quantity)} 
      }
      
    })

  return (
  <>
    <main
      
    >
      {product&&(
      <div>
        <h2>
          {product.title}
        </h2>
      </div>
      )}
    </main>
    <section>
      <form>


      </form>

    </section>

  </>
   )
}

export default page