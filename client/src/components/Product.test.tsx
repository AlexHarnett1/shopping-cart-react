import { render, screen } from "@testing-library/react";
import Product from "./Product";
import userEvent from "@testing-library/user-event";

const product = {
  "_id": "61d754d72092473d55a809e1",
  "title": "Keyboard",
  "price": 50,
  "quantity": 3
}

it("clicking edit displays edit form", async () => {
  const user = userEvent.setup()
  render(<Product product={product} onDeleteProduct={vi.fn()}
    onUpdateProduct={vi.fn()} onAddProductToCart={vi.fn()} />)
  
  const editButton = screen.getByRole("button", {name:"Edit"})
  await user.click(editButton)

  const editForm = screen.getByRole("form", { name: "Edit Product Form" })
  expect(editForm).toBeInTheDocument()
})

it("clicking cancel removes edit form", async () => {
  const user = userEvent.setup()
  render(<Product product={product} onDeleteProduct={vi.fn()}
    onUpdateProduct={vi.fn()} onAddProductToCart={vi.fn()} />)
  
  const editButton = screen.getByRole("button", {name:"Edit"})
  await user.click(editButton)
  
  const editForm = screen.getByRole("form", { name: "Edit Product Form" })
  expect(editForm).toBeInTheDocument()

  const cancelButton = screen.getByRole("button", { name: "Cancel" })
  await user.click(cancelButton)

  expect(editForm).not.toBeInTheDocument()
})