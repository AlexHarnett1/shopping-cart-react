import Product from "./Product"
import type { Product as ProductType, ProductSortType } from "../types"
import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

interface ProductListingProps {
  products: ProductType[];
  onDeleteProduct: (productId: string) => void;
  onUpdateProduct: (product: ProductType) => void;
  onAddProductToCart: (id: string) => void;
  onChangeSortState: (type: ProductSortType) => void
}

const ProductListing = ({
  products,
  onDeleteProduct,
  onUpdateProduct,
  onAddProductToCart,
  onChangeSortState
}: ProductListingProps) => {

  const { handleThemeChange } = useContext(ThemeContext)
  
  return (
    <div className="product-listing">
      <div className="header-row">
        <h2>Products</h2>
        <button onClick={handleThemeChange}>Toggle Theme</button>
      </div>
      <div className="sort-controls">
        <label htmlFor="sort-buttons">Sort by: </label>
        <div id="sort-buttons" className="sort-buttons">
          <button onClick={() => (onChangeSortState('name'))}>Name</button>
          <button onClick={() => (onChangeSortState('price'))}>Price</button>
          <button onClick={() => (onChangeSortState('quantity'))}>Quantity</button>
          </div>
        </div>
      <ul className="product-list">
        {products.map(product => <Product key={product._id} product={product}
          onDeleteProduct={onDeleteProduct} onUpdateProduct={onUpdateProduct}
          onAddProductToCart={onAddProductToCart}/>)}
      </ul>
    </div>
  )
}

export default ProductListing