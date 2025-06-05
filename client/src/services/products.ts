import axios from "axios";
import { productSchema, type NewProduct, type Product } from "../types";
import { z } from "zod";


const productsSchema = z.array(productSchema)

export const addProduct = async (product: NewProduct) => {
  try {
    const { data } = await axios.post('api/products', product)
    return productSchema.parse(data);
  } catch(e) {
    console.log(e)
    throw(e)
  }
}

export const getProducts = async () => {
  try {
    const { data } = await axios.get('api/products')
    return productsSchema.parse(data);
  } catch(e) {
    console.log(e)
    throw e;
  }
}

export const updateProduct = async (product: Product) => {
  const { _id, ...updatedProduct }: { _id: string; } & NewProduct = product;

  try {
    const { data } = await axios.put(`api/products/${_id}`, updatedProduct)
    return productSchema.parse(data);
  } catch (e) {
    console.log(e)
    throw e;
  }
}

export const deleteProduct = async (id: string) => {
  try {
    const { data } = await axios.delete(`/api/products/${id}`)
    if (data === '') {
      console.log('Successful deletion')
    }
  } catch (e) {
    console.log(e)
    throw(e)
  }
}

