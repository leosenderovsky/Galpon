import React from 'react';
import { useCart } from '../context/CartContext';
import { SIZE_GUIDES } from '../sizeGuide';

export const SizeGuideModal: React.FC = () => {
  const {
    isSizeGuideModalOpen,
    setIsSizeGuideModalOpen,
    selectedCategoryForGuide,
    setSelectedCategoryForGuide
  } = useCart();

  if (!isSizeGuideModalOpen) return null;

  const currentGuide = SIZE_GUIDES[selectedCategoryForGuide] || SIZE_GUIDES['camperas'];

  const guideTabs = [
    { id: 'camperas', label: 'Camperas de Trabajo' },
    { id: 'pantalones', label: 'Pantalones Cargo' },
    { id: 'remeras', label: 'Remeras Básicas 24/1' },
    { id: 'chalecos', label: 'Buzos y Chalecos' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-primary-deep/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-white shadow-2xl my-auto overflow-hidden text-brand-text border border-brand-primary">
        {/* Header Bar */}
        <div className="bg-brand-primary text-white px-5 py-3.5 flex items-center justify-between border-b border-white/15">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-accent-light text-xl">square_foot</span>
            <h2 className="font-headline text-xl uppercase tracking-wider">
              Guía Oficial de Talles y Medidas IRAM
            </h2>
          </div>
          <button
            onClick={() => setIsSizeGuideModalOpen(false)}
            aria-label="Cerrar guía de talles"
            className="p-1 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <div className="p-5 sm:p-7 flex flex-col gap-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-brand-border-soft pb-3">
            {guideTabs.map((tab) => {
              const isActive = selectedCategoryForGuide === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategoryForGuide(tab.id)}
                  className={`px-4 py-2 font-body text-xs uppercase tracking-wider font-bold transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                      : 'bg-brand-surface-subtle text-brand-text border-brand-border hover:bg-brand-surface-hover'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Guide Title & Tolerance */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-brand-surface-muted p-3 border border-brand-border">
            <span className="font-body text-xs uppercase font-bold text-brand-primary-deep">
              {currentGuide.title}
            </span>
            <span className="font-body text-[11px] text-brand-secondary font-bold">
              {currentGuide.tolerance} (Prenda extendida sobre mesa)
            </span>
          </div>

          {/* Detailed Table */}
          <div className="overflow-x-auto w-full border border-brand-border">
            <table className="w-full text-left font-body text-xs sm:text-sm">
              <thead>
                <tr className="bg-brand-primary text-white font-body text-xs uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">{currentGuide.columns.size}</th>
                  <th className="py-3 px-4">{currentGuide.columns.primaryMeasure}</th>
                  <th className="py-3 px-4">{currentGuide.columns.secondaryMeasure}</th>
                  <th className="py-3 px-4">{currentGuide.columns.tertiaryMeasure}</th>
                  <th className="py-3 px-4 text-right">{currentGuide.columns.recommendation}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border-soft">
                {currentGuide.rows.map((row, idx) => (
                  <tr
                    key={row.size}
                    className={`transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-brand-background'
                    } hover:bg-brand-accent-light/40`}
                  >
                    <td className="py-3 px-4 font-headline text-lg sm:text-xl font-bold text-brand-primary-deep">
                      {row.sizeLabel || row.size}
                    </td>
                    <td className="py-3 px-4 text-brand-text">{row.chestOrWaist}</td>
                    <td className="py-3 px-4 text-brand-text">{row.length}</td>
                    <td className="py-3 px-4 text-brand-text">{row.sleeveOrInseam || '-'}</td>
                    <td className="py-3 px-4 text-right font-medium text-brand-secondary">
                      {row.recommendedHeight || row.recommendedWeight || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recommendations Banner */}
          <div className="bg-brand-surface-subtle border border-brand-border p-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-brand-secondary text-xl mt-0.5">info</span>
            <div className="flex flex-col gap-1">
              <span className="font-body text-xs uppercase font-bold text-brand-primary-deep">
                Consejo de confección y calce:
              </span>
              <p className="font-body text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                {currentGuide.recommendationNote}
              </p>
            </div>
          </div>

          {/* Footer Close */}
          <div className="flex items-center justify-between pt-2 border-t border-brand-border-soft">
            <span className="font-body text-xs text-brand-text-secondary">
              ¿Tenés dudas con las medidas de tu cuadrilla? Consultanos en tiempo real por WhatsApp.
            </span>
            <button
              onClick={() => setIsSizeGuideModalOpen(false)}
              className="px-6 py-2.5 bg-brand-primary text-white font-body text-xs uppercase tracking-wider font-bold hover:bg-brand-primary-deep cursor-pointer"
            >
              Cerrar Guía
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
