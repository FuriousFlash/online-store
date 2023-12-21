import { useState, useEffect } from "react";
import CartProductCard from "@components/CartProductCard";
import useFetchPriceDetails from "@hooks/useFetchPriceDetails";
import { useCart } from "@context/CartContext";

function Checkout() {
  const { cart, setCart, handleRemoveFromCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const { fetchPriceDetails, totalPrice, priceBreakdown, error } =
    useFetchPriceDetails();

  useEffect(() => {
    fetchPriceDetails(cart);
  }, [cart, fetchPriceDetails]);
  const handleCompletePurchase = () => {
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="dark:bg-gray-800 flex flex-col mx-auto my-auto h-screen justify-center items-center p-4">
        <h1 className="text-3xl font-bold mb-8">Checkout Successful</h1>
        <p className="mb-4">
          Thank you for your purchase! Here's a summary of your order:
        </p>
        <div className="flex flex-col justify-center items-start">
          <div>
            {priceBreakdown && (
              <div>
                {priceBreakdown.map((item, index) => (
                  <div key={index}>
                    <p>
                      {item.name} (x{item.quantity}) - Final Price: $
                      {item.finalPrice.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="font-bold mt-4">Total Price: ${totalPrice.toFixed(2)}</p>
        <button
          className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mt-4"
          onClick={() => {
            window.location.href = "/";
            setCart([]);
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-800 flex flex-col mx-auto my-auto h-screen justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Items</h2>
          {cart.map((item) => (
            <CartProductCard
              key={item.SKU}
              item={item}
              onRemoveFromCart={() => {
                handleRemoveFromCart(item);
                if (cart.length === 1) {
                  window.location.href = "/";
                }
              }}
            />
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="p-4 border rounded">
            {priceBreakdown && (
              <div className="flex flex-col gap-4">
                {priceBreakdown.map((item, index) => (
                  <div key={index}>
                    <p>
                      {item.name} (x{item.quantity}) - Original: $
                      {(item.originalPrice * item.quantity).toFixed(2)}
                    </p>
                    {item.discountApplied > 0 && (
                      <p>
                        Discount: {item.discountDescription} -$
                        {item.discountApplied.toFixed(2)}
                      </p>
                    )}
                    <p>Final Price: ${item.finalPrice.toFixed(2)}</p>
                  </div>
                ))}
                <p className="font-bold">
                  Total Price: ${totalPrice.toFixed(2)}
                </p>
              </div>
            )}
            <button
              onClick={handleCompletePurchase}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Complete Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
