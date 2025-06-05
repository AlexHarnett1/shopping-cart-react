import { useEffect, useState } from 'react'
import ToggleableAddProductForm from './components/ToggleableAddProductForm'
import Header from './components/Header'
import ProductListing from './components/ProductListing'
import type { NewProduct, Product as ProductType } from "./types.ts"
import { addProduct, getProducts, deleteProduct, updateProduct } from './services/products.ts'

function App() {
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    const initializeProducts = async() => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (e) {
        console.log('Error: ', e)
      }
    }
    initializeProducts();
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

  return (
    <div id="app">
      <Header/>
      <main>
        <ProductListing products={products} onDeleteProduct={handleDeleteProduct}
          onUpdateProduct={handleUpdateProduct} />
        <ToggleableAddProductForm onProductFormSubmit={handleAddProduct} />
      </main>
  </div>
  )
}

export default App
