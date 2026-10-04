import React from 'react';
import { BRAND } from '../brand.config';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="hero" className="w-full flex flex-col">
      {/* Hero Master Section */}
      <section className="relative w-full overflow-hidden bg-brand-primary text-white">
        {/* Background Image Layer with Heavy Duty Industrial Tint */}
        <div className="absolute inset-0 z-0">
          <img
            src={BRAND.hero.backgroundImage}
            alt={`${BRAND.name} - ${BRAND.tagline}`}
            width={512}
            height={286}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center opacity-30 filter contrast-125 saturate-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/85 to-brand-primary/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-28 flex flex-col justify-center min-h-[560px]">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 self-start bg-brand-secondary px-3.5 py-1 shadow-sm mb-6">
            <span className="material-symbols-outlined text-sm text-white">verified</span>
            <span className="font-body text-xs sm:text-[13px] uppercase tracking-widest text-white font-bold">
              {BRAND.hero.badge}
            </span>
          </div>

          {/* Titles & Lead */}
          <div className="max-w-3xl flex flex-col gap-4">
            <h1 className="font-headline text-4xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tight leading-none drop-shadow-sm">
              {BRAND.hero.title}
            </h1>
            <p className="font-body text-base sm:text-lg text-brand-text-on-dark max-w-2xl font-normal leading-relaxed">
              {BRAND.hero.description}
            </p>
          </div>

          {/* Value Props Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 max-w-4xl pt-4">
            {BRAND.hero.valueProps.map((prop, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm p-3.5 flex items-center gap-3 border border-white/10 shadow-sm"
              >
                <span className="material-symbols-outlined text-brand-accent-light text-xl sm:text-2xl">
                  {prop.icon}
                </span>
                <span className="font-body text-xs sm:text-sm uppercase tracking-wider text-white font-bold leading-tight">
                  {prop.title}
                </span>
              </div>
            ))}
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <button
              onClick={() => scrollTo('catalogo')}
              className="inline-flex items-center justify-center gap-2 bg-brand-secondary text-white px-7 sm:px-9 py-4 font-body text-sm sm:text-base uppercase tracking-wider font-bold shadow-md hover:bg-brand-secondary-dark transition-all cursor-pointer active:translate-y-0.5"
            >
              <span>{BRAND.hero.ctaCatalogText}</span>
              <span className="material-symbols-outlined text-base">south</span>
            </button>
            <button
              onClick={() => scrollTo('como-comprar')}
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-primary-deep px-6 sm:px-8 py-4 font-body text-sm sm:text-base uppercase tracking-wider font-bold shadow-md hover:bg-brand-surface-subtle transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-brand-secondary text-base">chat</span>
              <span>{BRAND.hero.ctaHowToBuyText}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Announcement Bar Ticker */}
      <div className="w-full bg-brand-secondary text-white py-2.5 px-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 font-body text-xs uppercase tracking-widest font-bold">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">inventory_2</span>
            <span>{BRAND.hero.announcementBar.leftText}</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="text-brand-accent-light">{BRAND.hero.announcementBar.subHighlight}</span>
            <span className="opacity-50">/</span>
            <span>{BRAND.hero.announcementBar.rightText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
