import { products } from '../../data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  onProductSelect?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
}

export default function ProductGrid({
  onProductSelect,
  onAddToCart,
}: ProductGridProps) {
  const availableProducts = products.filter((p) => p.status === 'available');

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#243247] mb-4">
            Signature Collection
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover our handcrafted bracelets, each piece a testament to timeless elegance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onProductSelect}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {availableProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No products available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
