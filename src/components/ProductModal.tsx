import React, { useState, useEffect } from 'react';
import { Txt } from './Txt';
import { Product, formatARS, PRODUCTS, getProductImageDimensions } from '../products';
import { getSizeGuideForProduct } from '../sizeGuide';
import { useCart } from '../context/CartContext';
import { BRAND, formatText } from '../brand.config';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart, setIsCartOpen, setActiveProductModal } = useCart();

  // Selected visual state
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || BRAND.ui.productModal.defaultColor
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.includes('L') ? 'L' : product.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState<boolean>(true);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Sync state when product changes
  useEffect(() => {
    setSelectedImage(product.images[0]);
    setSelectedColor(product.colors[0]?.name || '');
    setSelectedSize(product.sizes.includes('L') ? 'L' : product.sizes[0]);
    setQuantity(1);
    setAddedSuccess(false);
  }, [product]);

  // Size guide data for this product category
  const sizeGuide = getSizeGuideForProduct(product.category);

  // Dynamic price calculation
  const isWholesaleEligible = quantity >= product.wholesaleMinUnits;
  const effectiveUnitPrice = isWholesaleEligible ? product.wholesalePrice : product.price;
  const totalPrice = effectiveUnitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setIsCartOpen(true);
      onClose();
    }, 900);
  };

  // Related product lookup
  const relatedProduct = product.relatedProductId
    ? PRODUCTS.find(p => p.id === product.relatedProductId)
    : null;

  return (
    <div className="fixed inset-0 z-50 bg-brand-primary-deep/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto">
      {/* Heavy-Duty Utilitarian Modal Frame */}
      <div className="relative w-full max-w-6xl bg-white shadow-2xl my-auto overflow-hidden text-brand-text border border-brand-primary">
        {/* Top Warehouse Spec Header Bar */}
        <div className="bg-brand-primary text-white px-4 py-2.5 flex items-center justify-between border-b border-white/15">
          <div className="flex items-center gap-3 font-body text-xs uppercase tracking-widest">
            <Txt as="span" className="bg-brand-secondary px-2.5 py-0.5 text-white font-bold" value={BRAND.ui.productModal.title} />
            <span className="text-brand-text-muted hidden sm:inline">
              {formatText(BRAND.ui.productModal.lotLine, { value: product.lot || BRAND.ui.productModal.defaultLot })}
            </span>
            <span className="hidden sm:inline text-white/40">/</span>
            <span className="text-xs">{formatText(BRAND.ui.productModal.originLine, { value: product.origin || BRAND.ui.productModal.subtitle })}</span>
          </div>

          <button
            onClick={onClose}
            aria-label={BRAND.ui.productModal.closeLabel}
            className="p-1 hover:bg-white/20 text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Main Modal Content Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Side: Visual Assets & Physical Specifications (5 cols on Desktop) */}
          <div className="lg:col-span-5 bg-brand-surface-muted p-4 sm:p-6 flex flex-col justify-between gap-5 border-r border-brand-border-soft">
            <div className="flex flex-col gap-3">
              {/* Main Hero Image Frame */}
              <div className="relative w-full aspect-square bg-brand-surface-hover shadow-inner overflow-hidden flex items-center justify-center group border border-brand-border">
                <img
                  src={selectedImage}
                  alt={product.name}
                  width={getProductImageDimensions(selectedImage)?.width}
                  height={getProductImageDimensions(selectedImage)?.height}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />

                {/* SKU Stamped Tag */}
                <div className="absolute top-2 left-2 bg-white/90 px-2.5 py-1 font-body text-[11px] text-brand-primary-deep font-bold tracking-widest shadow-sm border border-brand-border-soft">
                  {product.materialTag || BRAND.ui.productModal.series}
                </div>

                {/* Zoom indicator */}
                <div className="absolute bottom-2 right-2 bg-brand-primary-deep/85 text-white px-2 py-1 flex items-center gap-1 font-body text-[10px] tracking-wider uppercase backdrop-blur-xs">
                  <span className="material-symbols-outlined text-xs">zoom_in</span>
                  <Txt as="span" value={BRAND.ui.productModal.detailTitle} />
                </div>
              </div>

              {/* Thumbnail Selector Gallery */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {product.images.map((img, idx) => {
                  const isCurrent = selectedImage === img;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`aspect-square relative overflow-hidden transition-all shadow-sm cursor-pointer border ${
                        isCurrent
                          ? 'border-brand-primary ring-2 ring-brand-primary opacity-100'
                          : 'border-brand-border opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={formatText(BRAND.ui.productModal.viewAlt, { number: String(idx + 1) })}
                        width={getProductImageDimensions(img)?.width}
                        height={getProductImageDimensions(img)?.height}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-brand-primary-deep/80 text-white font-body text-[9px] py-0.5 text-center truncate px-0.5">
                        {idx === 0 ? BRAND.ui.productModal.view1 : idx === 1 ? BRAND.ui.productModal.view2 : idx === 2 ? BRAND.ui.productModal.view3 : BRAND.ui.productModal.view4}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Material & Construction Specification Card */}
            <div className="bg-brand-surface-subtle p-4 shadow-sm flex flex-col gap-2 border border-brand-border">
              <div className="flex items-center gap-1.5 text-brand-secondary">
                <span className="material-symbols-outlined text-base">verified</span>
                <Txt as="span" className="font-body text-xs font-bold uppercase tracking-wider" value={BRAND.ui.productModal.specsTitle} />
              </div>

              <div className="flex flex-col gap-1.5 text-brand-text-secondary font-body text-xs">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[10px] mt-1 text-brand-primary-deep">
                    fiber_manual_record
                  </span>
                  <span>
                    <Txt as="strong" value={BRAND.ui.productModal.specFabric} />{' '}
                    {product.specs?.fabric || BRAND.ui.productModal.defaultFabric}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[10px] mt-1 text-brand-primary-deep">
                    fiber_manual_record
                  </span>
                  <span>
                    <Txt as="strong" value={BRAND.ui.productModal.specStitching} />{' '}
                    {product.specs?.seams || BRAND.ui.productModal.defaultStitching}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[10px] mt-1 text-brand-primary-deep">
                    fiber_manual_record
                  </span>
                  <span>
                    <Txt as="strong" value={BRAND.ui.productModal.specHardware} />{' '}
                    {product.specs?.hardware || BRAND.ui.productModal.defaultHardware}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Details, Wholesale Matrix, Sizes & Conversion (7 cols on Desktop) */}
          <div className="lg:col-span-7 p-4 sm:p-6 lg:p-8 flex flex-col justify-between gap-6 bg-white">
            <div className="flex flex-col gap-5">
              {/* Breadcrumbs, SKU, Stock Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-brand-surface-muted">
                <div className="flex items-center gap-2 font-body text-xs uppercase tracking-wider text-brand-text-secondary">
                  <span>
                    {BRAND.ui.productModal.skuLabel}{' '}<strong className="text-brand-primary-deep">{product.sku}</strong>
                  </span>
                  <span className="text-brand-border">|</span>
                  <Txt as="span" value={BRAND.ui.productModal.line} />
                </div>
                <div className="inline-flex items-center gap-1.5 bg-brand-border-soft text-brand-text px-2.5 py-0.5 font-body text-[11px] uppercase font-bold tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse"></span>
                  <Txt as="span" value={BRAND.ui.productModal.stock} />
                </div>
              </div>

              {/* Title & Concept */}
              <div>
                <h1 className="font-headline text-3xl sm:text-4xl font-bold text-brand-primary-deep tracking-tight uppercase leading-tight">
                  {product.name}
                </h1>
                <p className="font-body text-sm text-brand-text-secondary mt-1.5 leading-relaxed">
                  {product.extendedDescription || product.description}
                </p>
              </div>

              {/* Tiered Dual-Price Block (Retail & Wholesale) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-brand-surface-subtle p-2 border border-brand-border">
                <div className="bg-white p-3 flex flex-col justify-center border border-brand-border-soft">
                  <Txt as="span" className="font-body text-[10px] uppercase tracking-wider text-brand-text-secondary" value={BRAND.ui.productModal.retailPrice} />
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-headline text-3xl font-bold text-brand-primary-deep">
                      {formatARS(product.price)}
                    </span>
                    <Txt as="span" className="font-body text-[11px] text-brand-text-secondary" value={BRAND.ui.productModal.vatIncluded} />
                  </div>
                  <Txt as="span" className="font-body text-[11px] text-brand-text-secondary" value={BRAND.ui.productModal.invoiceNote} />
                </div>

                <div className="bg-brand-accent-light text-brand-accent-on p-3 flex flex-col justify-center relative overflow-hidden border border-brand-accent">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-[10px] uppercase tracking-wider font-bold text-brand-secondary">
                      {formatText(BRAND.ui.productModal.wholesaleFromUnits, { units: String(product.wholesaleMinUnits) })}
                    </span>
                    <span className="bg-brand-secondary text-white px-1.5 py-0.2 font-body text-[10px] font-bold">
                      {formatText(BRAND.ui.productModal.offBadge, { percent: String(Math.round(((product.price - product.wholesalePrice) / product.price) * 100)) })}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-headline text-3xl font-bold text-brand-accent-on">
                      {formatARS(product.wholesalePrice)}
                    </span>
                    <Txt as="span" className="font-body text-[11px] font-semibold" value={BRAND.ui.productModal.wholesaleEach} />
                  </div>
                  <span className="font-body text-[11px] text-brand-secondary-dark">
                    {formatText(BRAND.ui.productModal.savingsLine, { amount: formatARS(product.price - product.wholesalePrice) })}
                  </span>
                </div>
              </div>

              {/* Color Swatch Selector */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="font-body text-xs uppercase tracking-wider font-bold text-brand-primary-deep">
                    {BRAND.ui.productModal.selectedColor}{' '}
                    <span className="text-brand-secondary font-bold">{selectedColor}</span>
                  </label>
                  <span className="font-body text-[11px] text-brand-text-secondary uppercase">
                    {formatText(BRAND.ui.productModal.colorsCount, { count: String(product.colors.length) })}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {product.colors.map((c) => {
                    const isCurrent = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 p-1.5 text-left transition-all cursor-pointer border ${
                          isCurrent
                            ? 'bg-brand-surface-hover ring-2 ring-brand-primary border-brand-primary'
                            : 'bg-brand-surface-subtle hover:bg-brand-surface-hover border-brand-border'
                        }`}
                      >
                        <span
                          className="w-5 h-5 block shadow-inner border border-brand-text/20"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="font-body text-[11px] uppercase font-semibold pr-2 text-brand-text">
                          {c.name.split(' (')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector Header & Toggle Trigger */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Txt as="label" className="font-body text-xs uppercase tracking-wider font-bold text-brand-primary-deep" value={BRAND.ui.productModal.selectedSize} />
                    <span className="font-body text-sm font-bold text-brand-secondary">
                      {selectedSize}
                    </span>
                  </div>

                  {/* Guía de talles button / toggle */}
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                    className="flex items-center gap-1 text-brand-secondary hover:text-brand-primary-deep transition-colors font-body text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">straighten</span>
                    <Txt as="span" value={BRAND.ui.productModal.sizeGuide} />
                    <span
                      className={`material-symbols-outlined text-base transition-transform duration-200 ${
                        sizeGuideOpen ? 'rotate-180' : ''
                      }`}
                    >
                      keyboard_arrow_down
                    </span>
                  </button>
                </div>

                {/* Size Buttons Matrix */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`py-2 text-center font-headline text-lg sm:text-xl uppercase transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-brand-primary text-white shadow-sm border-brand-primary'
                            : 'bg-brand-surface-subtle hover:bg-brand-surface-hover text-brand-text border-brand-border'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* EMBEDDED SIZE GUIDE TABLE (Collapsible) */}
              {sizeGuideOpen && (
                <div className="bg-brand-surface-muted p-3.5 flex flex-col gap-2 border border-brand-border transition-all">
                  <div className="flex items-center justify-between pb-1 border-b border-brand-border-soft">
                    <div className="flex items-center gap-1.5 font-body text-[11px] font-bold uppercase tracking-wider text-brand-secondary">
                      <span className="material-symbols-outlined text-sm">square_foot</span>
                      <span>{sizeGuide.title}</span>
                    </div>
                    <span className="font-body text-[10px] text-brand-text-secondary font-semibold">
                      {sizeGuide.tolerance}
                    </span>
                  </div>

                  {/* Measurement Table */}
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left font-body text-xs">
                      <thead>
                        <tr className="bg-brand-surface-hover text-brand-primary-deep font-body text-[10px] uppercase tracking-wider font-bold">
                          <th className="py-1.5 px-2.5">{sizeGuide.columns.size}</th>
                          <th className="py-1.5 px-2.5">{sizeGuide.columns.primaryMeasure}</th>
                          <th className="py-1.5 px-2.5">{sizeGuide.columns.secondaryMeasure}</th>
                          <th className="py-1.5 px-2.5">{sizeGuide.columns.tertiaryMeasure}</th>
                          <th className="py-1.5 px-2.5 text-right">{sizeGuide.columns.recommendation}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border-soft">
                        {sizeGuide.rows.map((row) => {
                          const isActive = row.size === selectedSize;
                          return (
                            <tr
                              key={row.size}
                              onClick={() => setSelectedSize(row.size)}
                              className={`cursor-pointer transition-colors ${
                                isActive
                                  ? 'bg-brand-accent-light/60 font-bold text-brand-accent-on'
                                  : 'hover:bg-brand-surface-hover/50'
                              }`}
                            >
                              <td className="py-1.5 px-2.5 font-headline text-base flex items-center gap-1">
                                <span>{row.size}</span>
                                {isActive && (
                                  <span className="material-symbols-outlined text-xs text-brand-secondary">
                                    check_circle
                                  </span>
                                )}
                              </td>
                              <td className="py-1.5 px-2.5">{row.chestOrWaist}</td>
                              <td className="py-1.5 px-2.5">{row.length}</td>
                              <td className="py-1.5 px-2.5">{row.sleeveOrInseam}</td>
                              <td className="py-1.5 px-2.5 text-right">{row.recommendedHeight}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <p className="font-body text-[11px] text-brand-text-secondary italic pt-1">
                    * {sizeGuide.recommendationNote}
                  </p>
                </div>
              )}
            </div>

            {/* Order Actions & Conversion Area */}
            <div className="flex flex-col gap-3 pt-2">
              {/* Quantity Stepper & Add to Order Bar */}
              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                {/* Quantity Stepper */}
                <div className="flex items-center bg-brand-surface-hover h-12 w-full sm:w-36 border border-brand-border">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-full flex items-center justify-center font-headline text-xl text-brand-primary-deep hover:bg-brand-border-strong transition-colors cursor-pointer select-none"
                    aria-label={BRAND.ui.productModal.decreaseLabel}
                  >
                    -
                  </button>
                  <div className="flex-1 text-center font-headline text-xl font-bold text-brand-primary-deep select-none">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-full flex items-center justify-center font-headline text-xl text-brand-primary-deep hover:bg-brand-border-strong transition-colors cursor-pointer select-none"
                    aria-label={BRAND.ui.productModal.increaseLabel}
                  >
                    +
                  </button>
                </div>

                {/* Main Add Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 px-6 flex items-center justify-between transition-colors shadow-md cursor-pointer ${
                    addedSuccess
                      ? 'bg-brand-secondary text-white'
                      : 'bg-brand-primary hover:bg-brand-primary-deep text-white'
                  }`}
                >
                  <span className="font-body text-xs sm:text-sm uppercase tracking-wider font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">
                      {addedSuccess ? 'check' : 'shopping_cart_checkout'}
                    </span>
                    {addedSuccess
                      ? formatText(BRAND.ui.productModal.addedToOrder, { quantity: String(quantity) })
                      : BRAND.ui.productModal.addToOrder}
                  </span>
                  <span className="font-headline text-xl font-bold">
                    {formatARS(totalPrice)}
                  </span>
                </button>
              </div>

              {/* Wholesale Whatsapp Direct Inquiry */}
              <a
                href={`https://wa.me/${BRAND.whatsapp.rawNumber}?text=${encodeURIComponent(
                  formatText(BRAND.ui.productModal.whatsappInquiry, { name: BRAND.name, product: product.name, sku: product.sku, units: String(quantity >= product.wholesaleMinUnits ? quantity : product.wholesaleMinUnits) })
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 bg-brand-surface-subtle hover:bg-brand-surface-hover text-brand-primary-deep border border-brand-border flex items-center justify-center gap-2 font-body text-xs uppercase tracking-wider font-bold transition-colors"
              >
                <span className="material-symbols-outlined text-brand-secondary text-base">chat</span>
                <Txt as="span" value={BRAND.ui.productModal.askStock} />
              </a>

              {/* Assurance Micro-Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-brand-surface-muted">
                <div className="flex items-center gap-2 text-brand-text-secondary font-body text-[11px] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-brand-secondary text-sm">sync_alt</span>
                  <Txt as="span" value={BRAND.ui.productModal.trustExchange} />
                </div>
                <div className="flex items-center gap-2 text-brand-text-secondary font-body text-[11px] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-brand-secondary text-sm">local_shipping</span>
                  <Txt as="span" value={BRAND.ui.productModal.trustShipping} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Drawer Tray for Direct Related Pair */}
        {relatedProduct && (
          <div className="bg-brand-surface-hover px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-brand-border">
            <div className="flex items-center gap-2">
              <Txt as="span" className="bg-brand-primary text-white font-body text-[10px] px-2 py-0.5 uppercase tracking-wider font-bold" value={BRAND.ui.productModal.crossSellTitle} />
              <span className="font-body text-xs text-brand-primary-deep">{BRAND.ui.productModal.crossSellText}{" "}<strong>{relatedProduct.name}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body text-xs font-bold text-brand-primary-deep">
                {formatARS(relatedProduct.price)}
              </span>
              <button
                type="button"
                onClick={() => setActiveProductModal(relatedProduct)}
                className="font-body text-xs uppercase tracking-wider text-brand-secondary font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <Txt as="span" value={BRAND.ui.productModal.crossSellButton} />
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
