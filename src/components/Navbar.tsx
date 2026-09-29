import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { BRAND } from '../brand.config';
import { formatARS } from '../products';
import { GalponLogo } from './GalponLogo';

export const Navbar: React.FC = () => {
  const { totalItems, total, setIsCartOpen, setIsSizeGuideModalOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Ledger Strip */}
      <div className="bg-[#152536] text-[#ffffff] py-1.5 px-4 sm:px-8 border-b border-[#e1e2e4]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-body text-[11px] sm:text-xs uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span>ENVÍOS A TODO EL PAÍS</span>
            <span className="opacity-40">/</span>
            <span className="text-[#fdcb9e] font-bold">PRECIOS MAYORISTAS DESDE 6 UNIDADES</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-[#7c8ca1]">DEPÓSITO CENTRAL: {BRAND.address.short}</span>
            <span className="opacity-40">/</span>
            <button
              onClick={() => setIsSizeGuideModalOpen(true)}
              className="text-[#ffffff] hover:text-[#fdcb9e] transition-colors underline cursor-pointer"
            >
              TABLA DE MEDIDAS IRAM
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 w-full z-40 bg-[#f8f9fb]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-[#e1e2e4]">
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-8">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center group cursor-pointer"
              aria-label="Inicio GALPON"
            >
              <GalponLogo className="h-10 sm:h-11" variant="dark" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => scrollTo('catalogo')}
                className="font-body text-sm uppercase tracking-wider text-[#44474c] hover:text-[#000f20] hover:font-bold py-2 transition-all cursor-pointer"
              >
                Catálogo
              </button>
              <button
                onClick={() => scrollTo('como-comprar')}
                className="font-body text-sm uppercase tracking-wider text-[#44474c] hover:text-[#000f20] hover:font-bold py-2 transition-all cursor-pointer"
              >
                Cómo Comprar
              </button>
              <button
                onClick={() => scrollTo('mayoristas')}
                className="font-body text-sm uppercase tracking-wider text-[#44474c] hover:text-[#000f20] hover:font-bold py-2 transition-all cursor-pointer"
              >
                Mayoristas B2B
              </button>
              <button
                onClick={() => scrollTo('contacto')}
                className="font-body text-sm uppercase tracking-wider text-[#44474c] hover:text-[#000f20] hover:font-bold py-2 transition-all cursor-pointer"
              >
                Contacto
              </button>
            </nav>
          </div>

          {/* Action Zone: WhatsApp Contact & Cart Trigger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Direct WhatsApp Callout */}
            <a
              href={`https://wa.me/${BRAND.whatsapp.rawNumber}?text=${encodeURIComponent(BRAND.whatsapp.defaultInquiryText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#edeef0] px-3.5 py-2 border border-[#c4c6cd] hover:bg-[#e7e8ea] transition-colors"
            >
              <span className="material-symbols-outlined text-[#7c5733] text-lg">chat</span>
              <div className="flex flex-col text-left">
                <span className="font-body text-[10px] text-[#44474c] uppercase font-bold">Atención WhatsApp</span>
                <span className="font-body text-xs font-bold text-[#191c1e]">{BRAND.whatsapp.display}</span>
              </div>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center bg-[#152536] text-[#ffffff] px-4 py-2.5 gap-2.5 hover:bg-[#000f20] transition-colors cursor-pointer shadow-sm group active:translate-y-0.5"
              aria-label="Abrir carrito de compras"
            >
              <div className="relative flex items-center">
                <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">shopping_bag</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-[#7c5733] text-[#ffffff] font-body text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left pl-1">
                <span className="font-body text-[10px] uppercase text-[#7c8ca1]">Total Pedido</span>
                <span className="font-body text-xs font-bold text-[#ffffff]">{formatARS(total)}</span>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#000f20] hover:bg-[#edeef0] transition-colors"
              aria-label="Abrir menú"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#ffffff] border-b border-[#e1e2e4] px-4 py-4 flex flex-col gap-3 shadow-lg">
            <button
              onClick={() => scrollTo('catalogo')}
              className="text-left font-body text-sm uppercase tracking-wider font-bold text-[#191c1e] py-2 border-b border-[#f3f4f6]"
            >
              Catálogo de Existencias
            </button>
            <button
              onClick={() => scrollTo('como-comprar')}
              className="text-left font-body text-sm uppercase tracking-wider font-bold text-[#191c1e] py-2 border-b border-[#f3f4f6]"
            >
              Cómo Comprar en 3 Pasos
            </button>
            <button
              onClick={() => scrollTo('mayoristas')}
              className="text-left font-body text-sm uppercase tracking-wider font-bold text-[#191c1e] py-2 border-b border-[#f3f4f6]"
            >
              Canal Mayorista & Cuadrillas
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSizeGuideModalOpen(true);
              }}
              className="text-left font-body text-sm uppercase tracking-wider font-bold text-[#7c5733] py-2 border-b border-[#f3f4f6]"
            >
              Guía de Talles y Medidas
            </button>
            <button
              onClick={() => scrollTo('contacto')}
              className="text-left font-body text-sm uppercase tracking-wider font-bold text-[#191c1e] py-2"
            >
              Depósito & Contacto
            </button>

            <a
              href={`https://wa.me/${BRAND.whatsapp.rawNumber}?text=${encodeURIComponent(BRAND.whatsapp.defaultInquiryText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 bg-[#edeef0] text-[#191c1e] py-2.5 font-body text-xs font-bold uppercase border border-[#c4c6cd]"
            >
              <span className="material-symbols-outlined text-[#7c5733] text-base">chat</span>
              WhatsApp Directo: {BRAND.whatsapp.display}
            </a>
          </div>
        )}
      </header>
    </>
  );
};
