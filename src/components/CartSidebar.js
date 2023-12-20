function CartSidebar({ cart, onRemoveFromCart, onClose }) {
  return (
    <aside className="fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 p-4 shadow-lg">
      <button onClick={onClose}>Close</button>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.SKU} className="flex justify-between items-center mb-2">
            <span>
              {item.name} ({item.quantity})
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => onRemoveFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Checkout
        </button>
      </div>
    </aside>
  );
}

export default CartSidebar;
