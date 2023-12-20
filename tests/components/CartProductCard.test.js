import { render, screen, fireEvent } from "@testing-library/react";
import CartProductCard from "@components/CartProductCard";

describe("CartProductCard", () => {
  const mockItem = {
    SKU: "ipd",
    name: "Super iPad",
    price: 549.99,
    quantity: 2,
    image: "/images/ipd.jpeg",
  };

  it("renders correctly", () => {
    render(<CartProductCard item={mockItem} onRemoveFromCart={() => {}} />);
    expect(screen.getByText("Super iPad")).toBeInTheDocument();
    expect(screen.getByText("Qty: 2")).toBeInTheDocument();
    expect(screen.getByText("$1099.98")).toBeInTheDocument(); // Total price
  });

  it("calls onRemoveFromCart when remove button is clicked", () => {
    const mockRemoveFromCart = jest.fn();
    render(
      <CartProductCard item={mockItem} onRemoveFromCart={mockRemoveFromCart} />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockItem);
  });
});
