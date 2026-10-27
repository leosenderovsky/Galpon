import React from 'react';
import { Txt } from './Txt';
import { useCart } from '../context/CartContext';
import { formatARS, getProductImageDimensions } from '../products';
import { BRAND, formatText } from '../brand.config';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    comboDiscount,
    total,
    wholesaleThreshold,
    amountToWholesale,
    isWholesaleQualified
  } = useCart();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(
    100,
    Math.round(((wholesaleThreshold - amountToWholesale) / wholesaleThreshold) * 100)
  );

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-primary-deep/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <aside className="w-screen max-w-md sm:max-w-xl md:max-w-2xl bg-white h-full flex flex-col justify-between shadow-2xl overflow-hidden border-l border-brand-primary">
          {/* Top Status & Drawer Header */}
          <div className="flex flex-col bg-brand-surface-muted shrink-0 border-b border-brand-border-soft">
            {/* Header Bar */}
            <div className="p-4 sm:px-6 py-4 flex items-center justify-between bg-brand-primary text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-secondary flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-base text-white">
                    inventory_2
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-[10px] uppercase tracking-widest text-brand-accent-light">
                    {BRAND.address.warehouseName}
                  </span>
                  <h2 className="font-headline text-2xl tracking-wide uppercase leading-none">
                    {formatText(BRAND.ui.cart.title, { count: String(totalItems) })}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label={BRAND.ui.cart.closeLabel}
                className="w-9 h-9 flex items-center justify-center bg-brand-primary-deep hover:bg-brand-secondary text-white transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Wholesale Progress Indicator Box */}
            <div className="px-4 sm:px-6 py-3 bg-brand-accent-light text-brand-accent-on flex flex-col gap-1.5 border-b border-brand-accent">
              <div className="flex items-center justify-between">
                <span className="font-body text-xs uppercase font-bold flex items-center gap-1.5 text-brand-accent-on">
                  <span className="material-symbols-outlined text-base text-brand-secondary">
                    local_shipping
                  </span>{BRAND.ui.cart.b2bTitle}</span>
                <span className="font-body text-xs font-bold uppercase tracking-wider text-brand-secondary">
                  {isWholesaleQualified
                    ? BRAND.ui.cart.targetReached
                    : formatText(BRAND.ui.cart.missing, { amount: formatARS(amountToWholesale) })}
                </span>
              </div>

              {/* Progress Bar & Hint */}
              <div className="w-full bg-brand-accent h-2.5 overflow-hidden">
                <div
                  className="bg-brand-secondary h-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <p className="font-body text-[11px] leading-tight text-brand-secondary-dark font-medium">
                {isWholesaleQualified
                  ? BRAND.ui.cart.b2bReachedMessage
                  : formatText(BRAND.ui.cart.b2bProgress, { amount: formatARS(amountToWholesale), target: formatARS(wholesaleThreshold) })}
              </p>
            </div>
          </div>

          {/* Scrollable Order Items List */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
                <span className="material-symbols-outlined text-5xl text-brand-border">
                  shopping_bag
                </span>
                <Txt as="p" className="font-headline text-2xl uppercase text-brand-primary-deep" value={BRAND.ui.cart.emptyTitle} />
                <Txt as="p" className="font-body text-xs text-brand-text-secondary max-w-xs" value={BRAND.ui.cart.emptyDescription} />
                <Txt as="button"
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-3 px-6 py-2.5 bg-brand-primary text-white font-body text-xs uppercase font-bold tracking-wider hover:bg-brand-primary-deep" value={BRAND.ui.cart.emptyButton} />
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 sm:gap-4 p-3 bg-brand-background border border-brand-border-soft hover:border-brand-primary transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 sm:w-24 sm:h-28 shrink-0 bg-brand-surface-hover overflow-hidden relative border border-brand-border">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={getProductImageDimensions(item.product.images[0])?.width}
                      height={getProductImageDimensions(item.product.images[0])?.height}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute bottom-0 left-0 bg-brand-primary text-white font-body text-[10px] px-1.5 py-0.5 uppercase font-bold">
                      {item.size}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-headline text-base sm:text-lg uppercase text-brand-primary-deep leading-snug">
                          {item.product.name}
                        </h3>
                        <span className="font-headline text-base sm:text-lg font-bold text-brand-primary-deep">
                          {formatARS(item.unitPrice * item.quantity)}
                        </span>
                      </div>

                      <p className="font-body text-xs text-brand-text-secondary mt-0.5">{BRAND.ui.cart.sizeLabel}{" "}<span className="font-bold text-brand-text">{item.size}</span>
                        {'  '}|{'  '}
                        {BRAND.ui.cart.colorLabel}{" "}<span className="font-bold text-brand-text">{item.color}</span>
                      </p>

                      <div className="mt-1 flex items-center gap-1.5 font-body text-[10px] text-brand-secondary font-bold uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary"></span>
                        <span>{item.product.materialTag || BRAND.ui.cart.reinforcedBadge}</span>
                      </div>
                    </div>

                    {/* Quantity Stepper & Remove */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center bg-white border border-brand-border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-headline text-base text-brand-primary-deep hover:bg-brand-surface-subtle transition-colors cursor-pointer select-none"
                          aria-label={BRAND.ui.cart.decreaseLabel}
                        >
                          -
                        </button>
                        <span className="w-8 sm:w-9 h-7 sm:h-8 flex items-center justify-center font-body text-xs font-bold text-brand-primary-deep bg-white select-none">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-headline text-base text-brand-primary-deep hover:bg-brand-surface-subtle transition-colors cursor-pointer select-none"
                          aria-label={BRAND.ui.cart.increaseLabel}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 text-brand-text-secondary hover:text-brand-danger transition-colors font-body text-[11px] uppercase font-bold px-2 py-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                        <Txt as="span" value={BRAND.ui.cart.remove} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Packing Spec Note */}
            {items.length > 0 && (
              <div className="p-3 bg-brand-surface-subtle border border-brand-border flex items-start gap-3 mt-4">
                <span className="material-symbols-outlined text-brand-primary text-xl mt-0.5 shrink-0">
                  verified
                </span>
                <div className="flex flex-col">
                  <span className="font-body text-xs uppercase font-bold text-brand-primary-deep">
                    {BRAND.address.packingLabel}
                  </span>
                  <Txt as="p" className="font-body text-xs text-brand-text-secondary leading-snug" value={BRAND.ui.cart.packingNote} />
                </div>
              </div>
            )}
          </div>

          {/* Footer Summary & Direct Checkout Action */}
          {items.length > 0 && (
            <div className="bg-brand-background p-4 sm:p-6 flex flex-col gap-3 shadow-lg shrink-0 border-t border-brand-border">
              <div className="flex flex-col gap-1.5 font-body text-xs">
                <div className="flex justify-between items-center text-brand-text-secondary">
                  <span>{formatText(BRAND.ui.cart.subtotal, { count: String(totalItems) })}</span>
                  <span className="font-medium text-brand-primary-deep">{formatARS(subtotal)}</span>
                </div>

                {comboDiscount > 0 && (
                  <div className="flex justify-between items-center text-brand-secondary font-medium">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">sell</span>
                      {formatText(BRAND.ui.cart.combo, { min: String(BRAND.b2b.comboMinItems), percent: String(BRAND.b2b.comboDiscountPercent) })}
                    </span>
                    <span className="font-bold">-{formatARS(comboDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-brand-text-secondary">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">local_shipping</span>{BRAND.ui.cart.shipping}</span>
                  <Txt as="span" className="uppercase text-[10px] font-bold text-brand-primary-deep" value={BRAND.ui.cart.shippingNote} />
                </div>

                {/* Total Highlight Box */}
                <div className="mt-2 pt-2 bg-white p-3 border border-brand-border flex justify-between items-baseline shadow-sm">
                  <div className="flex flex-col">
                    <Txt as="span" className="font-body text-[10px] uppercase tracking-widest text-brand-text-secondary font-bold" value={BRAND.ui.cart.total} />
                    <Txt as="span" className="font-body text-[10px] text-brand-secondary font-bold" value={BRAND.ui.cart.totalNote} />
                  </div>
                  <div className="text-right">
                    <span className="font-headline text-3xl font-bold text-brand-primary-deep">
                      {formatARS(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Next Step Disclaimer */}
              <div className="p-2.5 bg-brand-surface-subtle border border-brand-border flex items-start gap-2">
                <span className="material-symbols-outlined text-brand-secondary text-base mt-0.5 shrink-0">
                  info
                </span>
                <p className="font-body text-xs text-brand-text-secondary leading-snug">
                  <Txt as="strong" value={BRAND.ui.cart.noGatewayEmphasis} />{" "}{BRAND.ui.cart.noGatewayText}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full bg-brand-primary hover:bg-brand-primary-deep text-white py-3.5 px-4 flex items-center justify-between font-body text-xs sm:text-sm uppercase tracking-wider font-bold transition-all shadow-md cursor-pointer active:translate-y-0.5"
                >
                  <Txt as="span" value={BRAND.ui.cart.continue} />
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>

                <Txt as="button"
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2 text-center font-body text-xs uppercase tracking-wider text-brand-text-secondary hover:text-brand-primary-deep transition-colors cursor-pointer bg-transparent" value={BRAND.ui.cart.keepShopping} />
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 pt-1 font-body text-[11px] uppercase tracking-wider text-brand-text-secondary">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-brand-secondary text-sm">support_agent</span>{BRAND.ui.cart.trustHuman}</span>
                <span className="text-brand-border">•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-brand-secondary text-sm">bolt</span>{BRAND.ui.cart.trustDispatch}</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
