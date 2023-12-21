import products from "@models/products";
import pricingRules from "@models/pricingRules";

export default function calculateTotalPriceAndBreakDown(items) {
  const skuProductMapping = {
    ipd: 0,
    mbp: 1,
    atv: 2,
    vga: 3,
  };

  let totalPrice = 0.0;
  let breakdown = [];

  items.forEach((item) => {
    const pricingRule = pricingRules[item.SKU];
    const skuPrice = products[skuProductMapping[item.SKU]].price;
    let itemBreakdown = {
      SKU: item.SKU,
      name: products[skuProductMapping[item.SKU]].name,
      quantity: item.quantity,
      originalPrice: skuPrice,
      finalPrice: skuPrice * item.quantity,
      discountApplied: 0,
      discountDescription: "",
    };
    if (pricingRule) {
      if (pricingRule.dealType === "x-for-y") {
        /*
          If it's a x-for-y deal
          You get x units for a price of y units.
        */

        itemBreakdown.discountApplied =
          (item.quantity -
            (Math.floor(item.quantity / pricingRule.x) * pricingRule.y +
              (item.quantity % pricingRule.x))) *
          skuPrice;
        if (itemBreakdown.discountApplied) {
          itemBreakdown.discountDescription = `${pricingRule.x} for ${pricingRule.y} deal applied`;
        }
      } else if (pricingRule.dealType === "bulk-discount") {
        /*
          If it's a bulk-discount
          You get discountPrice if you purchase quantity more than threshold
        */
        if (item.quantity > pricingRule.threshold) {
          itemBreakdown.discountApplied =
            (skuPrice - pricingRule.discountPrice) * item.quantity;
          itemBreakdown.discountDescription = `Bulk discount applied for purchasing more than ${pricingRule.threshold}`;
        }
      } else if (pricingRule.dealType === "bundle") {
        /*
          If it's a bundle deal
          You get 'n' number of free bundledItem with the item
          So we remove upto (quantity * n) bundleItems from the price
          Assuming you get 1 vga for 1 mbp, following are examples
          e.g - 1: If no vga adapter is added with mbp - we don't need to deduct any price.
          e.g - 2: If 2 vga and 1 mbp are bought together - we deduct price of one vga.
          e.g - 3: If 2 vga and 3 mbp are bought together - we deduct price of just 2 vga = min(2,3).
        */
        const bundleItemOrders = items.filter(
          (item) => item.SKU === pricingRule.bundledItem
        );
        if (bundleItemOrders.length > 0) {
          const bundledItemOrder = bundleItemOrders[0];
          const bundledItemPrice =
            products[skuProductMapping[pricingRule.bundledItem]].price;

          const bundleDiscount =
            Math.min(
              bundledItemOrder.quantity,
              item.quantity * pricingRule.quantity
            ) * bundledItemPrice;
          itemBreakdown.discountApplied = bundleDiscount;
          itemBreakdown.discountDescription = `Bundled with ${
            products[skuProductMapping[pricingRule.bundledItem]].name
          }`;
        }
      }
    }

    itemBreakdown.finalPrice -= itemBreakdown.discountApplied;
    totalPrice += itemBreakdown.finalPrice;
    breakdown.push(itemBreakdown);
  });

  return { total: Math.round(totalPrice * 100) / 100, breakdown };
}
