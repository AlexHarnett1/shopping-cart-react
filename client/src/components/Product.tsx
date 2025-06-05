import type { Product as ProductType } from "../types";
import EditForm from "./EditForm";
import React from "react";

interface ProductProps {
  product: ProductType;
  onDeleteProduct: (productId: string) => void;
  onUpdateProduct: (product: ProductType) => void;
}

const Product = ({ product, onDeleteProduct, onUpdateProduct }: ProductProps) => {
  const [isEditForm, setIsEditForm] = React.useState(false)

  const handleDeleteProduct = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onDeleteProduct(product._id);
  }

  return (
    <li className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
        <p className="quantity">{product.quantity} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart">Add to Cart</button>
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