import "@styles/globals.css";
import { CartProvider } from "src/context/CartContext";

function OnlineStore({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default OnlineStore;
