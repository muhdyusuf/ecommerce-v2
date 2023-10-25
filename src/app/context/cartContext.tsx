'use client'
import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { CART_ACTION } from './contextAction';
import { stat } from 'fs';

type CartContextType = {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
};

type CartAction = { type:string; payload:CartItem };

const CartContext = createContext<CartContextType | undefined>(undefined);


const cartReducer = (state: CartItem[], action: CartAction) => {
  
  let _action=action 





  switch (action.type) {
    case CART_ACTION.ADD_ITEM:{
      let addedCartItem

      if(state.some(cartItem=>cartItem.id===action.payload.id)){
        addedCartItem = state.map(cartItem => {
          if (cartItem.id === action.payload.id) {
            return { ...cartItem,quantity:cartItem.quantity+=action.payload.quantity};
          }
          return cartItem;
        });
      }
      else{
        addedCartItem=[...state,action.payload]
      }
      return [...addedCartItem];
    }

    case CART_ACTION.UPDATE_ITEM:{
      const updatedCartItem = state.map(cartItem => {
        if (cartItem.id === action.payload.id) {
          return { ...cartItem, ...action.payload };
        }
        return cartItem;
      });
      return [...updatedCartItem];
    }

    case CART_ACTION.ADD_ITEM_QUANTITY:{
      const updatedCartItem = state.map(cartItem => {
          if (cartItem.id === action.payload.id) {
            return { ...cartItem,quantity:cartItem.quantity+=action.payload.quantity};
          }
          return cartItem;
        });
      
      return [...updatedCartItem];
    }

    case CART_ACTION.DEDUCT_ITEM_QUANTITY:{
      const updatedCartItem = state.map(cartItem => {
        if (cartItem.id === action.payload.id) {
          return { ...cartItem,quantity:cartItem.quantity-=action.payload.quantity};
        }
        return cartItem;
      });

      return [...updatedCartItem];
    }
  

    default:
      return state;
  }
};




const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cartList:CartList=JSON.parse(storedCart)
        console.log(cartList)
      cartList.map(cartItem=>{
        dispatch({ type:CART_ACTION.ADD_ITEM, payload:cartItem});
      })
      
    }
  }, []);

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
