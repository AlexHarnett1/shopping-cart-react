import { useEffect, useReducer, useContext } from 'react'
import ToggleableAddProductForm from './components/ToggleableAddProductForm'
import Header from './components/Header'
import ProductListing from './components/ProductListing'
import {
  type CartItem,
  type NewProduct,
  type Product as ProductType,
} from "./types.ts"
import { addProduct, getProducts, deleteProduct, updateProduct, addProductToCart, getCartItems, checkout } from './services/products.ts'
import { ThemeContext } from './providers/ThemeProvider.tsx'
import { productsReducer, type ProductSortType } from './reducers/ProductReducer.ts'

const cartReducer = (_prevState: CartItem[], payload: CartItem[]) => {
  return payload
}
function App() {
  // const [products, setProducts] = useState<ProductType[]>([])
  const [products, productsDispatch] = useReducer(productsReducer, { items:[], sortState: {type:"title", isAscending: true}})
  // const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartItems, cartItemsDispatch] = useReducer(cartReducer, [])

  const { isDarkMode } = useContext(ThemeContext)
  

  useEffect(() => {
    const initializeProducts = async() => {
      try {
        const data = await getProducts()
        productsDispatch({ type: "SET_PRODUCTS", payload: data })
      } catch (e) {
        console.log('Error: ', e)
      }
    }

    const initializeCart = async () => {
      try {
        const data = await getCartItems()
        cartItemsDispatch(data)
      } catch (e) {
        console.log('Error: ', e)
      }
    }

    initializeProducts();
    initializeCart();
  }, [])

  const handleAddProduct = async (newProduct: NewProduct, callback?: () => void) => {
    try {
      const data = await addProduct(newProduct)
      console.log(data);
      productsDispatch({type: "ADD_PRODUCT", payload: data})
      if (callback) {
        callback()
      }
    } catch (e) {
      console.log('Error', e)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId)
      productsDispatch({ type: "DELETE_PRODUCT", payload: { id: productId } })
    } catch(e) {
      console.log('Error: ', e)
    }
  }

  const handleUpdateProduct = async (product: ProductType) => {
    try {
      const data = await updateProduct(product)
      productsDispatch({ type: "UPDATE_PRODUCT", payload: data })
    } catch (e) {
      console.log('Error: ', e)
    }
  }

  const handleAddProductToCart = async (id: string) => {
    try {
      const data = await addProductToCart(id);
      productsDispatch({ type: "UPDATE_PRODUCT", payload: data.product })

      const index = cartItems.findIndex(item => item._id === data.cartItem._id);
      if (index === -1) {
        cartItemsDispatch([...cartItems, data.cartItem]);
      } else {
        cartItemsDispatch(cartItems.map(item =>
          item._id === data.cartItem._id ? data.cartItem : item
        ))
      }

    } catch (e) {
      console.log('Error: ',  e)
    }
  }

  const handleCheckout = async () => {
    try {
      await checkout()
      cartItemsDispatch([])
    } catch (e) {
      console.log('Error: ', e)
    }
  }

  const handleChangeSortState = (type: ProductSortType) => {
    if (products.sortState.type === type) {
      productsDispatch({ type: "SORT_PRODUCTS", payload: { type, isAscending: !products.sortState.isAscending } })
    } else {
      productsDispatch({
        type: "SORT_PRODUCTS", payload: { type, isAscending: true }})
    }
  }

  return (
    <div id="app">
      <Header cartItems={cartItems} onCheckout={handleCheckout} />
      <main className={isDarkMode ? "dark-mode" : ""}>
        <ProductListing products={products.items} onDeleteProduct={handleDeleteProduct}
          onUpdateProduct={handleUpdateProduct} onAddProductToCart={handleAddProductToCart}
          onChangeSortState={handleChangeSortState} sortState={products.sortState}/>
        <ToggleableAddProductForm onProductFormSubmit={handleAddProduct} />
      </main>
  </div>
  )
}

export default App
