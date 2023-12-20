import { render, screen, fireEvent } from "@testing-library/react";
import CartSidebar from "@components/CartSidebar";

describe("CartSidebar", () => {
  const mockCart = [
    {
      SKU: "ipd",
      name: "Super iPad",
      price: 549.99,
      quantity: 2,
      image: "/images/ipd.jpeg",
    },
    {
      SKU: "mbp",
      name: "MacBook Pro",
      price: 1399.99,
      quantity: 1,
      image: "/images/mbp.jpg",
    },
  ];

  it("renders cart items, close button, and checkout button", () => {
    const mockClose = jest.fn();
    render(
      <CartSidebar
        cart={mockCart}
        onRemoveFromCart={() => {}}
        onClose={mockClose}
      />
    );

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(mockCart.length + 2);

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(mockClose).toHaveBeenCalled();

    if (mockCart.length > 0) {
      expect(screen.getByText("Checkout")).not.toBeDisabled();
    } else {
      expect(screen.getByText("Add items to continue...")).toBeInTheDocument();
      expect(screen.getByText("Checkout")).toBeDisabled();
    }
  });
});
