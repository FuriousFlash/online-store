import calculateTotalPrice from "@utils/calculateTotalPrice";

describe("calculateTotalPrice", () => {
  it("calculates the total price correctly for 1 ipd", () => {
    const items = [{ SKU: "ipd", quantity: 1 }];

    const expectedTotal = 549.99;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });

  it("calculates the total price correctly for 1 mbp", () => {
    const items = [{ SKU: "mbp", quantity: 1 }];

    const expectedTotal = 1399.99;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });

  it("calculates the total price correctly for 1 atv", () => {
    const items = [{ SKU: "atv", quantity: 1 }];

    const expectedTotal = 109.5;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });

  it("calculates the total price correctly for 1 vga", () => {
    const items = [{ SKU: "vga", quantity: 1 }];

    const expectedTotal = 30.0;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });

  it("calculates the total price correctly - 3 for 2 atv deal for 3 atvs", () => {
    const items = [{ SKU: "atv", quantity: 3 }];

    const expectedTotal = 219.0;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });

  it("calculates the total price correctly - 3 for 2 atv deal for 2 atvs", () => {
    const items = [{ SKU: "atv", quantity: 2 }];

    const expectedTotal = 219.0;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });

  it("calculates the total price correctly - 3 for 2 atv deal for 4 atvs", () => {
    const items = [{ SKU: "atv", quantity: 4 }];

    const expectedTotal = 328.5;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });

  it("calculates the total price correctly - ipd bulk discount for 4 ipds", () => {
    const items = [{ SKU: "ipd", quantity: 4 }];

    const expectedTotal = 2199.96;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });

  it("calculates the total price correctly - ipd bulk discount for 5 ipds", () => {
    const items = [{ SKU: "ipd", quantity: 5 }];

    const expectedTotal = 2499.95;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });

  it("calculates the total price correctly - ipd bulk discount for 6 ipds", () => {
    const items = [{ SKU: "ipd", quantity: 6 }];

    const expectedTotal = 2999.94;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });

  it("calculates the total price correctly - free vga with mbp for 1 mbp and 1 vga", () => {
    const items = [
      { SKU: "mbp", quantity: 1 },
      { SKU: "vga", quantity: 1 },
    ];

    const expectedTotal = 1399.99;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });

  it("calculates the total price correctly - free vga with mbp for 1 mbp and 2 vga", () => {
    const items = [
      { SKU: "mbp", quantity: 1 },
      { SKU: "vga", quantity: 2 },
    ];

    const expectedTotal = 1429.99;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });

  it("calculates the total price correctly - free vga with mbp for 1 mbp and 0 vga", () => {
    const items = [{ SKU: "mbp", quantity: 1 }];

    const expectedTotal = 1399.99;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });

  it("calculates the total price correctly given a set of items that fall into all deals", () => {
    const items = [
      { SKU: "atv", quantity: 3 },
      { SKU: "ipd", quantity: 4 },
      { SKU: "mbp", quantity: 2 },
      { SKU: "vga", quantity: 3 },
    ];

    const expectedTotal = 5048.94;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });

  it("calculates the total price correctly given a set of items", () => {
    const items = [
      { SKU: "atv", quantity: 2 },
      { SKU: "ipd", quantity: 2 },
      { SKU: "mbp", quantity: 1 },
    ];

    const expectedTotal = 2718.98;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });
});
