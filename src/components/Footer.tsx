import React from 'react';
import { Txt } from './Txt';
import { BRAND, formatText } from '../brand.config';
import { useCart } from '../context/CartContext';
import { GalponLogo } from './GalponLogo';

export const Footer: React.FC = () => {
  const { setIsSizeGuideModalOpen, setSelectedCategoryForGuide, setIsCartOpen } = useCart();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-brand-primary text-white pt-14 pb-8 border-t border-white/10" id="contacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* 4 Column Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/15">
          {/* Col 1: Brand & Guarantee */}
          <div className="flex flex-col gap-4">
            <GalponLogo className="h-10" variant="light" />

            <Txt as="p" className="font-body text-xs sm:text-sm text-brand-text-on-dark leading-relaxed" value={BRAND.footer.about} />

            <div className="flex items-center gap-2 pt-2">
              <span className="material-symbols-outlined text-brand-accent-light text-lg">shield</span>
              <Txt as="span" className="font-body text-[11px] uppercase tracking-wider text-brand-text-on-dark font-semibold" value={BRAND.footer.guarantee} />
            </div>
          </div>

          {/* Col 2: Guides & Support */}
          <div className="flex flex-col gap-3">
            <Txt as="span" className="font-body text-xs uppercase tracking-wider text-brand-accent-light font-bold" value={BRAND.footer.helpTitle} />
            <ul className="flex flex-col gap-2 font-body text-xs sm:text-sm text-brand-text-on-dark">
              <li>
                <Txt as="button"
                  type="button"
                  onClick={() => {
                    setSelectedCategoryForGuide('camperas');
                    setIsSizeGuideModalOpen(true);
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left" value={BRAND.footer.helpSizeGuide} />
              </li>
              <li>
                <Txt as="button"
                  type="button"
                  onClick={() => scrollTo('como-comprar')}
                  className="hover:text-white transition-colors cursor-pointer text-left" value={BRAND.footer.helpReturns} />
              </li>
              <li>
                <Txt as="button"
                  type="button"
                  onClick={() => scrollTo('como-comprar')}
                  className="hover:text-white transition-colors cursor-pointer text-left" value={BRAND.footer.helpShipping} />
              </li>
              <li>
                <Txt as="button"
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer text-left" value={BRAND.footer.helpTracking} />
              </li>
            </ul>
          </div>

          {/* Col 3: Wholesale Channels */}
          <div className="flex flex-col gap-3">
            <Txt as="span" className="font-body text-xs uppercase tracking-wider text-brand-accent-light font-bold" value={BRAND.footer.b2bTitle} />
            <ul className="flex flex-col gap-2 font-body text-xs sm:text-sm text-brand-text-on-dark">
              <li>
                <Txt as="button"
                  type="button"
                  onClick={() => scrollTo('mayoristas')}
                  className="hover:text-white transition-colors cursor-pointer text-left" value={BRAND.footer.b2bQuotes} />
              </li>
              <li>
                <Txt as="button"
                  type="button"
                  onClick={() => scrollTo('mayoristas')}
                  className="hover:text-white transition-colors cursor-pointer text-left" value={BRAND.footer.b2bInvoice} />
              </li>
              <li>
                <Txt as="a"
                  href={`https://wa.me/${BRAND.whatsapp.rawNumber}?text=${encodeURIComponent(BRAND.whatsapp.wholesaleInquiryText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors" value={BRAND.footer.b2bDesk} />
              </li>
              <li>
                <span className="text-brand-text-on-dark">{BRAND.address.pickupLabel}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Warehouse & Contact */}
          <div className="flex flex-col gap-3">
            <Txt as="span" className="font-body text-xs uppercase tracking-wider text-brand-accent-light font-bold" value={BRAND.footer.contactTitle} />
            <div className="flex flex-col gap-1.5 font-body text-xs sm:text-sm text-brand-text-on-dark">
              <span className="text-white font-medium">{BRAND.address.full}</span>
              <span>{BRAND.address.pickupHours}</span>
              <span className="text-brand-accent-light">{BRAND.email}</span>
              <span className="text-white font-bold mt-1">
                {formatText(BRAND.footer.whatsappLine, { phone: BRAND.whatsapp.display })}
              </span>

              {/* Social Icons */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={`https://wa.me/${BRAND.whatsapp.rawNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={BRAND.footer.whatsappAria}
                  className="p-2 bg-brand-primary-deep hover:bg-brand-secondary transition-colors text-white flex items-center justify-center border border-white/15"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  aria-label={BRAND.footer.emailAria}
                  className="p-2 bg-brand-primary-deep hover:bg-brand-secondary transition-colors text-white flex items-center justify-center border border-white/15"
                >
                  <span className="material-symbols-outlined text-sm">mail</span>
                </a>
                <a
                  href={`tel:+${BRAND.whatsapp.rawNumber}`}
                  aria-label={BRAND.footer.phoneAria}
                  className="p-2 bg-brand-primary-deep hover:bg-brand-secondary transition-colors text-white flex items-center justify-center border border-white/15"
                >
                  <span className="material-symbols-outlined text-sm">call</span>
                </a>
                {([
                  ['instagram', 'photo_camera', BRAND.footer.instagramLabel],
                  ['facebook', 'public', BRAND.footer.facebookLabel],
                  ['linkedin', 'work', BRAND.footer.linkedinLabel]
                ] as const).map(([network, icon, label]) =>
                  BRAND.social[network] ? (
                    <a
                      key={network}
                      href={BRAND.social[network]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="p-2 bg-brand-primary-deep hover:bg-brand-secondary transition-colors text-white flex items-center justify-center border border-white/15"
                    >
                      <span className="material-symbols-outlined text-sm">{icon}</span>
                    </a>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-body text-[11px] text-brand-text-muted">
          <Txt as="p" value={formatText(BRAND.footer.copyright, { year: String(new Date().getFullYear()), name: BRAND.legalName ?? BRAND.name })} />
          <div className="flex items-center gap-4">
            <Txt as="span" value={formatText(BRAND.footer.cuitLine, { cuit: BRAND.cuit })} />
            <span className="opacity-40">|</span>
            <Txt as="span" value={BRAND.footer.consumerDefense} />
          </div>
        </div>

        {/* Leyenda de demostración (ver demoBanner.config.ts) */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <p className="font-body text-[10px] text-brand-text-muted uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">
            {BRAND.demoLegend}
          </p>
        </div>
      </div>
    </footer>
  );
};
