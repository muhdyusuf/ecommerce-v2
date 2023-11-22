import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const PRICE_MULTIPLIER=100000

export function formatPrice(
  price:number,
  options:{
    currency?:"MYR"|"IDR"|"THB"|"PHP",
    notation?:Intl.NumberFormatOptions["notation"]
  }={}
){
  const {currency="MYR",notation="standard"}=options

  return new Intl.NumberFormat("en-GB",{
    currencyDisplay:"narrowSymbol",
    style:"currency",
    currency,
    notation,
    minimumFractionDigits:2,
    maximumFractionDigits:2
  }).format(price)

}

