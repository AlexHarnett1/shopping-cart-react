import { screen, render } from "@testing-library/react";
import App  from "./App";
import userEvent from "@testing-library/user-event";
import { getProducts, getCartItems, updateProduct, addProduct, addProductToCart } from "./services/products"

// Updating the product closes the form
// Adding the product closes the form and product appears
// Deleting the product removes the product
// Adding to cart creates cart Item
// Checkout removes cart items

vi.mock('./services/products.ts')

const mockGetProducts = vi.mocked(getProducts)
const mockGetCartItems = vi.mocked(getCartItems)
const mockUpdateProduct = vi.mocked(updateProduct)
const mockAddProduct = vi.mocked(addProduct)
const mockAddProductToCart = vi.mocked(addProductToCart)

const products = [
  {
    _id: "61d754d72092473d55a809e1",
    title: "Keyboard",
    price: 50,
    quantity: 3
  }
]

const cartItems = [
  {
    _id: "81d754d72092473d55a809e4",
    title: "Keyboard",
    quantity: 2,
    price: 50,
    productId: "61d754d72092473d55a809e1"
  }
]

afterEach(() => [
  vi.clearAllMocks()
])

it("updating the product closes edit form", async () => {
  const keyboard = products[0];
  const updatedKeyboard = ({...keyboard, price: 70})
  mockGetProducts.mockResolvedValue(products)
  mockGetCartItems.mockResolvedValue(cartItems)
  mockUpdateProduct.mockResolvedValue(updatedKeyboard)
  
  render(<App />);

  const keyboardEditButton = await screen.findByRole("button", {name: "Edit"})

  const user = userEvent.setup();
  await user.click(keyboardEditButton);

  const form = screen.getByRole("form", {name: 'Edit Product Form'})
  expect(form).toBeInTheDocument()

  const productNameText = screen.getByRole("textbox", { name: "Product Name" })
  
  await user.clear(productNameText)
  await user.type(productNameText, "Piano")

  const updateButton = screen.getByRole("button", { name: "Update" })
  await user.click(updateButton)

  const editForm  = screen.queryByRole("textbox", {name: "Edit Product Form"})
  expect(editForm).not.toBeInTheDocument()
})

it("Adding a product closes form and product appears", async () => {
  const newProduct =   {
    _id: "61d754d72092473d55a809t6",
    title: "Random Thing",
    price: 20,
    quantity: 8
  }

  mockAddProduct.mockResolvedValue(newProduct)
  render(<App />);
  

  const user = userEvent.setup()
  const addProductButton = screen.getByRole('button', {name: 'Add A Product'})
  
  await user.click(addProductButton)


  await user.type(screen.getByRole('textbox', { name: 'Product Name:' }), newProduct.title)
  await user.type(screen.getByRole('spinbutton', { name: 'Quantity:'}), newProduct.quantity.toString())
  await user.type(screen.getByRole('spinbutton', { name: 'Price:'}), newProduct.price.toString())

  const submitButton = screen.getByRole('button', { name: 'Add' })
  await user.click(submitButton)

  expect(screen.getByRole('heading', { name: 'Random Thing' })).toBeInTheDocument()

  expect(screen.queryByRole('button', { name: 'Add' })).not.toBeInTheDocument()
})


// Deleting the product removes the product
it("Deleting a product removes the product", async () => {
  mockGetProducts.mockResolvedValue(products)
  // mockDeleteProduct.mockResolvedValue()
  render(<App/>)
  const user = userEvent.setup()

  const deleteButton = await screen.findByRole('button', { name: "X" })
  await user.click(deleteButton)

  expect(screen.queryByRole("heading", {name: "Keyboard"})).not.toBeInTheDocument()
})

// Adding to cart creates cart Item
it("Adding to cart creates cart item", async () => {
  const newProduct = {
    _id: "61d754d72092473d55a809t6",
    title: "Random Thing",
    price: 20,
    quantity: 8
  }

  const newCartItem = {
    _id: "61d754d72092473d55a809t9",
    title: "Random Thing",
    price: 20,
    quantity: 1,
    productId: "61d754d72092473d55a809t6"
  }

  mockGetProducts.mockResolvedValue(products)
  mockAddProductToCart.mockResolvedValue({product: newProduct, cartItem: newCartItem})
  render(<App />)
  const user = userEvent.setup()

  const addToCartButton = await screen.findByRole("button", { name: "Add to Cart" })
  
  await user.click(addToCartButton)

  expect(screen.getByText("Random Thing"))

})

// Checkout removes cart items

