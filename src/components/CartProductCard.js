import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

function CartProductCard({ item, onRemoveFromCart }) {
  return (
    <div className="flex items-center justify-between space-x-4 p-2 border-b transition duration-500 ease-in-out hover:bg-neutral-300 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-black">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-10 relative">
          <Image
            src={item.image}
            alt={item.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h5 className="font-bold">{item.name}</h5>
          <p className="text-sm">${item.price.toFixed(2)}</p>
          <p className="text-sm">Qty: {item.quantity}</p>
        </div>
      </div>
      <div className="text-right">
        <button
          onClick={() => onRemoveFromCart(item)}
          className="text-red-500 hover:text-red-700 transition duration-500 ease-in-out"
        >
          <AiOutlineClose size={20} />
        </button>
        <p className="text-sm font-bold">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default CartProductCard;
