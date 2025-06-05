import z from "zod"

export const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  quantity: z.number(),
  price: z.number()
})

const newProductSchema = productSchema.omit({
  _id: true
})


export type Product = z.infer<typeof productSchema>;

export type NewProduct = z.infer<typeof newProductSchema>;