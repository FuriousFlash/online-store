import calculateTotalPriceAndBreakDown from "@utils/calculateTotalPriceAndBreakDown";

describe("calculateTotalPriceAndBreakDown", () => {
  it("calculates the total price correctly for 1 ipd", () => {
    const items = [{ SKU: "ipd", quantity: 1 }];
    const expected = {
      total: 549.99,
      breakdown: [
        {
          SKU: "ipd",
          name: "Super iPad",
          quantity: 1,
          originalPrice: 549.99,
          finalPrice: 549.99,
          discountApplied: 0,
          discountDescription: "",
        },
      ],
    };

    const result = calculateTotalPriceAndBreakDown(items);
    expect(result).toEqual(expected);
  });

  it("calculates the total price correctly for 1 mbp", () => {
    const items = [{ SKU: "mbp", quantity: 1 }];
    const expected = {
      total: 1399.99,
      breakdown: [
        {
          SKU: "mbp",
          name: "MacBook Pro",
          quantity: 1,
          originalPrice: 1399.99,
          finalPrice: 1399.99,
          discountApplied: 0,
          discountDescription: "",
        },
      ],
    };

    const result = calculateTotalPriceAndBreakDown(items);
    expect(result).toEqual(expected);
  });

  it("calculates the total price correctly for 1 atv", () => {
    const items = [{ SKU: "atv", quantity: 1 }];
    const expected = {
      total: 109.5,
      breakdown: [
        {
          SKU: "atv",
          name: "Apple TV",
          quantity: 1,
          originalPrice: 109.5,
          finalPrice: 109.5,
          discountApplied: 0,
          discountDescription: "",
        },
      ],
    };

    const result = calculateTotalPriceAndBreakDown(items);
    expect(result).toEqual(expected);
  });

  it("calculates the total price correctly for 1 vga", () => {
    const items = [{ SKU: "vga", quantity: 1 }];
    const expected = {
      total: 30.0,
      breakdown: [
        {
          SKU: "vga",
          name: "VGA adapter",
          quantity: 1,
          originalPrice: 30.0,
          finalPrice: 30.0,
          discountApplied: 0,
          discountDescription: "",
        },
      ],
    };

    const result = calculateTotalPriceAndBreakDown(items);
    expect(result).toEqual(expected);
  });

  it("calculates the total price correctly - 3 for 2 atv deal for 3 atvs", () => {
    const items = [{ SKU: "atv", quantity: 3 }];
    const expected = {
      total: 219.0,
      breakdown: [
        {
          SKU: "atv",
          name: "Apple TV",
          quantity: 3,
          originalPrice: 109.5,
          finalPrice: 219.0,
          discountApplied: 109.5,
          discountDescription: "3 for 2 deal applied",
        },
      ],
    };

    const result = calculateTotalPriceAndBreakDown(items);
    expect(result).toEqual(expected);
  });

  it("calculates the total price correctly - 3 for 2 atv deal for 2 atvs", () => {
    const items = [{ SKU: "atv", quantity: 2 }];
    const expected = {
      total: 219.0,
      breakdown: [
        {
          SKU: "atv",
          name: "Apple TV",
          quantity: 2,
          originalPrice: 109.5,
          finalPrice: 219.0,
          discountApplied: 0,
          discountDescription: "",
        },
      ],
    };

    const result = calculateTotalPriceAndBreakDown(items);
    expect(result).toEqual(expected);
  });

  it("calculates the total price correctly - 3 for 2 atv deal for 4 atvs", () => {
    const items = [{ SKU: "atv", quantity: 4 }];
    const expected = {
      total: 328.5,
      breakdown: [
        {
          SKU: "atv",
          name: "Apple TV",
          quantity: 4,
          originalPrice: 109.5,
          finalPrice: 328.5,
          discountApplied: 109.5,
          discountDescription: "3 for 2 deal applied",
        },
      ],
    };

    const result = calculateTotalPriceAndBreakDown(items);
    expect(result).toEqual(expected);
  });

  it("calculates the total price correctly - ipd bulk discount for 4 ipds", () => {
    const items = [{ SKU: "ipd", quantity: 4 }];
    const expected = {
      total: 2199.96,
      breakdown: [
        {
          SKU: "ipd",
          name: "Super iPad",
          quantity: 4,
          originalPrice: 549.99,
          finalPrice: 2199.96,
          discountApplied: 0,
          discountDescription: "",
        },
      ],
    };

    const result = calculateTotalPriceAndBreakDown(items);
    expect(result).toEqual(expected);
  });

  it("calculates the total price correctly - ipd bulk discount for 5 ipds", () => {
    const items = [{ SKU: "ipd", quantity: 5 }];
    const expected = {
      total: 2499.95,
      breakdown: [
        {
          SKU: "ipd",
          name: "Super iPad",
          quantity: 5,
          originalPrice: 549.99,
          finalPrice: 2499.95,
          discountApplied: 250.0,
          discountDescription:
            "Bulk discount applied for purchasing more than 4",
        },
      ],
    };

    const result = calculateTotalPriceAndBreakDown(items);
    expect(result).toEqual(expected);
  });

  it("calculates the total price correctly - ipd bulk discount for 6 ipds", () => {
    const items = [{ SKU: "ipd", quantity: 6 }];
    const expected = {
      total: 2999.94,
      breakdown: [
        {
          SKU: "ipd",
          name: "Super iPad",
          quantity: 6,
          originalPrice: 549.99,
          finalPrice: 2999.94,
          discountApplied: 300.0,
          discountDescription:
            "Bulk discount applied for purchasing more than 4",
        },
      ],
    };

    const result = calculateTotalPriceAndBreakDown(items);
    expect(result).toEqual(expected);
  });

  it("calculates the total price correctly - free vga with mbp for 1 mbp and 1 vga", () => {
    const items = [
      { SKU: "mbp", quantity: 1 },
      { SKU: "vga", quantity: 1 },
    ];
    const expected = {
      total: 1399.99,
      breakdown: [
        {
          SKU: "mbp",
          name: "MacBook Pro",
          quantity: 1,
          originalPrice: 1399.99,
          finalPrice: 1369.99,
          discountApplied: 30,
          discountDescription: "Bundled with VGA adapter",
        },
        {
          SKU: "vga",
          name: "VGA adapter",
          quantity: 1,
          originalPrice: 30.0,
          finalPrice: 30.0,
          discountApplied: 0,
          discountDescription: "",
        },
      ],
    };

    const result = calculateTotalPriceAndBreakDown(items);
    expect(result).toEqual(expected);
  });

  it("calculates the total price correctly - free vga with mbp for 1 mbp and 2 vga", () => {
    const items = [
      { SKU: "mbp", quantity: 1 },
      { SKU: "vga", quantity: 2 },
    ];
    const expected = {
      total: 1429.99,
      breakdown: [
        {
          SKU: "mbp",
          name: "MacBook Pro",
          quantity: 1,
          originalPrice: 1399.99,
          finalPrice: 1369.99,
          discountApplied: 30,
          discountDescription: "Bundled with VGA adapter",
        },
        {
          SKU: "vga",
          name: "VGA adapter",
          quantity: 2,
          originalPrice: 30.0,
          finalPrice: 60.0,
          discountApplied: 0,
          discountDescription: "",
        },
      ],
    };
    expect(calculateTotalPriceAndBreakDown(items)).toEqual(expected);
  });

  it("calculates the total price correctly - free vga with mbp for 1 mbp and 0 vga", () => {
    const items = [{ SKU: "mbp", quantity: 1 }];
    const expected = {
      total: 1399.99,
      breakdown: [
        {
          SKU: "mbp",
          name: "MacBook Pro",
          quantity: 1,
          originalPrice: 1399.99,
          finalPrice: 1399.99,
          discountApplied: 0,
          discountDescription: "",
        },
      ],
    };
    expect(calculateTotalPriceAndBreakDown(items)).toEqual(expected);
  });

  it("calculates the total price correctly given a set of items that fall into all deals", () => {
    const items = [
      { SKU: "atv", quantity: 3 },
      { SKU: "ipd", quantity: 5 },
      { SKU: "mbp", quantity: 2 },
      { SKU: "vga", quantity: 3 },
    ];
    const expected = {
      total: 5548.93,
      breakdown: [
        {
          SKU: "atv",
          name: "Apple TV",
          quantity: 3,
          originalPrice: 109.5,
          finalPrice: 219,
          discountApplied: 109.5,
          discountDescription: "3 for 2 deal applied",
        },
        {
          SKU: "ipd",
          name: "Super iPad",
          quantity: 5,
          originalPrice: 549.99,
          finalPrice: 2499.95,
          discountApplied: 250,
          discountDescription:
            "Bulk discount applied for purchasing more than 4",
        },
        {
          SKU: "mbp",
          name: "MacBook Pro",
          quantity: 2,
          originalPrice: 1399.99,
          finalPrice: 2739.98,
          discountApplied: 60.0,
          discountDescription: "Bundled with VGA adapter",
        },
        {
          SKU: "vga",
          name: "VGA adapter",
          quantity: 3,
          originalPrice: 30.0,
          finalPrice: 90.0,
          discountApplied: 0,
          discountDescription: "",
        },
      ],
    };
    expect(calculateTotalPriceAndBreakDown(items)).toEqual(expected);
  });

  it("calculates the total price correctly given a set of items", () => {
    const items = [
      { SKU: "atv", quantity: 2 },
      { SKU: "ipd", quantity: 2 },
      { SKU: "mbp", quantity: 1 },
    ];
    const expected = {
      total: 2718.97,
      breakdown: [
        {
          SKU: "atv",
          name: "Apple TV",
          quantity: 2,
          originalPrice: 109.5,
          finalPrice: 219,
          discountApplied: 0,
          discountDescription: "",
        },
        {
          SKU: "ipd",
          name: "Super iPad",
          quantity: 2,
          originalPrice: 549.99,
          finalPrice: 1099.98,
          discountApplied: 0,
          discountDescription: "",
        },
        {
          SKU: "mbp",
          name: "MacBook Pro",
          quantity: 1,
          originalPrice: 1399.99,
          finalPrice: 1399.99,
          discountApplied: 0,
          discountDescription: "",
        },
      ],
    };
    expect(calculateTotalPriceAndBreakDown(items)).toEqual(expected);
  });
});
