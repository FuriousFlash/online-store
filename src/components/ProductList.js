import ProductCard from "@components/ProductCard";

function ProductList({ products, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.SKU}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;
