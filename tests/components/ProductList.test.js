import { render, screen } from "@testing-library/react";
import ProductList from "@components/ProductList";

describe("ProductList", () => {
  const mockProducts = [
    {
      SKU: "ipd",
      name: "Super iPad",
      price: 549.99,
      image: "/images/ipd.jpeg",
    },
    {
      SKU: "mbp",
      name: "MacBook Pro",
      price: 1399.99,
      image: "/images/mbp.jpg",
    },
  ];

  it("renders a list of products", () => {
    render(<ProductList products={mockProducts} onAddToCart={() => {}} />);

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    });
  });
});
