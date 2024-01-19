import { CartItem,Category,Colour,Order, Product, Size } from "@prisma/client";

interface CartItemProduct extends CartItem{
    product:Product
}

interface OrderCartItemProduct extends Order{
    cartItem:CartItemProduct[]
}

interface ProductColourSizeCategory extends Product{
    size:Size,
    colour:Colour,
    category:Category
}