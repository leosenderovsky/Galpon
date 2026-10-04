import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
// DEMO ONLY — borrar este import y esta línea, más PrototypeBanner.tsx y demoBanner.config.ts, para pasar este proyecto a un cliente real
import { PrototypeBanner } from './components/PrototypeBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { VideoSection } from './components/VideoSection';
import { WholesaleB2B } from './components/WholesaleB2B';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { BRAND } from './brand.config';

const MainAppContent: React.FC = () => {
  const { activeProductModal, setActiveProductModal, totalItems, setIsCartOpen } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-brand-background text-brand-text relative pt-10 sm:pt-9 lg:pt-8 [&>header]:top-10 sm:[&>header]:top-9 lg:[&>header]:top-8">
      <PrototypeBanner />
      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Catalog Section with Filters & Quick Actions */}
        <Catalog />

        {/* 3. Native Video Player ("Cómo Comprar en 3 Pasos") */}
        <VideoSection />

        {/* 4. Wholesale B2B Direct Inquiries */}
        <WholesaleB2B />

        {/* 5. Verified Client Testimonials */}
        {BRAND.testimonials.length > 0 && <Testimonials />}
      </main>

      {/* Footer with mandatory demonstration legend */}
      <Footer />

      {/* Interactive Overlays & Modals */}
      {/* Ficha Técnica Modal */}
      {activeProductModal && (
        <ProductModal
          product={activeProductModal}
          onClose={() => setActiveProductModal(null)}
        />
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Checkout & Delivery Details Modal with Live WhatsApp Bubble */}
      <CheckoutModal />

      {/* Official IRAM Size Guide Modal */}
      <SizeGuideModal />

      {/* Mobile Floating Sticky Quick-Order Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-30 sm:hidden">
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="w-full bg-brand-primary text-white p-3.5 shadow-2xl flex items-center justify-between font-body text-xs uppercase tracking-wider font-bold border border-white/20 active:scale-98 transition-transform"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">shopping_bag</span>
            <span>Ver Mi Pedido ({totalItems})</span>
          </div>
          <span className="bg-brand-secondary px-2.5 py-1 text-white">
            Confirmar por WhatsApp →
          </span>
        </button>
      </div>

      {/* Direct Floating WhatsApp Contact Button on Desktop */}
      <a
        href={`https://wa.me/${BRAND.whatsapp.rawNumber}?text=${encodeURIComponent(BRAND.whatsapp.defaultInquiryText)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp"
        className="hidden sm:flex fixed bottom-6 right-6 z-30 w-14 h-14 bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white rounded-full items-center justify-center shadow-2xl hover:scale-105 transition-transform"
        title="Consultar por WhatsApp"
      >
        <span className="material-symbols-outlined text-3xl">chat</span>
      </a>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}
