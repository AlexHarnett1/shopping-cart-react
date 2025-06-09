import { type CartItem } from "../types"
import CartItems from "./CartItems"

interface CartProps {
  cartItems: CartItem[]
  onCheckout: () => void
}

const Cart = ({ cartItems, onCheckout }: CartProps) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {(cartItems.length === 0) ?
        <>
          <p>Your cart is empty</p>
          <p>Total: $0</p>
        </> :
        <CartItems cartItems={cartItems} />
      }
      
      <button className="checkout" onClick={onCheckout}>Checkout</button>
    </div>)
  
}

export default Cart