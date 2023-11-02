'use client'
import { FC,createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { CART_ACTION } from './contextAction';
import { stat } from 'fs';

type CartContextType = {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
};

type CartAction = { type:string; payload:CartItem };

const CartContext = createContext<CartContextType|null>(null);


const cartReducer = (state: CartItem[], action: CartAction) => {
  let _state=[...state]

  switch (action.type) {
    case CART_ACTION.ADD_ITEM:
      const {quantity,...rest} = action.payload;
      const existingItemIndex = _state.findIndex((cartItem) => cartItem.id === action.payload.id);

      if (existingItemIndex !== -1) {
        _state[existingItemIndex].quantity += quantity
        _state[existingItemIndex].modifiedAt=Date.now()
        
      } else {
        _state.push({quantity,...rest,modifiedAt:Date.now()});
      }
    break;

    case CART_ACTION.DELETE_ITEM:
      _state = state.filter((cartItem) => cartItem.id !== action.payload.id);
    break;

    case CART_ACTION.UPDATE_ITEM:{
      _state = state.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          return action.payload;
        }
        return cartItem;
      })
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

  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

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
