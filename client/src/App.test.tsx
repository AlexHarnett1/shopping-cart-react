import { screen, render } from "@testing-library/react";
import App  from "./App";
import userEvent from "@testing-library/user-event";
import { getProducts, getCartItems, updateProduct } from "./services/products"

// Updating the product closes the form
// Adding the product closes the form and product appears
// Deleting the product removes the product
// Adding to cart creates cart Item
// Checkout removes cart items

vi.mock('./services/products.ts')

const mockGetProducts = vi.mocked(getProducts)
const mockGetCartItems = vi.mocked(getCartItems)
const mockUpdateProduct = vi.mocked(updateProduct)

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

