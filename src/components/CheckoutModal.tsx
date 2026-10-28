import React from 'react';
import { Txt } from './Txt';
import { useCart } from '../context/CartContext';
import { formatARS, getProductImageDimensions } from '../products';
import { BRAND, formatText } from '../brand.config';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-primary-deep/80 backdrop-blur-sm flex items-start justify-center p-2 sm:p-4 lg:p-6">
      <div className="relative w-full max-w-7xl bg-brand-background shadow-2xl my-4 sm:my-8 overflow-hidden text-brand-text border border-brand-primary">
        {/* Progress Stepper / Packing Slip Header */}
        <div className="w-full bg-brand-surface-subtle px-4 sm:px-8 py-3.5 border-b border-brand-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Txt as="span" className="font-headline text-lg sm:text-xl uppercase tracking-wider text-brand-primary-deep font-bold" value={BRAND.ui.checkout.title} />
              <span className="bg-brand-secondary text-white font-body text-[10px] sm:text-xs uppercase px-2 py-0.5 tracking-wider font-bold">
                {formatText(BRAND.ui.checkout.orderNumber, { number: String(Math.floor(1000 + Math.random() * 9000)) })}
              </span>
            </div>

            {/* Stepper Trail */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <span className="w-5 h-5 bg-brand-primary text-white font-body text-xs flex items-center justify-center font-bold">
                  ✓
                </span>
                <Txt as="span" className="font-body text-xs uppercase tracking-wider text-brand-text" value={BRAND.ui.checkout.step1} />
              </button>
              <span className="text-brand-border font-body text-xs">/</span>

              <button
                type="button"
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setIsCartOpen(true);
                }}
                className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <span className="w-5 h-5 bg-brand-primary text-white font-body text-xs flex items-center justify-center font-bold">
                  ✓
                </span>
                <Txt as="span" className="font-body text-xs uppercase tracking-wider text-brand-text" value={BRAND.ui.checkout.step2} />
              </button>
              <span className="text-brand-border font-body text-xs">/</span>

              <div className="flex items-center gap-1.5 bg-brand-primary text-white px-2.5 py-0.5">
                <span className="w-5 h-5 bg-brand-secondary text-white font-body text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <Txt as="span" className="font-body text-xs uppercase tracking-wider font-bold" value={BRAND.ui.checkout.step3} />
              </div>
              <span className="text-brand-border font-body text-xs">/</span>

              <div className="flex items-center gap-1.5 opacity-40">
                <span className="w-5 h-5 bg-brand-border-strong text-brand-text font-body text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <Txt as="span" className="font-body text-xs uppercase tracking-wider text-brand-text" value={BRAND.ui.checkout.step4} />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="ml-4 p-1 hover:bg-brand-border-strong text-brand-primary-deep transition-colors"
                aria-label={BRAND.ui.checkout.closeLabel}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
          </div>
        </div>

        {/* Workspace Body */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Notice Bar */}
          <div className="w-full bg-brand-surface-hover border border-brand-border p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-brand-secondary text-2xl">
                verified_user
              </span>
              <div>
                <Txt as="p" className="font-body text-xs uppercase tracking-wider text-brand-primary-deep font-bold" value={BRAND.ui.checkout.noGatewayTitle} />
                <Txt as="p" className="font-body text-xs text-brand-text-secondary" value={BRAND.ui.checkout.noGatewayText} />
              </div>
            </div>
            <Txt as="span" className="font-body text-xs text-brand-secondary uppercase bg-white border border-brand-border px-3 py-1 font-bold whitespace-nowrap" value={BRAND.ui.checkout.humanBadge} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Formularios (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Section 1: Contact Data */}
              <div className="bg-white p-5 sm:p-6 shadow-sm border border-brand-border-soft">
                <div className="flex items-center justify-between mb-4 pb-2 bg-brand-surface-muted p-2 border-b border-brand-border-soft">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-brand-primary text-white font-body text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <Txt as="h2" className="font-headline text-lg uppercase tracking-wide text-brand-primary-deep" value={BRAND.ui.checkout.contactTitle} />
                  </div>
                  <Txt as="span" className="font-body text-[11px] uppercase text-brand-secondary font-bold" value={BRAND.ui.checkout.required} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Txt as="label" className="block font-body text-xs uppercase tracking-wider text-brand-text mb-1 font-bold" value={BRAND.ui.checkout.nameLabel} />
                    <input
                      type="text"
                      required
                      value={customerDetails.fullName}
                      onChange={(e) => updateCustomerDetails({ fullName: e.target.value })}
                      placeholder={BRAND.ui.checkout.namePlaceholder}
                      className="w-full bg-brand-surface-muted text-brand-primary-deep px-3 py-2.5 font-body text-sm border border-brand-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-secondary"
                    />
                  </div>

                  <div>
                    <Txt as="label" className="block font-body text-xs uppercase tracking-wider text-brand-text mb-1 font-bold" value={BRAND.ui.checkout.phoneLabel} />
                    <input
                      type="tel"
                      required
                      value={customerDetails.phone}
                      onChange={(e) => updateCustomerDetails({ phone: e.target.value })}
                      placeholder="+54 9 11 0000-0000"
                      className="w-full bg-brand-surface-muted text-brand-primary-deep px-3 py-2.5 font-body text-sm border border-brand-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-secondary"
                    />
                    <Txt as="p" className="font-body text-[11px] text-brand-text-secondary mt-1" value={BRAND.ui.checkout.phoneHelp} />
                  </div>

                  <div>
                    <Txt as="label" className="block font-body text-xs uppercase tracking-wider text-brand-text mb-1 font-bold" value={BRAND.ui.checkout.emailLabel} />
                    <input
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => updateCustomerDetails({ email: e.target.value })}
                      placeholder={BRAND.ui.checkout.emailPlaceholder}
                      className="w-full bg-brand-surface-muted text-brand-primary-deep px-3 py-2.5 font-body text-sm border border-brand-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-secondary"
                    />
                    <Txt as="p" className="font-body text-[11px] text-brand-text-secondary mt-1" value={BRAND.ui.checkout.emailHelp} />
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Method */}
              <div className="bg-white p-5 sm:p-6 shadow-sm border border-brand-border-soft">
                <div className="flex items-center justify-between mb-4 pb-2 bg-brand-surface-muted p-2 border-b border-brand-border-soft">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-brand-primary text-white font-body text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    <Txt as="h2" className="font-headline text-lg uppercase tracking-wide text-brand-primary-deep" value={BRAND.ui.checkout.deliveryTitle} />
                  </div>
                  <Txt as="span" className="font-body text-[11px] uppercase text-brand-text-secondary" value={BRAND.ui.checkout.deliveryHint} />
                </div>

                {/* Radio Options */}
                <div className="flex flex-col gap-3">
                  {/* Option 1: Envío a domicilio */}
                  <label
                    onClick={() =>
                      handleDeliveryChange('envio', BRAND.shipping.homeDeliveryLabel)
                    }
                    className={`p-3.5 cursor-pointer flex items-start gap-3 transition-colors border ${
                      customerDetails.deliveryMethod === 'envio'
                        ? 'bg-brand-surface-hover border-brand-primary'
                        : 'bg-brand-background border-brand-border hover:bg-brand-surface-subtle'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery_method"
                      checked={customerDetails.deliveryMethod === 'envio'}
                      onChange={() => {}}
                      className="mt-1 accent-brand-primary"
                    />
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-headline text-base uppercase text-brand-primary-deep">
                          {BRAND.shipping.homeDeliveryLabel}
                        </span>
                        <Txt as="span" className="font-body text-[10px] uppercase bg-brand-primary text-white px-2 py-0.5 font-bold" value={BRAND.ui.checkout.quoteByZip} />
                      </div>
                      <p className="font-body text-xs text-brand-text-secondary mt-0.5">
                        {BRAND.shipping.homeDeliveryDescription}
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Retiro en Depósito */}
                  <label
                    onClick={() =>
                      handleDeliveryChange('retiro', BRAND.address.pickupLabel)
                    }
                    className={`p-3.5 cursor-pointer flex items-start gap-3 transition-colors border ${
                      customerDetails.deliveryMethod === 'retiro'
                        ? 'bg-brand-surface-hover border-brand-primary'
                        : 'bg-brand-background border-brand-border hover:bg-brand-surface-subtle'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery_method"
                      checked={customerDetails.deliveryMethod === 'retiro'}
                      onChange={() => {}}
                      className="mt-1 accent-brand-primary"
                    />
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-headline text-base uppercase text-brand-primary-deep">
                          {BRAND.address.pickupLabel}
                        </span>
                        <Txt as="span" className="font-body text-[10px] uppercase bg-brand-secondary text-white px-2 py-0.5 font-bold" value={BRAND.ui.checkout.free} />
                      </div>
                      <p className="font-body text-xs text-brand-text-secondary mt-0.5">
                        {formatText(BRAND.ui.checkout.pickupDetails, { address: BRAND.address.full, hours: BRAND.address.pickupHours })}
                      </p>
                    </div>
                  </label>

                  {/* Option 3: Expreso al Interior */}
                  <label
                    onClick={() =>
                      handleDeliveryChange('expreso', BRAND.ui.checkout.expressLabel)
                    }
                    className={`p-3.5 cursor-pointer flex items-start gap-3 transition-colors border ${
                      customerDetails.deliveryMethod === 'expreso'
                        ? 'bg-brand-surface-hover border-brand-primary'
                        : 'bg-brand-background border-brand-border hover:bg-brand-surface-subtle'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery_method"
                      checked={customerDetails.deliveryMethod === 'expreso'}
                      onChange={() => {}}
                      className="mt-1 accent-brand-primary"
                    />
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between">
                        <Txt as="span" className="font-headline text-base uppercase text-brand-primary-deep" value={BRAND.ui.checkout.expressTitle} />
                        <Txt as="span" className="font-body text-[10px] uppercase bg-brand-border text-brand-text px-2 py-0.5 font-bold" value={BRAND.ui.checkout.expressBadge} />
                      </div>
                      <Txt as="p" className="font-body text-xs text-brand-text-secondary mt-0.5" value={BRAND.ui.checkout.expressDescription} />
                    </div>
                  </label>
                </div>

                {/* Conditional Address Fields */}
                {!isRetiro && (
                  <div className="mt-4 pt-4 bg-brand-surface-muted p-4 border border-brand-border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-body text-xs uppercase tracking-wider text-brand-primary-deep font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-brand-secondary">
                          pin_drop
                        </span>{' '}
                        {BRAND.ui.checkout.destinationTitle}
                      </span>
                      <Txt as="span" className="font-body text-[11px] text-brand-text-secondary" value={BRAND.ui.checkout.destinationHint} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                      <div className="sm:col-span-4">
                        <Txt as="label" className="block font-body text-[11px] uppercase text-brand-text-secondary mb-1 font-bold" value={BRAND.ui.checkout.streetLabel} />
                        <input
                          type="text"
                          required
                          value={customerDetails.street}
                          onChange={(e) => updateCustomerDetails({ street: e.target.value })}
                          placeholder={BRAND.ui.checkout.streetPlaceholder}
                          className="w-full bg-white text-brand-primary-deep px-3 py-2 font-body text-xs border border-brand-border focus:outline-none focus:ring-1 focus:ring-brand-secondary"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <Txt as="label" className="block font-body text-[11px] uppercase text-brand-text-secondary mb-1 font-bold" value={BRAND.ui.checkout.apartmentLabel} />
                        <input
                          type="text"
                          value={customerDetails.floor}
                          onChange={(e) => updateCustomerDetails({ floor: e.target.value })}
                          placeholder={BRAND.ui.checkout.apartmentPlaceholder}
                          className="w-full bg-white text-brand-primary-deep px-3 py-2 font-body text-xs border border-brand-border focus:outline-none focus:ring-1 focus:ring-brand-secondary"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <Txt as="label" className="block font-body text-[11px] uppercase text-brand-text-secondary mb-1 font-bold" value={BRAND.ui.checkout.zipLabel} />
                        <input
                          type="text"
                          required
                          value={customerDetails.postalCode}
                          onChange={(e) => updateCustomerDetails({ postalCode: e.target.value })}
                          placeholder={BRAND.ui.checkout.zipPlaceholder}
                          className="w-full bg-white text-brand-primary-deep px-3 py-2 font-body text-xs border border-brand-border focus:outline-none focus:ring-1 focus:ring-brand-secondary"
                        />
                      </div>

                      <div className="sm:col-span-4">
                        <Txt as="label" className="block font-body text-[11px] uppercase text-brand-text-secondary mb-1 font-bold" value={BRAND.ui.checkout.cityLabel} />
                        <input
                          type="text"
                          required
                          value={customerDetails.city}
                          onChange={(e) => updateCustomerDetails({ city: e.target.value })}
                          placeholder={formatText(BRAND.ui.checkout.cityPlaceholder, { city: BRAND.address.city })}
                          className="w-full bg-white text-brand-primary-deep px-3 py-2 font-body text-xs border border-brand-border focus:outline-none focus:ring-1 focus:ring-brand-secondary"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: Notes */}
              <div className="bg-white p-5 sm:p-6 shadow-sm border border-brand-border-soft">
                <div className="flex items-center justify-between mb-3 pb-2 bg-brand-surface-muted p-2 border-b border-brand-border-soft">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-brand-primary text-white font-body text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    <Txt as="h2" className="font-headline text-lg uppercase tracking-wide text-brand-primary-deep" value={BRAND.ui.checkout.notesTitle} />
                  </div>
                  <Txt as="span" className="font-body text-[11px] uppercase text-brand-text-secondary" value={BRAND.ui.checkout.optional} />
                </div>

                <Txt as="label" className="block font-body text-[11px] uppercase text-brand-text-secondary mb-1 font-bold" value={BRAND.ui.checkout.notesLabel} />
                <textarea
                  rows={3}
                  value={customerDetails.notes}
                  onChange={(e) => updateCustomerDetails({ notes: e.target.value })}
                  placeholder={BRAND.ui.checkout.notesPlaceholder}
                  className="w-full bg-brand-surface-muted text-brand-primary-deep p-3 font-body text-sm border border-brand-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-secondary"
                />
                <Txt as="p" className="font-body text-[11px] text-brand-text-secondary mt-1" value={BRAND.ui.checkout.notesHelp} />
              </div>
            </div>

            {/* RIGHT COLUMN: Resumen & WhatsApp Cierre (5 Cols) */}
            <aside className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
              {/* Order Ledger Preview */}
              <div className="bg-white p-5 sm:p-6 shadow-md border border-brand-border">
                <div className="flex items-center justify-between pb-2 bg-brand-surface-subtle p-2 mb-3 border-b border-brand-border">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-primary-deep">inventory_2</span>
                    <h3 className="font-headline text-lg uppercase tracking-wide text-brand-primary-deep">
                      {formatText(BRAND.ui.checkout.summaryTitle, { count: String(items.length) })}
                    </h3>
                  </div>
                  <Txt as="button"
                    type="button"
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="font-body text-xs text-brand-secondary uppercase hover:underline font-bold cursor-pointer" value={BRAND.ui.checkout.edit} />
                </div>

                {/* Items List */}
                <div className="flex flex-col divide-y divide-brand-surface-subtle max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          width={getProductImageDimensions(item.product.images[0])?.width}
                          height={getProductImageDimensions(item.product.images[0])?.height}
                          className="w-11 h-11 object-cover bg-brand-surface-subtle border border-brand-border"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="flex flex-col">
                          <span className="font-body text-xs uppercase font-bold text-brand-primary-deep">
                            {item.quantity}x {item.product.name}
                          </span>
                          <span className="font-body text-[11px] text-brand-text-secondary">
                            {formatText(BRAND.ui.checkout.sizeColor, { size: item.size, color: item.color })}
                          </span>
                        </div>
                      </div>
                      <span className="font-headline text-base text-brand-primary-deep font-bold">
                        {formatARS(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total Breakdown */}
                <div className="mt-4 pt-3 bg-brand-surface-muted p-3 flex flex-col gap-1.5 border border-brand-border">
                  <div className="flex justify-between font-body text-xs text-brand-text-secondary">
                    <Txt as="span" value={BRAND.ui.checkout.subtotal} />
                    <span>{formatARS(subtotal)}</span>
                  </div>

                  {comboDiscount > 0 && (
                    <div className="flex justify-between font-body text-xs text-brand-secondary font-bold">
                      <span>{formatText(BRAND.ui.checkout.combo, { min: String(BRAND.b2b.comboMinItems), percent: String(BRAND.b2b.comboDiscountPercent) })}</span>
                      <span>-{formatARS(comboDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-body text-xs text-brand-text-secondary">
                    <Txt as="span" value={BRAND.ui.checkout.shippingCost} />
                    <span className="font-body text-[10px] uppercase bg-brand-surface-hover px-1 font-bold text-brand-primary-deep">
                      {isRetiro ? BRAND.ui.checkout.pickupFree : BRAND.ui.checkout.shippingByWhatsapp}
                    </span>
                  </div>

                  <div className="mt-2 pt-2 bg-white p-2.5 border border-brand-border flex justify-between items-baseline shadow-sm">
                    <Txt as="span" className="font-headline text-lg uppercase tracking-wide text-brand-primary-deep font-bold" value={BRAND.ui.checkout.total} />
                    <span className="font-headline text-2xl sm:text-3xl text-brand-primary-deep font-bold tracking-tight">
                      {formatARS(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Live Preview Terminal */}
              <div className="bg-brand-surface-subtle p-4 sm:p-5 shadow-sm border border-brand-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-xs uppercase tracking-wider text-brand-primary-deep font-bold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-secondary"></span>{BRAND.ui.checkout.previewTitle}</span>
                  <Txt as="span" className="font-body text-[10px] text-brand-text-secondary font-semibold" value={BRAND.ui.checkout.previewBadge} />
                </div>

                {/* Mock Chat Bubble */}
                <div className="bg-white p-3 text-brand-primary-deep shadow-sm font-mono text-xs leading-relaxed whitespace-pre-wrap select-all overflow-x-auto border border-brand-border max-h-56">
                  {whatsappPreview}
                </div>
                <Txt as="p" className="font-body text-[11px] text-brand-text-secondary mt-2 italic" value={BRAND.ui.checkout.previewNote} />
              </div>

              {/* High-Impact CTA Button */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={confirmOrderAndSendWhatsApp}
                  className="w-full bg-brand-primary hover:bg-brand-primary-deep text-white py-4 px-4 flex items-center justify-center gap-3 font-body text-sm uppercase tracking-wider font-bold shadow-lg transition-all active:scale-[0.99] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-2xl text-brand-accent-light">chat</span>
                  <Txt as="span" value={BRAND.ui.checkout.confirm} />
                </button>

                <div className="bg-brand-surface-subtle border border-brand-border p-2.5 flex items-center justify-center gap-2 text-center">
                  <span className="material-symbols-outlined text-sm text-brand-secondary">schedule</span>
                  <span className="font-body text-xs text-brand-text-secondary">
                    {BRAND.ui.checkout.responseStart} <strong>{BRAND.ui.checkout.responseStrong}</strong> {formatText(BRAND.ui.checkout.responseEnd, { hours: BRAND.address.pickupHours })}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 border border-brand-border flex items-center gap-2.5 shadow-sm">
                  <span className="material-symbols-outlined text-brand-secondary text-2xl">
                    receipt_long
                  </span>
                  <div className="flex flex-col">
                    <Txt as="span" className="font-body text-xs uppercase font-bold text-brand-primary-deep" value={BRAND.ui.checkout.trustInvoiceTitle} />
                    <Txt as="span" className="font-body text-[11px] text-brand-text-secondary" value={BRAND.ui.checkout.trustInvoiceText} />
                  </div>
                </div>

                <div className="bg-white p-3 border border-brand-border flex items-center gap-2.5 shadow-sm">
                  <span className="material-symbols-outlined text-brand-secondary text-2xl">
                    warehouse
                  </span>
                  <div className="flex flex-col">
                    <Txt as="span" className="font-body text-xs uppercase font-bold text-brand-primary-deep" value={BRAND.ui.checkout.trustStockTitle} />
                    <Txt as="span" className="font-body text-[11px] text-brand-text-secondary" value={BRAND.ui.checkout.trustStockText} />
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
