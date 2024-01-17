import { CartItem,Order, Product } from "@prisma/client";

interface CartItemProduct extends CartItem{
    product:Product
}

interface OrderCartItemProduct extends Order{
    cartItem:CartItemProduct[]
}