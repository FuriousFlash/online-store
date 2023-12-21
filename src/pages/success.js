import { useState, useEffect } from "react";
import useFetchPriceDetails from "@hooks/useFetchPriceDetails";
import { useCart } from "@context/CartContext";
import { useRouter } from "next/router";

function Success() {
  const { cart, setCart } = useCart();
  const { fetchPriceDetails, totalPrice, priceBreakdown, error } =
    useFetchPriceDetails();
  const router = useRouter();

  useEffect(() => {
    fetchPriceDetails(cart);
  }, [cart, fetchPriceDetails]);

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
