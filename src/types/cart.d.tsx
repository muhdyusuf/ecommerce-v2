interface CartItem extends Product{
    quantity:number,
    selected?:boolean
    modifiedAt:number
}

type CartList=CartItem[]
  