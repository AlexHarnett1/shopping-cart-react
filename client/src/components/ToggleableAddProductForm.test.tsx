import { render, screen } from "@testing-library/react";
import ToggleableAddProductForm from "./ToggleableAddProductForm";
import userEvent from "@testing-library/user-event"




it("add product brings up form", async () => {
  render(<ToggleableAddProductForm onProductFormSubmit={vi.fn()} />);
  const addButton = screen.getByRole("button", { name: /Add a Product/i })
  const user = userEvent.setup()
  await user.click(addButton)
  const form = screen.getByRole("form", {name: "Product Form"})
  expect(form).toBeInTheDocument();
  expect(addButton).not.toBeInTheDocument();
})

it("cancel add product removes form", async () => {
  render(<ToggleableAddProductForm onProductFormSubmit={vi.fn()} />);
  const addButton = screen.getByRole("button", { name: /Add a Product/i })
  const user = userEvent.setup()
  await user.click(addButton)

  const form = screen.getByRole("form", { name: "Product Form" })
  const cancelButton = screen.getByRole("button", { name: /cancel/i })
  await user.click(cancelButton)

  const newAddButton = screen.getByRole("button", { name: /Add a Product/i })

  expect(form).not.toBeInTheDocument();
  expect(newAddButton).toBeInTheDocument();
})