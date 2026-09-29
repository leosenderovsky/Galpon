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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#000f20]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#ffffff] shadow-2xl my-auto overflow-hidden text-[#191c1e] border border-[#152536]">
        {/* Header Bar */}
        <div className="bg-[#152536] text-[#ffffff] px-5 py-3.5 flex items-center justify-between border-b border-[#ffffff]/15">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffdcbf] text-xl">square_foot</span>
            <h2 className="font-headline text-xl uppercase tracking-wider">
              Guía Oficial de Talles y Medidas IRAM
            </h2>
          </div>
          <button
            onClick={() => setIsSizeGuideModalOpen(false)}
            aria-label="Cerrar guía de talles"
            className="p-1 hover:bg-[#ffffff]/20 text-[#ffffff] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <div className="p-5 sm:p-7 flex flex-col gap-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[#e1e2e4] pb-3">
            {guideTabs.map((tab) => {
              const isActive = selectedCategoryForGuide === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategoryForGuide(tab.id)}
                  className={`px-4 py-2 font-body text-xs uppercase tracking-wider font-bold transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#152536] text-[#ffffff] border-[#152536] shadow-sm'
                      : 'bg-[#edeef0] text-[#191c1e] border-[#c4c6cd] hover:bg-[#e7e8ea]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Guide Title & Tolerance */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#f3f4f6] p-3 border border-[#c4c6cd]">
            <span className="font-body text-xs uppercase font-bold text-[#000f20]">
              {currentGuide.title}
            </span>
            <span className="font-body text-[11px] text-[#7c5733] font-bold">
              {currentGuide.tolerance} (Prenda extendida sobre mesa)
            </span>
          </div>

          {/* Detailed Table */}
          <div className="overflow-x-auto w-full border border-[#c4c6cd]">
            <table className="w-full text-left font-body text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#152536] text-[#ffffff] font-body text-xs uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">{currentGuide.columns.size}</th>
                  <th className="py-3 px-4">{currentGuide.columns.primaryMeasure}</th>
                  <th className="py-3 px-4">{currentGuide.columns.secondaryMeasure}</th>
                  <th className="py-3 px-4">{currentGuide.columns.tertiaryMeasure}</th>
                  <th className="py-3 px-4 text-right">{currentGuide.columns.recommendation}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1e2e4]">
                {currentGuide.rows.map((row, idx) => (
                  <tr
                    key={row.size}
                    className={`transition-colors ${
                      idx % 2 === 0 ? 'bg-[#ffffff]' : 'bg-[#f8f9fb]'
                    } hover:bg-[#ffdcbf]/40`}
                  >
                    <td className="py-3 px-4 font-headline text-lg sm:text-xl font-bold text-[#000f20]">
                      {row.sizeLabel || row.size}
                    </td>
                    <td className="py-3 px-4 text-[#191c1e]">{row.chestOrWaist}</td>
                    <td className="py-3 px-4 text-[#191c1e]">{row.length}</td>
                    <td className="py-3 px-4 text-[#191c1e]">{row.sleeveOrInseam || '-'}</td>
                    <td className="py-3 px-4 text-right font-medium text-[#7c5733]">
                      {row.recommendedHeight || row.recommendedWeight || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recommendations Banner */}
          <div className="bg-[#edeef0] border border-[#c4c6cd] p-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#7c5733] text-xl mt-0.5">info</span>
            <div className="flex flex-col gap-1">
              <span className="font-body text-xs uppercase font-bold text-[#000f20]">
                Consejo de confección y calce:
              </span>
              <p className="font-body text-xs sm:text-sm text-[#44474c] leading-relaxed">
                {currentGuide.recommendationNote}
              </p>
            </div>
          </div>

          {/* Footer Close */}
          <div className="flex items-center justify-between pt-2 border-t border-[#e1e2e4]">
            <span className="font-body text-xs text-[#44474c]">
              ¿Tenés dudas con las medidas de tu cuadrilla? Consultanos en tiempo real por WhatsApp.
            </span>
            <button
              onClick={() => setIsSizeGuideModalOpen(false)}
              className="px-6 py-2.5 bg-[#152536] text-[#ffffff] font-body text-xs uppercase tracking-wider font-bold hover:bg-[#000f20] cursor-pointer"
            >
              Cerrar Guía
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
