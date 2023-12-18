
import { headers } from "next/headers"
import Stripe from "stripe"

import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"
import prisma from "../../../../../prisma/client"
import CartItem from "@/components/CartItem"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const address=session?.customer_details?.address
  const addressComponent=[
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ]

  const addressString=addressComponent.filter(component=>component!==null).join(", ")

  try{
    if(event.type==="checkout.session.completed"){
      //orderId=session?.metadata?.orderId
      //update order status in db
      const order=await prisma.order.update({
        where:{
          id:Number(session?.metadata?.orderId)
      },
      data:{
        status:"paid",
        address:addressString,
        phone:session?.customer_details?.phone||"",
        email:session?.customer_email||"",
        name:session?.customer_details?.name||""
      },
      include:{
        cartItem:true
      }
    })
    
    //update product in db
    Promise.all(order.cartItem.map(product=>{
      const {productId,quantity}=product
      return prisma.product.update({
        where:{
          id:productId,
        },
        data:{
          stock:{
            decrement:quantity
          }
        }
      })
    }))
    await prisma.cartItem.deleteMany({
      where:{
        id:{
          in:order.cartItem.map(item=>item.id)
        }
      }
    })
    
    
  }
  
  }catch(error){
    return NextResponse.json("error completing order",{status:400})
  }
  
  return new Response(null, { status: 200 })
}
