import React, { useState } from 'react';
import { BRAND } from '../brand.config';

export const WholesaleB2B: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [estimatedGarments, setEstimatedGarments] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `Hola ${BRAND.name}! 👋 Quiero solicitar cotización mayorista para mi empresa:`,
      `• Razón Social / Contacto: ${companyName || 'A definir'}`,
      `• Teléfono: ${phone || 'A definir'}`,
      `• Prendas estimadas / Cantidad: ${estimatedGarments || 'Curva estándar para cuadrilla'}`,
      '───────────────────',
      '¿Me podrían pasar la lista de precios por bulto cerrado y plazos de entrega?'
    ].join('\n');

    const url = `https://wa.me/${BRAND.whatsapp.rawNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="w-full bg-[#000f20] text-[#ffffff] py-16 sm:py-20 relative overflow-hidden" id="mayoristas">
      {/* Background Stencil Blueprint */}
      <div className="absolute -right-16 -bottom-16 opacity-5 pointer-events-none select-none">
        <span className="font-headline text-[240px] sm:text-[320px] font-bold tracking-tighter">
          B2B
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="bg-[#152536] p-6 sm:p-10 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 border border-[#ffffff]/10">
          {/* Information & Benefits */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#7c5733] text-[#ffffff] px-3 py-1 self-start font-body text-xs uppercase tracking-widest font-bold">
              {BRAND.b2b.badge}
            </div>

            <h2 className="font-headline text-3xl sm:text-5xl uppercase text-[#ffffff] tracking-tight leading-tight">
              {BRAND.b2b.title}
            </h2>

            <p className="font-body text-sm sm:text-base text-[#b8c8de] leading-relaxed">
              {BRAND.b2b.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[#ffffff] font-body text-xs sm:text-sm uppercase tracking-wider">
              {BRAND.b2b.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffdcbf] text-base">
                    check_circle
                  </span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive B2B Quote Card */}
          <div className="w-full lg:w-96 bg-[#ffffff] text-[#191c1e] p-6 shadow-xl flex flex-col gap-4 flex-shrink-0 border border-[#c4c6cd]">
            <div className="flex flex-col gap-1 border-b border-[#e1e2e4] pb-3">
              <span className="font-headline text-2xl uppercase text-[#000f20] font-bold">
                Solicitar Cotización
              </span>
              <span className="font-body text-xs text-[#44474c]">
                Respuesta en menos de 2 horas hábiles por WhatsApp.
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block font-body text-[11px] uppercase font-bold text-[#44474c] mb-1">
                  Nombre / Razón Social *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ej: Metalúrgica San Martín SRL"
                  className="w-full bg-[#f3f4f6] px-3 py-2 font-body text-xs text-[#000f20] border border-[#c4c6cd] focus:outline-none focus:ring-1 focus:ring-[#7c5733]"
                />
              </div>

              <div>
                <label className="block font-body text-[11px] uppercase font-bold text-[#44474c] mb-1">
                  WhatsApp de Contacto *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+54 9 11 0000 0000"
                  className="w-full bg-[#f3f4f6] px-3 py-2 font-body text-xs text-[#000f20] border border-[#c4c6cd] focus:outline-none focus:ring-1 focus:ring-[#7c5733]"
                />
              </div>

              <div>
                <label className="block font-body text-[11px] uppercase font-bold text-[#44474c] mb-1">
                  Prendas estimadas / Cantidad *
                </label>
                <input
                  type="text"
                  required
                  value={estimatedGarments}
                  onChange={(e) => setEstimatedGarments(e.target.value)}
                  placeholder="Ej: 30 Pantalones cargo + 50 remeras"
                  className="w-full bg-[#f3f4f6] px-3 py-2 font-body text-xs text-[#000f20] border border-[#c4c6cd] focus:outline-none focus:ring-1 focus:ring-[#7c5733]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#7c5733] hover:bg-[#613f1e] text-[#ffffff] py-3.5 font-body text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md active:translate-y-0.5"
              >
                <span className="material-symbols-outlined text-base">send</span>
                <span>Hablar con Asesor B2B</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
