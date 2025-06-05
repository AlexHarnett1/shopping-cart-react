import Product from "./Product"
import type { Product as ProductType } from "../types"

interface ProductListingProps {
  products: ProductType[];
  onDeleteProduct: (productId: string) => void;
  onUpdateProduct: (product: ProductType) => void;
  onAddProductToCart: (id: string) =>  void
}

const ProductListing = ({ products, onDeleteProduct, onUpdateProduct, onAddProductToCart }: ProductListingProps) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map(product => <Product key={product._id} product={product}
          onDeleteProduct={onDeleteProduct} onUpdateProduct={onUpdateProduct}
          onAddProductToCart={onAddProductToCart}/>)}
      </ul>
    </div>
  )
}

export default ProductListing