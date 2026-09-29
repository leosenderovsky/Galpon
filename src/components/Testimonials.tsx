import React from 'react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      initials: 'MR',
      name: 'Martín Rodríguez',
      role: 'Logística & Cargas Rosario',
      text: '“Compramos 25 camperas canvas para los mecánicos de la flota. Aguantan el roce con grasa y fierros pesados sin deshilacharse. Excelente atención y entrega en 48hs a Rosario.”',
      color: 'bg-[#152536]'
    },
    {
      initials: 'EP',
      name: 'Esteban Peralta',
      role: 'Taller Herrería Peralta - Córdoba',
      text: '“Las remeras 24/1 son verdaderamente pesadas, no tienen nada que ver con lo que te venden habitualmente que se deforma al segundo lavado. El cuello queda siempre intacto.”',
      color: 'bg-[#7c5733]'
    },
    {
      initials: 'GD',
      name: 'Gastón Domínguez',
      role: 'Electromecánica Sur - Neuquén',
      text: '“Pedimos curva cerrada de pantalones ripstop para cuadrilla de tendido eléctrico. Calce cómodo para trepar y arneses, los refuerzos de rodilla son clave.”',
      color: 'bg-[#000f20]'
    }
  ];

  return (
    <section className="w-full bg-[#f8f9fb] py-16 sm:py-20 border-b border-[#e1e2e4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-2 mb-10">
          <h2 className="font-headline text-2xl sm:text-4xl uppercase text-[#000f20] tracking-tight">
            EN EL CUERO DE QUIENES LABURAN
          </h2>
          <span className="font-body text-xs uppercase text-[#44474c] font-bold tracking-wider">
            CLIENTES VERIFICADOS EN TODO EL PAÍS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#ffffff] p-6 shadow-sm border border-[#e1e2e4] flex flex-col justify-between gap-6"
            >
              <p className="font-body text-sm sm:text-base text-[#191c1e] italic leading-relaxed">
                {t.text}
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#f3f4f6]">
                <div
                  className={`w-10 h-10 ${t.color} text-[#ffffff] flex items-center justify-center font-headline text-base font-bold shadow-sm`}
                >
                  {t.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-xs sm:text-sm uppercase text-[#000f20] font-bold">
                    {t.name}
                  </span>
                  <span className="font-body text-[11px] text-[#44474c]">
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
