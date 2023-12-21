import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";

function CartIcon({ itemCount, onClick }) {
  return (
    <div
      className="relative cursor-pointer"
      onClick={onClick}
      data-testid="show-cart"
    >
      <div className="relative flex flex-row justify-center items-center w-12 h-12 p-2 border border-black dark:border-white hover:border-transparent dark:hover:border-gray-900 hover:scale-110 transition duration-500 ease-in-out rounded-full">
        {itemCount > 0 ? (
          <HiShoppingCart
            data-testid="HiShoppingCart"
            className="w-full h-full"
          />
        ) : (
          <HiOutlineShoppingCart
            data-testid="HiOutlineShoppingCart"
            className="w-full h-full"
          />
        )}
      </div>
      {itemCount > 0 && (
        <div>
          <div className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 border border-red-600 rounded-full">
            {itemCount}
          </div>
          <div className="absolute animate-ping -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-transparent bg-transparent border border-red-600 rounded-full">
            {itemCount}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartIcon;
