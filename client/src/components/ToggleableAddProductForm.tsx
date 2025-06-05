import { useState } from "react"
import type { NewProduct } from "../types";

interface FormProps {
  onProductFormSubmit: (product: NewProduct, callback?: () => void) => void
}

const ToggleableAddProductForm = ({ onProductFormSubmit}: FormProps) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onProductFormSubmit({title, price, quantity}, formReset);
  }

  const formReset = (): void => {
    setTitle('')
    setPrice(0)
    setQuantity(0)
    setIsFormOpen(false);
  }

  const handleFormCancel = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    formReset()
  }

  return (
  <>
    {isFormOpen ?
      <div className="add-form">
        <form onSubmit={ handleFormSubmit }>
          <div className="input-group">
            <label htmlFor="product-name">Product Name:</label>
            <input
              type="text"
              id="product-name"
              name="product-name"
              onChange={(e) => setTitle(e.currentTarget.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="product-price">Price:</label>
            <input
              type="number"
              id="product-price"
              name="product-price"
              min="0"
              step="0.01"
              onChange={(e) => setPrice(Number(e.currentTarget.value))}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="product-quantity">Quantity:</label>
            <input
              type="number"
              id="product-quantity"
              name="product-quantity"
              min="0"
              onChange={(e) => setQuantity(Number(e.currentTarget.value))}
              required
            />
          </div>
          <div className="actions form-actions">
            <button type="submit">Add</button>
            <button type="button" onClick={handleFormCancel}>Cancel</button>
          </div>
        </form>
      </div >
    :
      <p>
        <button className="add-product-button"
        onClick={() => setIsFormOpen(true)}>Add A Product</button>
      </p>
    }
    </>
  )
}

export default ToggleableAddProductForm