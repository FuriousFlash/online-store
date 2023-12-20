const pricingRules = {
  atv: {
    description: "3 for 2 deal on Apple TVs",
    dealType: "x-for-y",
    x: 3,
    y: 2,
  },
  ipd: {
    description: "Bulk discount on Super iPads",
    dealType: "bulk-discount",
    threshold: 4,
    discountPrice: 499.99,
  },
  mbp: {
    description: "Free VGA adapter with every MacBook Pro",
    dealType: "bundle",
    bundledItem: "vga",
    quantity: 1,
  },
};

export default pricingRules;
