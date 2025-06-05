import type { Product as ProductType } from "../types";
import EditForm from "./EditForm";
import React from "react";

interface ProductProps {
  product: ProductType;
  onDeleteProduct: (productId: string) => void;
  onUpdateProduct: (product: ProductType) => void;
  onAddProductToCart: (id: string) => void
}

const Product = ({ product, onDeleteProduct, onUpdateProduct, onAddProductToCart }: ProductProps) => {
  const [isEditForm, setIsEditForm] = React.useState(false)

  const handleDeleteProduct = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onDeleteProduct(product._id);
  }

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (product.quantity <= 0) {
      alert("Sorry, this product is currently out of stock.")
    } else {
      onAddProductToCart(product._id);
    }
  }

  return (
    <li className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
        <p className="quantity">{product.quantity} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart" disabled={product.quantity === 0} onClick={handleAddToCart}>Add to Cart</button>
          <button className="edit" onClick={() => setIsEditForm(!isEditForm)}>Edit</button>
        </div>
        <button className="delete-button" onClick={handleDeleteProduct}><span>X</span></button>
      </div>
      {isEditForm ? <EditForm product={product} onUpdateProduct={onUpdateProduct}
        onHideEditForm={() => setIsEditForm(false) } /> : null}
    </li>
  )
}

export default Product