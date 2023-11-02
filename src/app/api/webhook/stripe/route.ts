import { headers } from "next/headers"
import Stripe from "stripe"

import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"

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

  if(event.type==="checkout.session.completed"){
    //update order status in db


    //update product in db
    
  }


  return new Response(null, { status: 200 })
}
