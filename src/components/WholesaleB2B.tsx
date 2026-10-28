import React, { useState } from 'react';
import { Txt } from './Txt';
import { BRAND, formatText } from '../brand.config';

export const WholesaleB2B: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [estimatedGarments, setEstimatedGarments] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      formatText(BRAND.ui.b2bForm.intro, { name: BRAND.name }),
      formatText(BRAND.ui.b2bForm.companyLine, { value: companyName || BRAND.ui.b2bForm.pending }),
      formatText(BRAND.ui.b2bForm.phoneLine, { value: phone || BRAND.ui.b2bForm.pending }),
      formatText(BRAND.ui.b2bForm.quantityLine, { value: estimatedGarments || BRAND.ui.b2bForm.defaultQuantity }),
      '───────────────────',
      BRAND.ui.b2bForm.closing
    ].join('\n');

    const url = `https://wa.me/${BRAND.whatsapp.rawNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="w-full bg-brand-primary-deep text-white py-16 sm:py-20 relative overflow-hidden" id="mayoristas">
      {/* Background Stencil Blueprint */}
      <div className="absolute -right-16 -bottom-16 opacity-5 pointer-events-none select-none">
        <span className="font-headline text-[240px] sm:text-[320px] font-bold tracking-tighter">
          B2B
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="bg-brand-primary p-6 sm:p-10 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 border border-white/10">
          {/* Information & Benefits */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-secondary text-white px-3 py-1 self-start font-body text-xs uppercase tracking-widest font-bold">
              {BRAND.b2b.badge}
            </div>

            <h2 className="font-headline text-3xl sm:text-5xl uppercase text-white tracking-tight leading-tight">
              {BRAND.b2b.title}
            </h2>

            <p className="font-body text-sm sm:text-base text-brand-text-on-dark leading-relaxed">
              {BRAND.b2b.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-white font-body text-xs sm:text-sm uppercase tracking-wider">
              {BRAND.b2b.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-accent-light text-base">
                    check_circle
                  </span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive B2B Quote Card */}
          <div className="w-full lg:w-96 bg-white text-brand-text p-6 shadow-xl flex flex-col gap-4 flex-shrink-0 border border-brand-border">
            <div className="flex flex-col gap-1 border-b border-brand-border-soft pb-3">
              <Txt as="span" className="font-headline text-2xl uppercase text-brand-primary-deep font-bold" value={BRAND.ui.b2bForm.title} />
              <Txt as="span" className="font-body text-xs text-brand-text-secondary" value={BRAND.ui.b2bForm.subtitle} />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <Txt as="label" className="block font-body text-[11px] uppercase font-bold text-brand-text-secondary mb-1" value={BRAND.ui.b2bForm.nameLabel} />
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={BRAND.ui.b2bForm.namePlaceholder}
                  className="w-full bg-brand-surface-muted px-3 py-2 font-body text-xs text-brand-primary-deep border border-brand-border focus:outline-none focus:ring-1 focus:ring-brand-secondary"
                />
              </div>

              <div>
                <Txt as="label" className="block font-body text-[11px] uppercase font-bold text-brand-text-secondary mb-1" value={BRAND.ui.b2bForm.phoneLabel} />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+54 9 11 0000 0000"
                  className="w-full bg-brand-surface-muted px-3 py-2 font-body text-xs text-brand-primary-deep border border-brand-border focus:outline-none focus:ring-1 focus:ring-brand-secondary"
                />
              </div>

              <div>
                <Txt as="label" className="block font-body text-[11px] uppercase font-bold text-brand-text-secondary mb-1" value={BRAND.ui.b2bForm.quantityLabel} />
                <input
                  type="text"
                  required
                  value={estimatedGarments}
                  onChange={(e) => setEstimatedGarments(e.target.value)}
                  placeholder={BRAND.ui.b2bForm.quantityPlaceholder}
                  className="w-full bg-brand-surface-muted px-3 py-2 font-body text-xs text-brand-primary-deep border border-brand-border focus:outline-none focus:ring-1 focus:ring-brand-secondary"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-brand-secondary hover:bg-brand-secondary-dark text-white py-3.5 font-body text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md active:translate-y-0.5"
              >
                <span className="material-symbols-outlined text-base">send</span>
                <Txt as="span" value={BRAND.ui.b2bForm.submit} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
