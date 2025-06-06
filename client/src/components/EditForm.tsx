import type { Product as ProductType } from "../types"
import { useState } from "react";

interface EditFormProps {
  product: ProductType;
  onUpdateProduct: (product: ProductType) => void;
  onHideEditForm: () => void;
}

const EditForm = ({ product, onUpdateProduct, onHideEditForm }: EditFormProps) => {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity)


  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onUpdateProduct({ _id: product._id, title, quantity, price })
    onHideEditForm();
  }

  // Don't really need this...
  const handleFormCancel = () => {
    onHideEditForm();
  }

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleFormSubmit} aria-label="Edit Product Form">
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Product Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            aria-label="Product Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            aria-label="Product Quantity"
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={handleFormCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditForm