import type { CartItem as CartItemType } from "../types"

interface CartItemProps {
  cartItem: CartItemType
}

const CartItem = ({ cartItem }: CartItemProps) => {
  
  return (
    <tr>
      <td>{cartItem.title}</td>
      <td>{cartItem.quantity}</td>
      <td>{cartItem.price}</td>
    </tr>
  )
}

export default CartItem