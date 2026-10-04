import React from 'react';
import { BRAND } from '../brand.config';

export const Testimonials: React.FC = () => {
  const testimonials = BRAND.testimonials;

  if (testimonials.length === 0) return null;

  return (
    <section className="w-full bg-brand-background py-16 sm:py-20 border-b border-brand-border-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-2 mb-10">
          <h2 className="font-headline text-2xl sm:text-4xl uppercase text-brand-primary-deep tracking-tight">
            EN EL CUERO DE QUIENES LABURAN
          </h2>
          <span className="font-body text-xs uppercase text-brand-text-secondary font-bold tracking-wider">
            CLIENTES VERIFICADOS EN TODO EL PAÍS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 shadow-sm border border-brand-border-soft flex flex-col justify-between gap-6"
            >
              <p className="font-body text-sm sm:text-base text-brand-text italic leading-relaxed">
                {t.text}
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-brand-surface-muted">
                <div
                  className={`w-10 h-10 ${t.color} text-white flex items-center justify-center font-headline text-base font-bold shadow-sm`}
                >
                  {t.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-xs sm:text-sm uppercase text-brand-primary-deep font-bold">
                    {t.name}
                  </span>
                  <span className="font-body text-[11px] text-brand-text-secondary">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
