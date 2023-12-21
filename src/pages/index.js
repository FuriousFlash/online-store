import { useState } from "react";
import ProductList from "@components/ProductList";
import CartIcon from "@components/CartIcon";
import CartSidebar from "@components/CartSidebar";
import products from "@models/products";
import { useCart } from "@context/CartContext";

function HomePage() {
  const { cart, handleAddToCart, handleRemoveFromCart } = useCart();
  const [isCartVisible, setCartVisible] = useState(false);

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
