interface CartItem extends Product{
    quantity:number,
    selected?:boolean
}

type CartList=CartItem[]
  