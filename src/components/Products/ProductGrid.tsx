import { products } from '../../data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  onProductSelect?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onOrderFormOpen?: () => void;
}

export default function ProductGrid({
  onProductSelect,
  onAddToCart,
  onOrderFormOpen,
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onProductSelect}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onOrderFormOpen}
            className="px-12 py-4 bg-[#243247] text-[#e7ddcc] font-bold text-lg rounded-lg hover:bg-[#e7ddcc] hover:text-[#243247] transition-all duration-300 transform hover:scale-105"
          >
            Order one of our signature bracelets today
          </button>
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
