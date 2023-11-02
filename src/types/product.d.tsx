interface Product{
    id:number,
    title?:string,
    name:string
    price:number,
    description?:string,
    category?:string,
    image:string,
    rating:{
      rate:number,
      count:number
    }
  }

  type ProductList=Product[]