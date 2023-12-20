import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "@components/ProductCard";

describe("ProductCard", () => {
  const mockProduct = {
    SKU: "ipd",
    name: "Super iPad",
    price: 549.99,
    image: "/images/ipd.jpeg",
  };

  it("renders correctly", () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    expect(screen.getByText("Super iPad")).toBeInTheDocument();
    expect(screen.getByText("$549.99")).toBeInTheDocument();
  });

  it("calls onAddToCart when add button is clicked", () => {
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    fireEvent.click(screen.getByText("Add to Cart"));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
