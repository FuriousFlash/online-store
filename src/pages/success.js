import { useState, useEffect } from "react";
import useFetchPriceDetails from "@hooks/useFetchPriceDetails";
import { useCart } from "@context/CartContext";
import { useRouter } from "next/router";

function Success() {
  const { cart, setCart, isCartInitialised } = useCart();
  const { fetchPriceDetails, totalPrice, priceBreakdown, error } =
    useFetchPriceDetails();
  const router = useRouter();

  useEffect(() => {
    if (cart.length === 0 && isCartInitialised) {
      router.push("/");
    }
  }, [cart, isCartInitialised, router]);

  useEffect(() => {
    fetchPriceDetails(cart);
  }, [cart, fetchPriceDetails]);

  if (!isCartInitialised || cart.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

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
        className="transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mt-4"
        onClick={() => {
          router.push("/");
          setCart([]);
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default Success;
