import React from 'react';
import { BRAND } from '../brand.config';
import { useCart } from '../context/CartContext';
import { GalponLogo } from './GalponLogo';

export const Footer: React.FC = () => {
  const { setIsSizeGuideModalOpen, setSelectedCategoryForGuide, setIsCartOpen } = useCart();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#152536] text-[#ffffff] pt-14 pb-8 border-t border-[#ffffff]/10" id="contacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* 4 Column Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#ffffff]/15">
          {/* Col 1: Brand & Guarantee */}
          <div className="flex flex-col gap-4">
            <GalponLogo className="h-10" variant="light" />

            <p className="font-body text-xs sm:text-sm text-[#b8c8de] leading-relaxed">
              Ropa de trabajo y básicos pensados para durar. Venta minorista y por curva mayorista para cuadrillas, talleres y comercios de todo el país.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="material-symbols-outlined text-[#ffdcbf] text-lg">shield</span>
              <span className="font-body text-[11px] uppercase tracking-wider text-[#b8c8de] font-semibold">
                Garantía de confección industrial
              </span>
            </div>
          </div>

          {/* Col 2: Guides & Support */}
          <div className="flex flex-col gap-3">
            <span className="font-body text-xs uppercase tracking-wider text-[#ffdcbf] font-bold">
              Asistencia y Guías
            </span>
            <ul className="flex flex-col gap-2 font-body text-xs sm:text-sm text-[#b8c8de]">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategoryForGuide('camperas');
                    setIsSizeGuideModalOpen(true);
                  }}
                  className="hover:text-[#ffffff] transition-colors cursor-pointer text-left"
                >
                  Guía de Talles y Medidas Exactas (IRAM)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('como-comprar')}
                  className="hover:text-[#ffffff] transition-colors cursor-pointer text-left"
                >
                  Políticas de Cambio y Devolución (15 días)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('como-comprar')}
                  className="hover:text-[#ffffff] transition-colors cursor-pointer text-left"
                >
                  Envíos a todo el país por Expreso y Correo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="hover:text-[#ffffff] transition-colors cursor-pointer text-left"
                >
                  Estado y Seguimiento de tu Pedido
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Wholesale Channels */}
          <div className="flex flex-col gap-3">
            <span className="font-body text-xs uppercase tracking-wider text-[#ffdcbf] font-bold">
              Canales Mayoristas
            </span>
            <ul className="flex flex-col gap-2 font-body text-xs sm:text-sm text-[#b8c8de]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('mayoristas')}
                  className="hover:text-[#ffffff] transition-colors cursor-pointer text-left"
                >
                  Presupuestos por Volumen & Licitaciones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('mayoristas')}
                  className="hover:text-[#ffffff] transition-colors cursor-pointer text-left"
                >
                  Facturación Oficial A / CUIT
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${BRAND.whatsapp.rawNumber}?text=${encodeURIComponent(BRAND.whatsapp.wholesaleInquiryText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ffffff] transition-colors"
                >
                  Mesa WhatsApp Comercial B2B
                </a>
              </li>
              <li>
                <span className="text-[#b8c8de]">
                  Retiro en Depósito Central ({BRAND.address.short})
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Warehouse & Contact */}
          <div className="flex flex-col gap-3">
            <span className="font-body text-xs uppercase tracking-wider text-[#ffdcbf] font-bold">
              Depósito & Contacto
            </span>
            <div className="flex flex-col gap-1.5 font-body text-xs sm:text-sm text-[#b8c8de]">
              <span className="text-[#ffffff] font-medium">{BRAND.address.full}</span>
              <span>{BRAND.address.pickupHours}</span>
              <span className="text-[#ffdcbf]">{BRAND.email}</span>
              <span className="text-[#ffffff] font-bold mt-1">
                WhatsApp: {BRAND.whatsapp.display}
              </span>

              {/* Social Icons */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={`https://wa.me/${BRAND.whatsapp.rawNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="p-2 bg-[#000f20] hover:bg-[#7c5733] transition-colors text-[#ffffff] flex items-center justify-center border border-[#ffffff]/15"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  aria-label="Email"
                  className="p-2 bg-[#000f20] hover:bg-[#7c5733] transition-colors text-[#ffffff] flex items-center justify-center border border-[#ffffff]/15"
                >
                  <span className="material-symbols-outlined text-sm">mail</span>
                </a>
                <a
                  href="tel:+5491140008800"
                  aria-label="Teléfono"
                  className="p-2 bg-[#000f20] hover:bg-[#7c5733] transition-colors text-[#ffffff] flex items-center justify-center border border-[#ffffff]/15"
                >
                  <span className="material-symbols-outlined text-sm">call</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-body text-[11px] text-[#7c8ca1]">
          <p>© 2025 {BRAND.name} INDUMENTARIA. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span>CUIT {BRAND.cuit}</span>
            <span className="opacity-40">|</span>
            <span>DEFENSA DEL CONSUMIDOR</span>
          </div>
        </div>

        {/* MANDATORY SENDER.IA PROTOTYPE NOTICE */}
        <div className="mt-8 pt-4 border-t border-[#ffffff]/10 text-center">
          <p className="font-body text-[10px] text-[#7c8ca1] uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">
            {BRAND.demoLegend}
          </p>
        </div>
      </div>
    </footer>
  );
};
