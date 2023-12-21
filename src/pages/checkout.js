import { useState, useEffect } from "react";
import CartProductCard from "@components/CartProductCard";
import useFetchPriceDetails from "@hooks/useFetchPriceDetails";
import { useCart } from "@context/CartContext";
import { useRouter } from "next/router";

function CheckoutSummary({ priceBreakdown, totalPrice }) {
  return (
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
      <p className="font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
}

function Checkout() {
  const { cart, handleRemoveFromCart, isCartInitialised } = useCart();
  const { fetchPriceDetails, totalPrice, priceBreakdown, error } =
    useFetchPriceDetails();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cart.length === 0 && isCartInitialised) {
      router.push("/");
    }
  }, [cart, isCartInitialised, router]);

  useEffect(() => {
    fetchPriceDetails(cart);
  }, [cart]);

  const handleCompletePurchase = () => {
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    router.push("/success");
    return null;
  }

  if (!isCartInitialised || cart.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Loading...</p>
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
                  router.push("/");
                }
              }}
            />
          ))}
        </div>
        <div>
          <h2 className="font-bold text-2xl mb-4">Order Summary</h2>
          <div className="p-4 border rounded">
            {error && <p className="error">{error.message}</p>}
            {priceBreakdown ? (
              <CheckoutSummary
                priceBreakdown={priceBreakdown}
                totalPrice={totalPrice}
              />
            ) : (
              <p>Loading pricing details...</p>
            )}
            <button
              onClick={handleCompletePurchase}
              className="transition duration-500 ease-in-out bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
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
