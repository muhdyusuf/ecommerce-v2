import { create } from 'zustand'
import {persist,createJSONStorage} from 'zustand/middleware'

export interface CartItemLocal{
    id:number,
    name:string,
    price:number,
    quantity:number,
    stock:number,
    updatedAt:Date,
    imageUrls:string[],
    selected:boolean,
    category:string,
    size:string,
    colour:string
}

interface CartStore {
    cart:CartItemLocal[]
    addItem:(data:CartItemLocal)=>void
    removeItem:(id:number)=>void
    updateItem:(data:CartItemLocal)=>void
    removeAllItem:()=>void
        
}

const useCart = create(
    persist<CartStore>((set,get)=>({
        cart:[],
        addItem:(data:CartItemLocal)=>{
           const currentItems=get().cart
           const existingItems=currentItems.findIndex(item=>item.id===data.id)
           
           if(existingItems>=0){
            currentItems[existingItems].quantity+=data.quantity
            currentItems[existingItems].selected=true
            set({cart:currentItems})
            return
           }

           set({cart:[data,...currentItems]})
        },
        updateItem:(data:CartItemLocal)=>{
            const currentItems=get().cart
            const existingItems=currentItems.findIndex(item=>item.id===data.id)
            
            if(existingItems>=0){
                currentItems[existingItems]=data
                set({cart:currentItems})
            }
            
        },
        removeItem:(id)=>{
            const currentItem=get().cart
            const itemIndex=currentItem.findIndex(item=>item.id===id)
            currentItem.splice(itemIndex,1)
            set({cart:currentItem})
        },
        removeAllItem:()=>{
            set({cart:[]})
        },

    }),{
        name:"cartStorage",
        storage:createJSONStorage(()=>localStorage)
    })
)
export default useCart