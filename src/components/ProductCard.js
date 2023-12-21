import Image from "next/image";

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="flex flex-col justify-center items-center py-4 m-auto w-full lg:w-80 hover:bg-neutral-200 dark:hover:bg-gray-900 xl:w-80 border dark:bg-gray-900 dark:border-gray-800 border-transparent rounded-lg overflow-hidden shadow-lg hover:shadow-xl dark:hover:border-neutral-700 transition duration-500 hover:scale-110">
      <div className="w-64 h-44">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          object-fit="cover"
          className="rounded-lg w-64 h-44"
        />
      </div>
      <div className="flex flex-col justify-center items-center p-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-700 dark:text-gray-300">${product.price}</p>
        <button
          className="mt-4 transition duration-500 ease-in-out bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition ease-in-out duration-500"
          onClick={() => {
            onAddToCart(product);
          }}
          data-testid="add-to-cart-button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
