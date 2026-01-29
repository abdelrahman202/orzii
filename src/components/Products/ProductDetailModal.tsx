import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../../types/product';

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (productId: string, quantity: number) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const handleAddToCart = () => {
    onAddToCart?.(product.id, quantity);
    onClose();
  };

  const statusColors = {
    available: 'text-green-600',
    'coming-soon': 'text-yellow-600',
    'sold-out': 'text-gray-600',
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex flex-col md:flex-row">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-[#243247] text-white p-2 rounded-full hover:bg-[#e7ddcc] hover:text-[#243247] transition-all duration-300"
          >
            <X size={24} />
          </button>

          <div className="w-full md:w-1/2 relative bg-gray-100">
            <div
              className={`relative h-96 md:h-full cursor-zoom-in transition-all duration-300 ${
                isZoomed ? 'scale-125 cursor-zoom-out' : ''
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
                >
                  <ChevronLeft size={24} className="text-[#243247]" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
                >
                  <ChevronRight size={24} className="text-[#243247]" />
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-[#243247] w-6' : 'bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-[#243247] mb-2">
                    {product.name}
                  </h2>
                  <p className={`text-sm font-semibold ${statusColors[product.status]}`}>
                    {product.status === 'available'
                      ? 'In Stock'
                      : product.status === 'coming-soon'
                        ? 'Coming Soon'
                        : 'Sold Out'}
                  </p>
                </div>
              </div>

              <p className="text-xl font-bold text-[#243247] mb-6">
                ${product.price}
              </p>

              <p className="text-gray-700 mb-8">{product.description}</p>

              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-bold text-[#243247]">Specifications</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-semibold">Material:</span>
                    <span>{product.specs.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Coating:</span>
                    <span>{product.specs.coating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Resistance:</span>
                    <span>{product.specs.resistance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Size:</span>
                    <span>{product.specs.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Color:</span>
                    <span>{product.specs.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Unisex:</span>
                    <span>{product.specs.unisex ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>

            {product.status === 'available' && (
              <div className="space-y-4 border-t pt-8">
                <div className="flex items-center gap-4">
                  <label className="font-semibold text-[#243247]">Quantity:</label>
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-3 bg-[#243247] text-[#e7ddcc] font-bold rounded-lg hover:bg-[#e7ddcc] hover:text-[#243247] transition-all duration-300 transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
