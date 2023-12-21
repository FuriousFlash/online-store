import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "@pages/index";
import products from "@models/products";

const mockHandleAddToCart = jest.fn();
jest.mock("@context/CartContext", () => ({
  useCart: () => ({
    cart: [],
    setCart: jest.fn(),
    handleAddToCart: mockHandleAddToCart,
    handleRemoveFromCart: jest.fn(),
    isCartInitialised: true,
  }),
}));

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the product list", () => {
    render(<HomePage />);

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  it("shows and hides the cart sidebar", () => {
    render(<HomePage />);

    const showCartButton = screen.getByTestId("show-cart");
    fireEvent.click(showCartButton);
    expect(screen.getByTestId("cart-sidebar")).toBeInTheDocument();

    const hideCartButton = screen.getByTestId("hide-cart");
    fireEvent.click(hideCartButton);
    expect(screen.queryByTestId("cart-sidebar")).not.toBeInTheDocument();
  });

  it("handles add to cart", () => {
    render(<HomePage />);

    const addToCartButtons = screen.getAllByTestId("add-to-cart-button");
    fireEvent.click(addToCartButtons[0]);

    expect(mockHandleAddToCart).toHaveBeenCalledWith(products[0]);
  });
});
