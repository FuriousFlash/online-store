import calculateTotalPrice from "@services/calculateTotalPrice";

describe("calculateTotalPrice", () => {
  it("calculates the total price correctly given a set of items", () => {
    const items = [
      { SKU: "atv", quantity: 3 },
      { SKU: "ipd", quantity: 2 },
    ];

    const expectedTotal = 1318.99;
    const total = calculateTotalPrice(items);
    expect(total).toBe(expectedTotal);
  });
});
