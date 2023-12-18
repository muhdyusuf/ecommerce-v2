import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import prisma from "../../../../prisma/client"


const corsHeader={
    "Acces_Control_Allow_Origin":"*",
    "Acces_Control_Allow_Method":"GET, POST, PUT, DELETE, OPTIONS",
    "Acces_Control_Allow_Header":"Content-Type,Authorization"
  }
  
  export async function OPTIONS(){
    return NextResponse.json({},{headers:corsHeader})
    
  }
  
  export async function POST(req:Request) {
    interface CartItem{
        id:number,
        quantity:number
    }
    const {cartItems}=await req.json()
    console.log(cartItems)

    if(!cartItems||cartItems.length===0){
        return NextResponse.json("Product id Require",{status:400})
    }

 
    //validate product from db
    const products=await prisma.product.findMany({
        where:{
            id:{
                in:cartItems.map((item:CartItem)=>item.id)
            }
        },
        select:{
            id:true,
            price:true,
            stock:true
        }
    })

    const productsWithQuantity=products.map(product=>{
        const matchingItems=cartItems.find((item:CartItem)=>item.id===product.id)

        return {
              id: product.id,
              price: product.price,
              stock: product.stock,
              quantity: matchingItems.quantity,
        };
        

    })

    
    //create order
    const createdOrder = await prisma.order.create({
        data: {
          cartItem: {
              create: cartItems.map(({ id, quantity }:{id:number,quantity:number}) => ({
              quantity,
              product: { connect: { id } },
              user:{
                connect:{
                    id:1
                }
              }
              
            })),
          },
          total:productsWithQuantity.reduce((total,product)=>total+(product.price*product.quantity),0),
            status:"pending",
          user:{
            connect:{
                id:1
            }
          }
        },
        include: {
            cartItem:{
                include:{
                    product:true
                }
            }
        },
    });
    
    
    
    const lineItems:Stripe.Checkout.SessionCreateParams.LineItem[]=[]
    
    createdOrder.cartItem.map((cartItem)=>{
        return lineItems.push({
            quantity:cartItem.quantity,
            price_data:{
                currency:'MYR',
                product_data:{
                    name:cartItem.product.name,
                    images:[cartItem.product.imageUrls[0]] 
                },
                unit_amount:cartItem.product.price*100
            }
        })
    })
    
 
   
    const session=await stripe.checkout.sessions.create({
        line_items:lineItems,
        mode:"payment",
        billing_address_collection:"required",
        phone_number_collection:{
            enabled:true
        },
        shipping_address_collection:{
            allowed_countries:["MY"],
        
        },
        success_url:`${process.env.NEXT_PUBLIC_APP_URL}/checkout?succes=1`,
        cancel_url:`${process.env.NEXT_PUBLIC_APP_URL}/checkout?cancelled=1`,
        metadata:{
            orderId:createdOrder.id
        }
    })

    return NextResponse.json({
        url:session.url
    },{headers:corsHeader})
    
  }