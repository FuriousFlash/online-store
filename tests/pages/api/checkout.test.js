import { createMocks } from "node-mocks-http";
import checkoutHandler from "@pages/api/checkout";
import calculateTotalPrice from "@utils/calculateTotalPrice";

jest.mock("@utils/calculateTotalPrice", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("/api/checkout", () => {
  beforeEach(() => {
    calculateTotalPrice.mockClear();
  });

  it("returns the correct total price for a single item", async () => {
    calculateTotalPrice.mockImplementation(() => 999.99);

    const testItems = [{ SKU: "vga", quantity: 1 }];

    const { req, res } = createMocks({
      method: "POST",
      body: {
        items: testItems,
      },
    });

    await checkoutHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ total: 999.99 });

    // Ensure the `calculateTotalPrice` was called with the correct arguments
    expect(calculateTotalPrice).toHaveBeenCalledWith(testItems);
  });

  it("returns the correct total price for a given set of items", async () => {
    calculateTotalPrice.mockImplementation(() => 999.99);

    const testItems = [
      { SKU: "atv", quantity: 3 },
      { SKU: "ipd", quantity: 2 },
    ];

    const { req, res } = createMocks({
      method: "POST",
      body: {
        items: [
          { SKU: "atv", quantity: 3 },
          { SKU: "ipd", quantity: 2 },
        ],
      },
    });

    await checkoutHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ total: 999.99 });

    // Ensure the `calculateTotalPrice` was called with the correct arguments
    expect(calculateTotalPrice).toHaveBeenCalledWith(testItems);
  });

  it("returns the correct total price for 1 item of each SKU", async () => {
    calculateTotalPrice.mockImplementation(() => 999.99);

    const testItems = [
      { SKU: "atv", quantity: 1 },
      { SKU: "ipd", quantity: 1 },
      { SKU: "mbp", quantity: 1 },
      { SKU: "vga", quantity: 1 },
    ];

    const { req, res } = createMocks({
      method: "POST",
      body: {
        items: testItems,
      },
    });

    await checkoutHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ total: 999.99 });

    // Ensure the `calculateTotalPrice` was called with the correct arguments
    expect(calculateTotalPrice).toHaveBeenCalledWith(testItems);
  });
});
