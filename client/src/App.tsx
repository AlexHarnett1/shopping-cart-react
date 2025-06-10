import { useEffect, useState, useReducer } from 'react'
import ToggleableAddProductForm from './components/ToggleableAddProductForm'
import Header from './components/Header'
import ProductListing from './components/ProductListing'
import { type CartItem, type NewProduct, type Product as ProductType } from "./types.ts"
import { addProduct, getProducts, deleteProduct, updateProduct, addProductToCart, getCartItems, checkout } from './services/products.ts'

type ProductAction =
  | { type: "SET_PRODUCTS"; payload: ProductType[] }
  | { type: "ADD_PRODUCT"; payload: ProductType }
  | { type: "DELETE_PRODUCT"; payload: { id: string } }
  | { type: "UPDATE_PRODUCT"; payload: ProductType };

const productsReducer = (prevState: ProductType[], action: ProductAction) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...prevState, action.payload];
    
    case "DELETE_PRODUCT":
      return prevState.filter(product => product._id !== action.payload.id);
    
    case "UPDATE_PRODUCT":
      return prevState.map(product =>
        product._id === action.payload._id ? action.payload : product
      );
      
    case "SET_PRODUCTS":
      return action.payload;
    default:
      throw new Error('Incorrect type given to productsReducer.')
  }
}

const cartReducer = (_prevState: CartItem[], payload: CartItem[]) => {
  return payload
}

function App() {
  // const [products, setProducts] = useState<ProductType[]>([])
  const [products, productsDispatch] = useReducer(productsReducer, [])
  // const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartItems, cartItemsDispatch] = useReducer(cartReducer, [])
  

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

  return (
    <div id="app">
      <Header cartItems={cartItems} onCheckout={handleCheckout} />
      <main>
        <ProductListing products={products} onDeleteProduct={handleDeleteProduct}
          onUpdateProduct={handleUpdateProduct} onAddProductToCart={handleAddProductToCart} />
        <ToggleableAddProductForm onProductFormSubmit={handleAddProduct} />
      </main>
  </div>
  )
}

export default App
