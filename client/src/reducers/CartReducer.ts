import type { CartItem } from "../types"

type CartAction = 
  | { type: "GET_CART_ITEMS"; payload: CartItem[]; }
  | { type: "ADD_TO_CART"; payload: CartItem; }
  | { type: "CLEAR_CART"}


export const cartReducer = (prevState: CartItem[], action: CartAction) => {

  switch (action.type) {
    case "GET_CART_ITEMS":
      return action.payload;
    
    case "ADD_TO_CART":
      const index = prevState.findIndex(item => item._id === action.payload._id);
      if (index === -1) {
        return [...prevState, action.payload];
      } else {
        return (prevState.map(item =>
          item._id === action.payload._id ? action.payload : item
        ))
      }

    case "CLEAR_CART": 
      return []

    default:
      throw new Error("Incorrect action type given to cartReducer")

  }

  
}