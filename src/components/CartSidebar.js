import { useRouter } from "next/router";
import CartProductCard from "@components/CartProductCard";
import { AiOutlineClose } from "react-icons/ai";
import { useCart } from "@context/CartContext";

function CartSidebar({ onClose }) {
  const { cart, handleRemoveFromCart } = useCart();
  const router = useRouter();
  return (
    <aside className="fixed inset-y-0 right-0 w-72 bg-white dark:bg-gray-800 p-4 shadow-lg">
      <div
        className="flex flex-row justify-between items-center mb-4"
        data-testid="cart-sidebar"
      >
        <div>
          <h2 className="text-2xl font-bold">Your Cart</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          data-testid="hide-cart"
          className="border rounded-full p-2 transition duration-500 ease-in-out hover:bg-neutral-300 dark:bg-gray-800 dark:hover:bg-gray-900 dark:hover:border-neutral-400"
        >
          <AiOutlineClose size={20} />
        </button>
      </div>
      <div>
        {cart.map((item) => (
          <CartProductCard
            key={item.SKU}
            item={item}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ))}
        {cart.length === 0 && (
          <div className="text-lg font-bold">Add items to continue...</div>
        )}
      </div>
      <div className="mt-4">
        <button
          className={`${
            cart.length === 0
              ? "bg-gray-600 dark:text-black text-white cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-black transition duration-500 ease-in-out"
          } font-bold py-2 px-4 rounded-lg`}
          disabled={cart.length === 0}
          onClick={() => router.push("/checkout")}
        >
          Checkout
        </button>
      </div>
    </aside>
  );
}

export default CartSidebar;
