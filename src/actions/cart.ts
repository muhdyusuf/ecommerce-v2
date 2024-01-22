'use server'


import prisma from "../../prisma/client";


export async function validateLocalCartItems(cartList:{id:number,quantity:number,price:number}[]) {
    const products=await prisma.product.findMany({
        where:{
            id:{
                in:cartList.map(item=>item.id)
            }
        }
    })
    return cartList.map(cartItem=>{
     
        const product=products.find(product=>product.id===cartItem.id)
      
        if(product)return {
            ...cartItem,
            quantity:cartItem.quantity>product.stock?product.stock:cartItem.quantity<1?1:cartItem.quantity,
            stock:product.stock,
            price:product.price
        }
    }).filter(item=>item)
    
}