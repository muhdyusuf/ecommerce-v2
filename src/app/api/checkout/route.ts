import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const corsHeader={
    "Acces_Control_Allow_Origin":"*",
    "Acces_Control_Allow_Method":"GET, POST, PUT, DELETE, OPTIONS",
    "Acces_Control_Allow_Header":"Content-Type,Authorization"
  }
  
  export async function OPTIONS(){
    return NextResponse.json({},{headers:corsHeader})
  }
  
  export async function POST(req:Request) {
    const {productId}=await req.json()

    if(!productId||productId.length.lenght===0){
        return new NextResponse("Product id Require",{status:400})
    }

    // get cart item from db
    const cartList:CartList=[]

    const lineItems:Stripe.Checkout.SessionCreateParams.LineItem[]=[]

    cartList.map(cartItem=>{
        lineItems.push({
            quantity:1,
            price_data:{
                currency:'MYR',
                product_data:{
                    name:cartItem.name,


                },
                unit_amount:cartItem.price
            }
        })
    })

    //store checkout data in db

    const session=await stripe.checkout.sessions.create({
        line_items:lineItems,
        mode:"payment",
        billing_address_collection:"required",
        phone_number_collection:{
            enabled:true
        },
        success_url:`${process.env.NEXT_PUBLIC_APP_URL}/cart?succes=1`,
        cancel_url:`${process.env.NEXT_PUBLIC_APP_URL}/cart?cancelled=1`,

    })
    return NextResponse.json({
        url:session.url
    },
    {
        headers:corsHeader
    })
    
  }