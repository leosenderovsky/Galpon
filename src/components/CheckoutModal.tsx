import React from 'react';
import { useCart } from '../context/CartContext';
import { formatARS } from '../products';
import { BRAND } from '../brand.config';

export const CheckoutModal: React.FC = () => {
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsCartOpen,
    customerDetails,
    updateCustomerDetails,
    subtotal,
    comboDiscount,
    total,
    generateWhatsAppMessage,
    confirmOrderAndSendWhatsApp
  } = useCart();

  if (!isCheckoutOpen) return null;

  const handleDeliveryChange = (method: 'envio' | 'retiro' | 'expreso', label: string) => {
    updateCustomerDetails({
      deliveryMethod: method,
      deliveryMethodLabel: label
    });
  };

  const isRetiro = customerDetails.deliveryMethod === 'retiro';
  const whatsappPreview = generateWhatsAppMessage();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#000f20]/80 backdrop-blur-sm flex items-start justify-center p-2 sm:p-4 lg:p-6">
      <div className="relative w-full max-w-7xl bg-[#f8f9fb] shadow-2xl my-4 sm:my-8 overflow-hidden text-[#191c1e] border border-[#152536]">
        {/* Progress Stepper / Packing Slip Header */}
        <div className="w-full bg-[#edeef0] px-4 sm:px-8 py-3.5 border-b border-[#c4c6cd]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-headline text-lg sm:text-xl uppercase tracking-wider text-[#000f20] font-bold">
                DESPACHO / CHECKOUT B2B & RETAIL
              </span>
              <span className="bg-[#7c5733] text-[#ffffff] font-body text-[10px] sm:text-xs uppercase px-2 py-0.5 tracking-wider font-bold">
                ORDEN #GP-{Math.floor(1000 + Math.random() * 9000)}
              </span>
            </div>

            {/* Stepper Trail */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <span className="w-5 h-5 bg-[#152536] text-[#ffffff] font-body text-xs flex items-center justify-center font-bold">
                  ✓
                </span>
                <span className="font-body text-xs uppercase tracking-wider text-[#191c1e]">
                  1. Catálogo
                </span>
              </button>
              <span className="text-[#c4c6cd] font-body text-xs">/</span>

              <button
                type="button"
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setIsCartOpen(true);
                }}
                className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <span className="w-5 h-5 bg-[#152536] text-[#ffffff] font-body text-xs flex items-center justify-center font-bold">
                  ✓
                </span>
                <span className="font-body text-xs uppercase tracking-wider text-[#191c1e]">
                  2. Carrito
                </span>
              </button>
              <span className="text-[#c4c6cd] font-body text-xs">/</span>

              <div className="flex items-center gap-1.5 bg-[#152536] text-[#ffffff] px-2.5 py-0.5">
                <span className="w-5 h-5 bg-[#7c5733] text-[#ffffff] font-body text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span className="font-body text-xs uppercase tracking-wider font-bold">
                  3. Datos de Entrega
                </span>
              </div>
              <span className="text-[#c4c6cd] font-body text-xs">/</span>

              <div className="flex items-center gap-1.5 opacity-40">
                <span className="w-5 h-5 bg-[#d9dadc] text-[#191c1e] font-body text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <span className="font-body text-xs uppercase tracking-wider text-[#191c1e]">
                  4. WhatsApp
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="ml-4 p-1 hover:bg-[#d9dadc] text-[#000f20] transition-colors"
                aria-label="Cerrar checkout"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
          </div>
        </div>

        {/* Workspace Body */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Notice Bar */}
          <div className="w-full bg-[#e7e8ea] border border-[#c4c6cd] p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#7c5733] text-2xl">
                verified_user
              </span>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-[#000f20] font-bold">
                  Sin pasarelas externas ni comisiones extras
                </p>
                <p className="font-body text-xs text-[#44474c]">
                  Coordinás stock, facturación oficial (Factura A o B) y medios de pago (Transferencia / Efectivo al retirar) directamente con nuestro equipo de almacén.
                </p>
              </div>
            </div>
            <span className="font-body text-xs text-[#7c5733] uppercase bg-[#ffffff] border border-[#c4c6cd] px-3 py-1 font-bold whitespace-nowrap">
              Atención Humana Directa
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Formularios (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Section 1: Contact Data */}
              <div className="bg-[#ffffff] p-5 sm:p-6 shadow-sm border border-[#e1e2e4]">
                <div className="flex items-center justify-between mb-4 pb-2 bg-[#f3f4f6] p-2 border-b border-[#e1e2e4]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#152536] text-[#ffffff] font-body text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <h2 className="font-headline text-lg uppercase tracking-wide text-[#000f20]">
                      Datos de Contacto & Facturación
                    </h2>
                  </div>
                  <span className="font-body text-[11px] uppercase text-[#7c5733] font-bold">
                    Requerido
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-body text-xs uppercase tracking-wider text-[#191c1e] mb-1 font-bold">
                      Nombre Completo / Razón Social *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerDetails.fullName}
                      onChange={(e) => updateCustomerDetails({ fullName: e.target.value })}
                      placeholder="Ej: Marcelo Rossi / Taller Metalúrgico SA"
                      className="w-full bg-[#f3f4f6] text-[#000f20] px-3 py-2.5 font-body text-sm border border-[#c4c6cd] focus:bg-[#ffffff] focus:outline-none focus:ring-1 focus:ring-[#7c5733]"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-[#191c1e] mb-1 font-bold">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerDetails.phone}
                      onChange={(e) => updateCustomerDetails({ phone: e.target.value })}
                      placeholder="+54 9 11 0000-0000"
                      className="w-full bg-[#f3f4f6] text-[#000f20] px-3 py-2.5 font-body text-sm border border-[#c4c6cd] focus:bg-[#ffffff] focus:outline-none focus:ring-1 focus:ring-[#7c5733]"
                    />
                    <p className="font-body text-[11px] text-[#44474c] mt-1">
                      Con este número te contactamos para validar el pedido.
                    </p>
                  </div>

                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-[#191c1e] mb-1 font-bold">
                      Email (Opcional)
                    </label>
                    <input
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => updateCustomerDetails({ email: e.target.value })}
                      placeholder="nombre@correo.com"
                      className="w-full bg-[#f3f4f6] text-[#000f20] px-3 py-2.5 font-body text-sm border border-[#c4c6cd] focus:bg-[#ffffff] focus:outline-none focus:ring-1 focus:ring-[#7c5733]"
                    />
                    <p className="font-body text-[11px] text-[#44474c] mt-1">
                      Para recibir la factura electrónica PDF.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Method */}
              <div className="bg-[#ffffff] p-5 sm:p-6 shadow-sm border border-[#e1e2e4]">
                <div className="flex items-center justify-between mb-4 pb-2 bg-[#f3f4f6] p-2 border-b border-[#e1e2e4]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#152536] text-[#ffffff] font-body text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    <h2 className="font-headline text-lg uppercase tracking-wide text-[#000f20]">
                      Modalidad de Despacho
                    </h2>
                  </div>
                  <span className="font-body text-[11px] uppercase text-[#44474c]">
                    Seleccionar 1 opción
                  </span>
                </div>

                {/* Radio Options */}
                <div className="flex flex-col gap-3">
                  {/* Option 1: Correo Andreani */}
                  <label
                    onClick={() =>
                      handleDeliveryChange('envio', 'Envío a Domicilio (Correo Argentino / Andreani)')
                    }
                    className={`p-3.5 cursor-pointer flex items-start gap-3 transition-colors border ${
                      customerDetails.deliveryMethod === 'envio'
                        ? 'bg-[#e7e8ea] border-[#152536]'
                        : 'bg-[#f8f9fb] border-[#c4c6cd] hover:bg-[#edeef0]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery_method"
                      checked={customerDetails.deliveryMethod === 'envio'}
                      onChange={() => {}}
                      className="mt-1 accent-[#152536]"
                    />
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-headline text-base uppercase text-[#000f20]">
                          Envío a Domicilio / Taller
                        </span>
                        <span className="font-body text-[10px] uppercase bg-[#152536] text-[#ffffff] px-2 py-0.5 font-bold">
                          A Cotizar por CP
                        </span>
                      </div>
                      <p className="font-body text-xs text-[#44474c] mt-0.5">
                        Despacho garantizado por Correo Argentino o Andreani con número de seguimiento en tiempo real.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Retiro en Depósito */}
                  <label
                    onClick={() =>
                      handleDeliveryChange('retiro', 'Retiro en Depósito Central (Lanús / Parque Patricios)')
                    }
                    className={`p-3.5 cursor-pointer flex items-start gap-3 transition-colors border ${
                      customerDetails.deliveryMethod === 'retiro'
                        ? 'bg-[#e7e8ea] border-[#152536]'
                        : 'bg-[#f8f9fb] border-[#c4c6cd] hover:bg-[#edeef0]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery_method"
                      checked={customerDetails.deliveryMethod === 'retiro'}
                      onChange={() => {}}
                      className="mt-1 accent-[#152536]"
                    />
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-headline text-base uppercase text-[#000f20]">
                          Retiro en Depósito Central
                        </span>
                        <span className="font-body text-[10px] uppercase bg-[#7c5733] text-[#ffffff] px-2 py-0.5 font-bold">
                          Gratis
                        </span>
                      </div>
                      <p className="font-body text-xs text-[#44474c] mt-0.5">
                        {BRAND.address.full}. {BRAND.address.pickupHours}. Listo en 4 hs hábiles sin costo.
                      </p>
                    </div>
                  </label>

                  {/* Option 3: Expreso al Interior */}
                  <label
                    onClick={() =>
                      handleDeliveryChange('expreso', 'Expreso o Transporte al Interior a convenir')
                    }
                    className={`p-3.5 cursor-pointer flex items-start gap-3 transition-colors border ${
                      customerDetails.deliveryMethod === 'expreso'
                        ? 'bg-[#e7e8ea] border-[#152536]'
                        : 'bg-[#f8f9fb] border-[#c4c6cd] hover:bg-[#edeef0]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery_method"
                      checked={customerDetails.deliveryMethod === 'expreso'}
                      onChange={() => {}}
                      className="mt-1 accent-[#152536]"
                    />
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-headline text-base uppercase text-[#000f20]">
                          Envío Mayorista por Expreso / Flete
                        </span>
                        <span className="font-body text-[10px] uppercase bg-[#c4c6cd] text-[#191c1e] px-2 py-0.5 font-bold">
                          Compras por Bulto
                        </span>
                      </div>
                      <p className="font-body text-xs text-[#44474c] mt-0.5">
                        Llevamos el bulto precintado sin cargo al expreso de tu elección en Villa Soldati o Pompeya.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Conditional Address Fields */}
                {!isRetiro && (
                  <div className="mt-4 pt-4 bg-[#f3f4f6] p-4 border border-[#c4c6cd]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-body text-xs uppercase tracking-wider text-[#000f20] font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-[#7c5733]">
                          pin_drop
                        </span>{' '}
                        Destino de Entrega
                      </span>
                      <span className="font-body text-[11px] text-[#44474c]">
                        Cotización exacta en la respuesta de WhatsApp
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                      <div className="sm:col-span-4">
                        <label className="block font-body text-[11px] uppercase text-[#44474c] mb-1 font-bold">
                          Calle y Número *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerDetails.street}
                          onChange={(e) => updateCustomerDetails({ street: e.target.value })}
                          placeholder="Ej: Av. Hipólito Yrigoyen 2450"
                          className="w-full bg-[#ffffff] text-[#000f20] px-3 py-2 font-body text-xs border border-[#c4c6cd] focus:outline-none focus:ring-1 focus:ring-[#7c5733]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-body text-[11px] uppercase text-[#44474c] mb-1 font-bold">
                          Piso / Dpto / Galpón
                        </label>
                        <input
                          type="text"
                          value={customerDetails.floor}
                          onChange={(e) => updateCustomerDetails({ floor: e.target.value })}
                          placeholder="Ej: Galpón 4 / Piso 2 B"
                          className="w-full bg-[#ffffff] text-[#000f20] px-3 py-2 font-body text-xs border border-[#c4c6cd] focus:outline-none focus:ring-1 focus:ring-[#7c5733]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-body text-[11px] uppercase text-[#44474c] mb-1 font-bold">
                          Código Postal *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerDetails.postalCode}
                          onChange={(e) => updateCustomerDetails({ postalCode: e.target.value })}
                          placeholder="Ej: 1824"
                          className="w-full bg-[#ffffff] text-[#000f20] px-3 py-2 font-body text-xs border border-[#c4c6cd] focus:outline-none focus:ring-1 focus:ring-[#7c5733]"
                        />
                      </div>

                      <div className="sm:col-span-4">
                        <label className="block font-body text-[11px] uppercase text-[#44474c] mb-1 font-bold">
                          Localidad & Provincia *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerDetails.city}
                          onChange={(e) => updateCustomerDetails({ city: e.target.value })}
                          placeholder="Ej: Lanús, Buenos Aires"
                          className="w-full bg-[#ffffff] text-[#000f20] px-3 py-2 font-body text-xs border border-[#c4c6cd] focus:outline-none focus:ring-1 focus:ring-[#7c5733]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: Notes */}
              <div className="bg-[#ffffff] p-5 sm:p-6 shadow-sm border border-[#e1e2e4]">
                <div className="flex items-center justify-between mb-3 pb-2 bg-[#f3f4f6] p-2 border-b border-[#e1e2e4]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#152536] text-[#ffffff] font-body text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    <h2 className="font-headline text-lg uppercase tracking-wide text-[#000f20]">
                      Instrucciones o Aclaraciones
                    </h2>
                  </div>
                  <span className="font-body text-[11px] uppercase text-[#44474c]">
                    Opcional
                  </span>
                </div>

                <label className="block font-body text-[11px] uppercase text-[#44474c] mb-1 font-bold">
                  Comentarios para el armado del pedido
                </label>
                <textarea
                  rows={3}
                  value={customerDetails.notes}
                  onChange={(e) => updateCustomerDetails({ notes: e.target.value })}
                  placeholder="Ej: Entregar por la mañana; solicitar Factura A con CUIT; si no hay en tono carbón cambiar por verde..."
                  className="w-full bg-[#f3f4f6] text-[#000f20] p-3 font-body text-sm border border-[#c4c6cd] focus:bg-[#ffffff] focus:outline-none focus:ring-1 focus:ring-[#7c5733]"
                />
                <p className="font-body text-[11px] text-[#44474c] mt-1">
                  Este texto se sumará al mensaje directo de WhatsApp para que el operario de almacén lo revise antes de empaquetar.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Resumen & WhatsApp Cierre (5 Cols) */}
            <aside className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
              {/* Order Ledger Preview */}
              <div className="bg-[#ffffff] p-5 sm:p-6 shadow-md border border-[#c4c6cd]">
                <div className="flex items-center justify-between pb-2 bg-[#edeef0] p-2 mb-3 border-b border-[#c4c6cd]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#000f20]">inventory_2</span>
                    <h3 className="font-headline text-lg uppercase tracking-wide text-[#000f20]">
                      Tu Pedido ({items.length} Artículos)
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="font-body text-xs text-[#7c5733] uppercase hover:underline font-bold cursor-pointer"
                  >
                    Modificar
                  </button>
                </div>

                {/* Items List */}
                <div className="flex flex-col divide-y divide-[#edeef0] max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-11 h-11 object-cover bg-[#edeef0] border border-[#c4c6cd]"
                        />
                        <div className="flex flex-col">
                          <span className="font-body text-xs uppercase font-bold text-[#000f20]">
                            {item.quantity}x {item.product.name}
                          </span>
                          <span className="font-body text-[11px] text-[#44474c]">
                            Talle: {item.size} · {item.color}
                          </span>
                        </div>
                      </div>
                      <span className="font-headline text-base text-[#000f20] font-bold">
                        {formatARS(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total Breakdown */}
                <div className="mt-4 pt-3 bg-[#f3f4f6] p-3 flex flex-col gap-1.5 border border-[#c4c6cd]">
                  <div className="flex justify-between font-body text-xs text-[#44474c]">
                    <span>Subtotal Lista Minorista</span>
                    <span>{formatARS(subtotal)}</span>
                  </div>

                  {comboDiscount > 0 && (
                    <div className="flex justify-between font-body text-xs text-[#7c5733] font-bold">
                      <span>Descuento Promoción Cuadrilla (-10%)</span>
                      <span>-{formatARS(comboDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-body text-xs text-[#44474c]">
                    <span>Costo de Despacho / Logística</span>
                    <span className="font-body text-[10px] uppercase bg-[#e7e8ea] px-1 font-bold text-[#000f20]">
                      {isRetiro ? 'Retiro Gratis en Depósito' : 'A Coordinar por WhatsApp'}
                    </span>
                  </div>

                  <div className="mt-2 pt-2 bg-[#ffffff] p-2.5 border border-[#c4c6cd] flex justify-between items-baseline shadow-sm">
                    <span className="font-headline text-lg uppercase tracking-wide text-[#000f20] font-bold">
                      Total Estimado
                    </span>
                    <span className="font-headline text-2xl sm:text-3xl text-[#000f20] font-bold tracking-tight">
                      {formatARS(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Live Preview Terminal */}
              <div className="bg-[#edeef0] p-4 sm:p-5 shadow-sm border border-[#c4c6cd]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-xs uppercase tracking-wider text-[#000f20] font-bold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7c5733]"></span>
                    Vista Previa del Mensaje Automatizado
                  </span>
                  <span className="font-body text-[10px] text-[#44474c] font-semibold">
                    WhatsApp API Direct
                  </span>
                </div>

                {/* Mock Chat Bubble */}
                <div className="bg-[#ffffff] p-3 text-[#000f20] shadow-sm font-mono text-xs leading-relaxed whitespace-pre-wrap select-all overflow-x-auto border border-[#c4c6cd] max-h-56">
                  {whatsappPreview}
                </div>
                <p className="font-body text-[11px] text-[#44474c] mt-2 italic">
                  Podrás editar o agregar consultas directamente en tu chat antes de presionar enviar.
                </p>
              </div>

              {/* High-Impact CTA Button */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={confirmOrderAndSendWhatsApp}
                  className="w-full bg-[#152536] hover:bg-[#000f20] text-[#ffffff] py-4 px-4 flex items-center justify-center gap-3 font-body text-sm uppercase tracking-wider font-bold shadow-lg transition-all active:scale-[0.99] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-2xl text-[#ffdcbf]">chat</span>
                  <span>Confirmar y Enviar Pedido por WhatsApp</span>
                </button>

                <div className="bg-[#edeef0] border border-[#c4c6cd] p-2.5 flex items-center justify-center gap-2 text-center">
                  <span className="material-symbols-outlined text-sm text-[#7c5733]">schedule</span>
                  <span className="font-body text-xs text-[#44474c]">
                    Respuesta promedio en <strong>menos de 15 minutos</strong> en horario de almacén ({BRAND.address.pickupHours}).
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#ffffff] p-3 border border-[#c4c6cd] flex items-center gap-2.5 shadow-sm">
                  <span className="material-symbols-outlined text-[#7c5733] text-2xl">
                    receipt_long
                  </span>
                  <div className="flex flex-col">
                    <span className="font-body text-xs uppercase font-bold text-[#000f20]">
                      Factura Oficial
                    </span>
                    <span className="font-body text-[11px] text-[#44474c]">Emitimos A o B</span>
                  </div>
                </div>

                <div className="bg-[#ffffff] p-3 border border-[#c4c6cd] flex items-center gap-2.5 shadow-sm">
                  <span className="material-symbols-outlined text-[#7c5733] text-2xl">
                    warehouse
                  </span>
                  <div className="flex flex-col">
                    <span className="font-body text-xs uppercase font-bold text-[#000f20]">
                      Stock Real
                    </span>
                    <span className="font-body text-[11px] text-[#44474c]">Separado al instante</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
