'use server'

import prisma from "../../prisma/client"

export async function trackOrder(orderId:number,email:string) {
    try {
        const order=await prisma.order.findUnique({
            where:{
                id:orderId,
                email:email,
                status:"paid"
            },
            include:{
                cartItem:{
                    include:{
                        product:true
                    }
                }
            }
        })

        return order   
    }catch(error){
        return null
    }
    
}