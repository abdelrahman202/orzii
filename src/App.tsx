import { useState, useRef } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import CollectionGrid from './components/Collections/CollectionGrid';
import ProductGrid from './components/Products/ProductGrid';
import ProductDetailModal from './components/Products/ProductDetailModal';
import StorySection from './components/Story/StorySection';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer/Footer';
import SuccessModal from './components/SuccessModal';
import { OrderFormData } from './types/form';
import { products } from './data/products';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [activeSection, setActiveSection] = useState<'home' | 'shop' | 'story' | 'contact'>('home');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const shopRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: 'home' | 'shop' | 'story' | 'contact') => {
    setActiveSection(section);

    if (section === 'shop' && shopRef.current) {
      shopRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'story' && storyRef.current) {
      storyRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleHeroShop = () => {
    handleNavigate('shop');
  };

  const handleHeroStory = () => {
    handleNavigate('story');
  };

  const selectedProductData = selectedProduct
    ? products.find((p) => p.id === selectedProduct)
    : null;

  const handleSubmit = async (data: OrderFormData) => {
    const now = Date.now();
    if (now - lastSubmitTime < 1000) {
      return;
    }
    setLastSubmitTime(now);
    setIsSubmitting(true);

    try {
      const totalQuantity = data.straightQuantity + data.curvedQuantity + data.curvedGoldQuantity;
      const totalPrice = totalQuantity * 360;

      const formDataToSend = {
        name: data.name,
        phone: data.phone,
        governorate: data.governorate,
        area: data.area,
        address: data.address,
        straightQty: data.straightQuantity,
        curvedQty: data.curvedQuantity,
        curvedGoldQty: data.curvedGoldQuantity,
        totalPrice: totalPrice,
        timestamp: new Date().toISOString(),
      };

      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby8uj_Mc166lFj9mVHIrVHUHm00SYGbjNT-7_0xzPGnEF12IYU0CiD5QZOA3771r6mW/exec';

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      setShowModal(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      <main>
        <Hero onShopClick={handleHeroShop} onStoryClick={handleHeroStory} />

        <CollectionGrid onCollectionSelect={handleNavigate} />

        <div ref={shopRef}>
          <ProductGrid
            onProductSelect={(productId) => setSelectedProduct(productId)}
            onAddToCart={(productId) => setSelectedProduct(productId)}
          />
        </div>

        <div ref={storyRef}>
          <StorySection />
        </div>

        <section className="py-16 md:py-24 bg-[#f7f2ea]">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-[#243247] mb-12 text-center">
              اطلب الآن
            </h2>
            <OrderForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </section>
      </main>

      <Footer />

      {selectedProductData && (
        <ProductDetailModal
          product={selectedProductData}
          isOpen={selectedProduct !== null}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(productId) => {
            setSelectedProduct(null);
          }}
        />
      )}

      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default App;
