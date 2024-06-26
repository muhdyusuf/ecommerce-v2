import { useToast } from '@/components/ui/use-toast'
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
    selectAll:()=>void
    unSelectAll:()=>void
    
        
}

const useCart = create(
    persist<CartStore>((set,get)=>({
        cart:[],
        addItem:(data:CartItemLocal)=>{
           const currentItems=get().cart
           const itemIndex=currentItems.findIndex(item=>item.id===data.id)
           
           if(itemIndex>=0){
            const cartItem=currentItems[itemIndex]
            const total=cartItem.quantity+data.quantity
            if(total<=cartItem.quantity){
                currentItems[itemIndex].quantity=total
            }
            else{
                currentItems[itemIndex].quantity=cartItem.stock
            }
            currentItems[itemIndex].selected=true
            set({cart:currentItems})
           }
           else{
               set({cart:[data,...currentItems]})
           }
           
        },
        updateItem:(data:CartItemLocal)=>{
            const currentItems=get().cart
            const existingItems=currentItems.findIndex(item=>item.id===data.id)
            
            if(existingItems>=0){
                currentItems[existingItems]=data
                set({cart:[...currentItems]})
            }
            
        },
        selectAll:()=>{
            const currentItems=get().cart
            set({cart:currentItems.map(item=>({...item,selected:true}))})
        },
        unSelectAll:()=>{
            const currentItems=get().cart
            set({cart:currentItems.map(item=>({...item,selected:false}))})
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