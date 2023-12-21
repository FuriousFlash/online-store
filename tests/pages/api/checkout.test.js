import { createMocks } from "node-mocks-http";
import checkoutHandler from "@pages/api/checkout";
import calculateTotalPriceAndBreakDown from "@utils/calculateTotalPriceAndBreakDown";

jest.mock("@utils/calculateTotalPriceAndBreakDown", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("/api/checkout", () => {
  beforeEach(() => {
    calculateTotalPriceAndBreakDown.mockClear();
  });

  it("returns the correct total price for a single item", async () => {
    const mockResponse = {
      total: 999.99,
      breakdown: [],
    };
    calculateTotalPriceAndBreakDown.mockImplementation(() => mockResponse);

    const items = [{ SKU: "vga", quantity: 1 }];

    const { req, res } = createMocks({
      method: "POST",
      body: {
        items: items,
      },
    });

    await checkoutHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockResponse);

    // Ensure the `calculateTotalPriceAndBreakDown` was called with the correct arguments
    expect(calculateTotalPriceAndBreakDown).toHaveBeenCalledWith(items);
  });

  it("returns the correct total price for a given set of items", async () => {
    const mockResponse = {
      total: 999.99,
      breakdown: [],
    };
    calculateTotalPriceAndBreakDown.mockImplementation(() => mockResponse);

    const items = [
      { SKU: "atv", quantity: 3 },
      { SKU: "ipd", quantity: 2 },
    ];

    const { req, res } = createMocks({
      method: "POST",
      body: {
        items: items,
      },
    });

    await checkoutHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockResponse);

    // Ensure the `calculateTotalPriceAndBreakDown` was called with the correct arguments
    expect(calculateTotalPriceAndBreakDown).toHaveBeenCalledWith(items);
  });

  it("returns the correct total price for 1 item of each SKU", async () => {
    const mockResponse = {
      total: 999.99,
      breakdown: [],
    };
    calculateTotalPriceAndBreakDown.mockImplementation(() => mockResponse);

    const items = [
      { SKU: "atv", quantity: 1 },
      { SKU: "ipd", quantity: 1 },
      { SKU: "mbp", quantity: 1 },
      { SKU: "vga", quantity: 1 },
    ];

    const { req, res } = createMocks({
      method: "POST",
      body: {
        items: items,
      },
    });

    await checkoutHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockResponse);

    // Ensure the `calculateTotalPriceAndBreakDown` was called with the correct arguments
    expect(calculateTotalPriceAndBreakDown).toHaveBeenCalledWith(items);
  });
});
