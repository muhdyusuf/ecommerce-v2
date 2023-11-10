'use client'
import { FC,createContext, useReducer, useContext, ReactNode, useEffect, useState } from 'react';
import { CART_ACTION } from './contextAction';
import { stat } from 'fs';
import { toast } from '@/components/ui/use-toast';

type CartContextType = {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
};

type CartAction = { type:string; payload:CartItem };

const CartContext = createContext<CartContextType|undefined>(undefined);


const cartReducer = (state: CartList, action: CartAction) => {
  let _state=[...state]
  const existingItemIndex = _state.findIndex((cartItem) => cartItem.id === action.payload.id);

    switch (action.type) {
      case CART_ACTION.ADD_ITEM:
        const {quantity,...rest} = action.payload;
        
        if (existingItemIndex !== -1) {
          _state[existingItemIndex].quantity += quantity
          _state[existingItemIndex].modifiedAt=Date.now()
          
        } else {
          _state.push({quantity,...rest,modifiedAt:Date.now()});
      }
      break;
      
      case CART_ACTION.DELETE_ITEM:
        if(existingItemIndex!== -1){
          _state.splice(existingItemIndex,1)
        }
        break;
        
    case CART_ACTION.UPDATE_ITEM:{
      if(existingItemIndex !== -1){
        _state[existingItemIndex]={...action.payload}
      }
    }
    break;
    default:
      return _state;
    }
  

  _state.sort((a,b)=>{
    if(a.modifiedAt<b.modifiedAt)return 1
    else if(a.modifiedAt>b.modifiedAt)return -1
    else return 0
  })


  return _state
};





const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  
  const cartListFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');

  const [cart, dispatch] = useReducer(cartReducer,cartListFromLocalStorage);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
