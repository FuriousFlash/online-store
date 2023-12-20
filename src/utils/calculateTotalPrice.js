import products from "@models/products";
import pricingRules from "@models/pricingRules";

export default function calculateTotalPrice(items) {
  const skuProductMapping = {
    ipd: 0,
    mbp: 1,
    atv: 2,
    vga: 3,
  };

  let totalPrice = 0.0;

  items.forEach((item) => {
    const pricingRule = pricingRules[item.SKU];
    const skuPrice = products[skuProductMapping[item.SKU]].price;
    if (pricingRule) {
      if (pricingRule.dealType === "x-for-y") {
        /*
          If it's a x-for-y deal
          You get x units for a price of y units.
        */
        totalPrice +=
          (Math.floor(item.quantity / pricingRule.x) * pricingRule.y +
            (item.quantity % pricingRule.x)) *
          skuPrice;
      } else if (pricingRule.dealType === "bulk-discount") {
        /*
          If it's a bulk-discount
          You get discountPrice if you purchase quantity more than threshold
        */
        if (item.quantity > pricingRule.threshold) {
          totalPrice += item.quantity * pricingRule.discountPrice;
        } else {
          totalPrice += skuPrice * item.quantity;
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
          totalPrice -=
            Math.min(
              bundledItemOrder.quantity,
              item.quantity * pricingRule.quantity
            ) * bundledItemPrice;
        }
        totalPrice += skuPrice * item.quantity;
      }
    } else {
      totalPrice += skuPrice * item.quantity;
    }
  });

  return Math.round(totalPrice * 100) / 100;
}
