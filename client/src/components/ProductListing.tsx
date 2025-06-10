import Product from "./Product"
import type { Product as ProductType} from "../types"
import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import type { ProductSortState, ProductSortType } from "../reducers/ProductReducer";

interface ProductListingProps {
  products: ProductType[];
  onDeleteProduct: (productId: string) => void;
  onUpdateProduct: (product: ProductType) => void;
  onAddProductToCart: (id: string) => void;
  onChangeSortState: (type: ProductSortType) => void;
  sortState: ProductSortState
}

const ProductListing = ({
  products,
  onDeleteProduct,
  onUpdateProduct,
  onAddProductToCart,
  onChangeSortState,
  sortState
}: ProductListingProps) => {

  const { handleThemeChange } = useContext(ThemeContext)
  const arrow = sortState.isAscending ? "⬆" : "⬇"


  return (
    <div className="product-listing">
      <div className="header-row">
        <h2>Products</h2>
        <button onClick={handleThemeChange}>Toggle Theme</button>
      </div>
      <div className="sort-controls">
        <label htmlFor="sort-buttons">Sort by: </label>
        <div id="sort-buttons" className="sort-buttons">
          <button onClick={() => (onChangeSortState('title'))}>{sortState.type === "title" ? arrow : ""} Title</button>
          <button onClick={() => (onChangeSortState('price'))}>{sortState.type === "price" ? arrow : ""} Price</button>
          <button onClick={() => (onChangeSortState('quantity'))}>{sortState.type === "quantity" ? arrow : ""}Quantity</button>
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