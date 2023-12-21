import { useState } from "react";

const useFetchPriceDetails = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceBreakdown, setPriceBreakdown] = useState(null);
  const [error, setError] = useState(null);

  const fetchPriceDetails = async (cart) => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTotalPrice(data.total);
      setPriceBreakdown(data.breakdown);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error);
    }
  };

  return { fetchPriceDetails, totalPrice, priceBreakdown, error };
};

export default useFetchPriceDetails;
