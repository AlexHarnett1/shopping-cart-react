import type { CartItem } from "../types"
import Cart from "./Cart"

interface HeaderProps {
  cartItems: CartItem[]
  onCheckout: () => void
}


const Header = ({cartItems, onCheckout}: HeaderProps) => {
  return(
    <header>
      <h1>The Shop!</h1>
      <Cart onCheckout={onCheckout} cartItems={cartItems} />
    </header>
  )
}

export default Header