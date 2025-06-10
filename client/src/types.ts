import z from "zod"

export const cartItemSchema = z.object({
  _id: z.string(),
  title: z.string(),
  quantity: z.number(),
  price: z.number(),
  productId: z.string()
})

export const productSchema = cartItemSchema.omit({
  productId: true
})

const newProductSchema = productSchema.omit({
  _id: true
})

export type CartItem = z.infer<typeof cartItemSchema>;

export type Product = z.infer<typeof productSchema>;

export type NewProduct = z.infer<typeof newProductSchema>;