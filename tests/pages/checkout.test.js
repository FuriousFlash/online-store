import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Checkout from "@pages/checkout";

const mockCartItems = [
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
const mockHandleRemoveFromCart = jest.fn();
const mockRouterPush = jest.fn();

jest.mock("@hooks/useFetchPriceDetails", () => ({
  __esModule: true,
  default: () => ({
    fetchPriceDetails: jest.fn(),
    totalPrice: 2499.97,
    priceBreakdown: [],
    error: null,
  }),
}));

jest.mock("@context/CartContext", () => ({
  useCart: () => ({
    cart: mockCartItems,
    setCart: jest.fn(),
    handleAddToCart: jest.fn(),
    handleRemoveFromCart: mockHandleRemoveFromCart,
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
      push: mockRouterPush,
    };
  },
}));

describe("Checkout", () => {
  beforeEach(() => {});

  it("renders cart items and order summary", () => {
    render(<Checkout />);

    mockCartItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      const priceDisplay = screen.getAllByText(`$${item.price}`);
      expect(priceDisplay.length).toBeGreaterThan(0);
    });

    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(screen.getByText(`Total Price: $2499.97`)).toBeInTheDocument();
  });

  it("handles complete purchase and redirects to success page", async () => {
    render(<Checkout />);

    const completePurchaseButton = screen.getByText("Complete Purchase");
    fireEvent.click(completePurchaseButton);

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/success");
    });
  });
});
