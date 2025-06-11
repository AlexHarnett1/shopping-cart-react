import { useContext } from "react"
import { type CartItem } from "../types"
import CartItems from "./CartItems"
import { ThemeContext } from "../providers/ThemeProvider"
import { getSignFromCurrency } from "../utils/utils"

interface CartProps {
  cartItems: CartItem[]
  onCheckout: () => void
}

const Cart = ({ cartItems, onCheckout }: CartProps) => {
  const { currency } = useContext(ThemeContext)
  const currencySign = getSignFromCurrency(currency)

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {(cartItems.length === 0) ?
        <>
          <p>Your cart is empty</p>
          <p>Total: {currencySign}0</p>
        </> :
        <CartItems cartItems={cartItems} />
      }
      
      <button className="checkout" onClick={onCheckout}>Checkout</button>
    </div>)
  
}

export default Cart