import { useEffect, useState } from 'react'
import ToggleableAddProductForm from './components/ToggleableAddProductForm'
import Header from './components/Header'
import ProductListing from './components/ProductListing'
import { type CartItem, type NewProduct, type Product as ProductType } from "./types.ts"
import { addProduct, getProducts, deleteProduct, updateProduct, addProductToCart, getCartItems, checkout } from './services/products.ts'

function App() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const initializeProducts = async() => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (e) {
        console.log('Error: ', e)
      }
    }

    const initializeCart = async () => {
      try {
        const data = await getCartItems()
        setCartItems(data)
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
      setProducts((prev) => prev.concat(data))
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
      setProducts(products.filter(product => product._id !== productId))
    } catch(e) {
      console.log('Error: ', e)
    }
  }

  const handleUpdateProduct = async (product: ProductType) => {
    try {
      const data = await updateProduct(product)
      setProducts(products.map(product => {
        if (product._id === data._id) {
          return data
        } else {
          return product
        }
      }))
    } catch (e) {
      console.log('Error: ', e)
    }
  }

  const handleAddProductToCart = async (id: string) => {
    try {
      const data = await addProductToCart(id);
      setProducts(products.map(product => {
        if (product._id === data.product._id) {
          return data.product
        } else {
          return product
        }
      }))

    setCartItems(prevItems => {
      const index = prevItems.findIndex(item => item._id === data.cartItem._id);
      if (index === -1) {
        return [...prevItems, data.cartItem];
      }

      return prevItems.map(item =>
        item._id === data.cartItem._id ? data.cartItem : item
      );
    });

    } catch (e) {
      console.log('Error: ',  e)
    }
  }

  const handleCheckout = async () => {
    try {
      await checkout()
      setCartItems([])
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
