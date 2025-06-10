import { useEffect, useState, useReducer } from 'react'
import ToggleableAddProductForm from './components/ToggleableAddProductForm'
import Header from './components/Header'
import ProductListing from './components/ProductListing'
import {
  type CartItem,
  type NewProduct,
  type Product as ProductType,
  type ProductSortType,
  type ProductSortState
} from "./types.ts"
import { addProduct, getProducts, deleteProduct, updateProduct, addProductToCart, getCartItems, checkout } from './services/products.ts'
import { sortProducts } from './utils/utils.ts'


type ProductAction =
  | { type: "SET_PRODUCTS"; payload: ProductType[] }
  | { type: "ADD_PRODUCT"; payload: ProductType }
  | { type: "DELETE_PRODUCT"; payload: { id: string } }
  | { type: "UPDATE_PRODUCT"; payload: ProductType }
  | { type: "SORT_PRODUCTS"; payload: ProductSortState};

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
    
    case "SORT_PRODUCTS":
      return sortProducts(prevState, action.payload)
    
    default:
      throw new Error('Incorrect type given to productsReducer.')
  }
}

const cartReducer = (_prevState: CartItem[], payload: CartItem[]) => {
  return payload
}

const initialSortState: ProductSortState = { type: "name", isAscending: true }

function App() {
  // const [products, setProducts] = useState<ProductType[]>([])
  const [products, productsDispatch] = useReducer(productsReducer, [])
  // const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartItems, cartItemsDispatch] = useReducer(cartReducer, [])
  const [sortState, setSortState] = useState<ProductSortState>(initialSortState)
  

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
    if (sortState.type === type) {
      setSortState({...sortState, isAscending: !sortState.isAscending})
    } else {
      setSortState({type: type, isAscending: true})
    }
  }

  useEffect(() => {
    productsDispatch({type:"SORT_PRODUCTS", payload:sortState})
    console.log('sort state change:', sortState)
  }, [sortState])

  return (
    <div id="app">
      <Header cartItems={cartItems} onCheckout={handleCheckout} />
      <main>
        <ProductListing products={products} onDeleteProduct={handleDeleteProduct}
          onUpdateProduct={handleUpdateProduct} onAddProductToCart={handleAddProductToCart}
          onChangeSortState={handleChangeSortState} />
        <ToggleableAddProductForm onProductFormSubmit={handleAddProduct} />
      </main>
  </div>
  )
}

export default App
