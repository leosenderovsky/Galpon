import React, { useState } from 'react';
import { Txt } from './Txt';
import { useCart } from '../context/CartContext';
import { BRAND, formatText } from '../brand.config';
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
      <div className="bg-brand-primary text-white py-1.5 px-4 sm:px-8 border-b border-brand-border-soft/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-body text-[11px] sm:text-xs uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Txt as="span" value={BRAND.ui.navbar.topShipping} />
            <span className="opacity-40">/</span>
            <Txt as="span" className="text-brand-accent font-bold" value={BRAND.ui.navbar.topWholesale} />
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Txt as="span" className="text-brand-text-muted" value={formatText(BRAND.ui.navbar.topWarehouseLine, { place: BRAND.address.short })} />
            <span className="opacity-40">/</span>
            <Txt as="button"
              onClick={() => setIsSizeGuideModalOpen(true)}
              className="text-white hover:text-brand-accent transition-colors underline cursor-pointer" value={BRAND.ui.navbar.topSizeTable} />
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 w-full z-40 bg-brand-background/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-brand-border-soft">
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
              aria-label={formatText(BRAND.ui.navbar.homeLabel, { name: BRAND.name })}
            >
              <GalponLogo className="h-10 sm:h-11" variant="dark" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Txt as="button"
                onClick={() => scrollTo('catalogo')}
                className="font-body text-sm uppercase tracking-wider text-brand-text-secondary hover:text-brand-primary-deep hover:font-bold py-2 transition-all cursor-pointer" value={BRAND.ui.navbar.catalog} />
              <Txt as="button"
                onClick={() => scrollTo('como-comprar')}
                className="font-body text-sm uppercase tracking-wider text-brand-text-secondary hover:text-brand-primary-deep hover:font-bold py-2 transition-all cursor-pointer" value={BRAND.ui.navbar.howToBuy} />
              <Txt as="button"
                onClick={() => scrollTo('mayoristas')}
                className="font-body text-sm uppercase tracking-wider text-brand-text-secondary hover:text-brand-primary-deep hover:font-bold py-2 transition-all cursor-pointer" value={BRAND.ui.navbar.b2b} />
              <Txt as="button"
                onClick={() => scrollTo('contacto')}
                className="font-body text-sm uppercase tracking-wider text-brand-text-secondary hover:text-brand-primary-deep hover:font-bold py-2 transition-all cursor-pointer" value={BRAND.ui.navbar.contact} />
            </nav>
          </div>

          {/* Action Zone: WhatsApp Contact & Cart Trigger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Direct WhatsApp Callout */}
            <a
              href={`https://wa.me/${BRAND.whatsapp.rawNumber}?text=${encodeURIComponent(BRAND.whatsapp.defaultInquiryText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-brand-surface-subtle px-3.5 py-2 border border-brand-border hover:bg-brand-surface-hover transition-colors"
            >
              <span className="material-symbols-outlined text-brand-secondary text-lg">chat</span>
              <div className="flex flex-col text-left">
                <Txt as="span" className="font-body text-[10px] text-brand-text-secondary uppercase font-bold" value={BRAND.ui.navbar.whatsapp} />
                <span className="font-body text-xs font-bold text-brand-text">{BRAND.whatsapp.display}</span>
              </div>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center bg-brand-primary text-white px-4 py-2.5 gap-2.5 hover:bg-brand-primary-deep transition-colors cursor-pointer shadow-sm group active:translate-y-0.5"
              aria-label={BRAND.ui.navbar.cartLabel}
            >
              <div className="relative flex items-center">
                <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">shopping_bag</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-brand-secondary text-white font-body text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left pl-1">
                <Txt as="span" className="font-body text-[10px] uppercase text-brand-text-muted" value={BRAND.ui.navbar.cartTotal} />
                <span className="font-body text-xs font-bold text-white">{formatARS(total)}</span>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-brand-primary-deep hover:bg-brand-surface-subtle transition-colors"
              aria-label={BRAND.ui.navbar.menuLabel}
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-brand-border-soft px-4 py-4 flex flex-col gap-3 shadow-lg">
            <Txt as="button"
              onClick={() => scrollTo('catalogo')}
              className="text-left font-body text-sm uppercase tracking-wider font-bold text-brand-text py-2 border-b border-brand-surface-muted" value={BRAND.ui.navbar.mobileCatalog} />
            <Txt as="button"
              onClick={() => scrollTo('como-comprar')}
              className="text-left font-body text-sm uppercase tracking-wider font-bold text-brand-text py-2 border-b border-brand-surface-muted" value={BRAND.ui.navbar.mobileHowToBuy} />
            <Txt as="button"
              onClick={() => scrollTo('mayoristas')}
              className="text-left font-body text-sm uppercase tracking-wider font-bold text-brand-text py-2 border-b border-brand-surface-muted" value={BRAND.ui.navbar.mobileB2b} />
            <Txt as="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSizeGuideModalOpen(true);
              }}
              className="text-left font-body text-sm uppercase tracking-wider font-bold text-brand-secondary py-2 border-b border-brand-surface-muted" value={BRAND.ui.navbar.mobileSizeGuide} />
            <Txt as="button"
              onClick={() => scrollTo('contacto')}
              className="text-left font-body text-sm uppercase tracking-wider font-bold text-brand-text py-2" value={BRAND.ui.navbar.mobileContact} />

            <a
              href={`https://wa.me/${BRAND.whatsapp.rawNumber}?text=${encodeURIComponent(BRAND.whatsapp.defaultInquiryText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 bg-brand-surface-subtle text-brand-text py-2.5 font-body text-xs font-bold uppercase border border-brand-border"
            >
              <span className="material-symbols-outlined text-brand-secondary text-base">chat</span>
              {formatText(BRAND.ui.navbar.mobileWhatsappLine, { phone: BRAND.whatsapp.display })}
            </a>
          </div>
        )}
      </header>
    </>
  );
};
