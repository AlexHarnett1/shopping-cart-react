import { render, screen } from "@testing-library/react";
import EditForm from "./EditForm";
import userEvent from "@testing-library/user-event";

const product = {
  "_id": "61d754d72092473d55a809e1",
  "title": "Keyboard",
  "price": 50,
  "quantity": 3
}


it("product name input field is correct value", async () => {
  render(<EditForm product={product} onUpdateProduct={vi.fn()} onHideEditForm={vi.fn()} />)
  const user = userEvent.setup()
  
  const textbox = screen.getByRole("textbox", { name: "Product Name" })
  expect(textbox).toBeInTheDocument()

  await user.clear(textbox)
  await user.type(textbox, "Alex")

  expect(textbox).toHaveValue("Alex")
})

it("product quantity input field is correct value", () => {
  
})

it("product name input field is correct value", () => {
  
})