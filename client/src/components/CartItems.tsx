import { type CartItem as CartItemType } from "../types"
import CartItem from "./CartItem"

interface CartItemsProps {
  cartItems: CartItemType[]
}

const CartItems = ({ cartItems }: CartItemsProps) => {
  const calculateTotal = () => {
    return cartItems.reduce((sum, current) => sum += current.price * current.quantity, 0)
  }

  return (
    <table className="cart-items">
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map(cartItem => <CartItem key={cartItem._id} cartItem={cartItem} />)}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} className="total">{`Total: $${calculateTotal()}`}</td>
        </tr>
      </tfoot>
    </table>
  )
}

export default CartItems