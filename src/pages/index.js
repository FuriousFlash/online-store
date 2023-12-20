import { useState } from "react";
import ProductList from "@components/ProductList";
import CartIcon from "@components/CartIcon";
import CartSidebar from "@components/CartSidebar";
import products from "@models/products";

function HomePage() {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);

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
          if (product.quantity === 1) return acc;
          return [...acc, { ...product, quantity: product.quantity - 1 }];
        }
        return [...acc, product];
      }, []);
    });
  };

  const toggleCart = () => {
    setCartVisible(!isCartVisible);
  };

  const closeCart = () => {
    setCartVisible(false);
  };

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container mx-auto my-8 h-screen w-full">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Online Store</h1>
        <CartIcon itemCount={itemCount} onClick={toggleCart} />
      </header>
      <ProductList products={products} onAddToCart={handleAddToCart} />

      {isCartVisible && (
        <CartSidebar
          cart={cart}
          onRemoveFromCart={handleRemoveFromCart}
          onClose={closeCart}
        />
      )}
    </div>
  );
}

export default HomePage;
