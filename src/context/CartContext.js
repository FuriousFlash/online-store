import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        setCart(JSON.parse(localCart));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.find(
        (product) => product.SKU === productToAdd.SKU
      );

      if (isProductInCart) {
        return prevCart.map((product) => {
          if (product.SKU === productToAdd.SKU) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        });
      } else {
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productToRemove) => {
    setCart((prevCart) => {
      return prevCart.reduce((acc, product) => {
        if (product.SKU === productToRemove.SKU) {
          return acc;
        }
        return [...acc, product];
      }, []);
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, handleAddToCart, handleRemoveFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
