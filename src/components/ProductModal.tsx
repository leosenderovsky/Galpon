import React, { useState, useEffect } from 'react';
import { Product, formatARS, PRODUCTS } from '../products';
import { getSizeGuideForProduct } from '../sizeGuide';
import { useCart } from '../context/CartContext';
import { BRAND } from '../brand.config';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart, setIsCartOpen, setActiveProductModal } = useCart();

  // Selected visual state
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || 'Carbón Oscuro'
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
    <div className="fixed inset-0 z-50 bg-[#000f20]/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto">
      {/* Heavy-Duty Utilitarian Modal Frame */}
      <div className="relative w-full max-w-6xl bg-[#ffffff] shadow-2xl my-auto overflow-hidden text-[#191c1e] border border-[#152536]">
        {/* Top Warehouse Spec Header Bar */}
        <div className="bg-[#152536] text-[#ffffff] px-4 py-2.5 flex items-center justify-between border-b border-[#ffffff]/15">
          <div className="flex items-center gap-3 font-body text-xs uppercase tracking-widest">
            <span className="bg-[#7c5733] px-2.5 py-0.5 text-[#ffffff] font-bold">
              FICHA TÉCNICA
            </span>
            <span className="text-[#7c8ca1] hidden sm:inline">
              LOTE: {product.lot || '2025-Q1'}
            </span>
            <span className="hidden sm:inline text-[#ffffff]/40">/</span>
            <span className="text-xs">ORIGEN: {product.origin || 'TALLER INDUSTRIAL BUENOS AIRES'}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1 hover:bg-[#ffffff]/20 text-[#ffffff] transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Main Modal Content Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Side: Visual Assets & Physical Specifications (5 cols on Desktop) */}
          <div className="lg:col-span-5 bg-[#f3f4f6] p-4 sm:p-6 flex flex-col justify-between gap-5 border-r border-[#e1e2e4]">
            <div className="flex flex-col gap-3">
              {/* Main Hero Image Frame */}
              <div className="relative w-full aspect-square bg-[#e7e8ea] shadow-inner overflow-hidden flex items-center justify-center group border border-[#c4c6cd]">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* SKU Stamped Tag */}
                <div className="absolute top-2 left-2 bg-[#ffffff]/90 px-2.5 py-1 font-body text-[11px] text-[#000f20] font-bold tracking-widest shadow-sm border border-[#e1e2e4]">
                  {product.materialTag || 'SERIE 01 // PESADA'}
                </div>

                {/* Zoom indicator */}
                <div className="absolute bottom-2 right-2 bg-[#000f20]/85 text-[#ffffff] px-2 py-1 flex items-center gap-1 font-body text-[10px] tracking-wider uppercase backdrop-blur-xs">
                  <span className="material-symbols-outlined text-xs">zoom_in</span>
                  <span>Detalle Real</span>
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
                          ? 'border-[#152536] ring-2 ring-[#152536] opacity-100'
                          : 'border-[#c4c6cd] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Vista ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-[#000f20]/80 text-[#ffffff] font-body text-[9px] py-0.5 text-center truncate px-0.5">
                        {idx === 0 ? 'Frente' : idx === 1 ? 'Botones' : idx === 2 ? 'Remaches' : 'Costura'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Material & Construction Specification Card */}
            <div className="bg-[#edeef0] p-4 shadow-sm flex flex-col gap-2 border border-[#c4c6cd]">
              <div className="flex items-center gap-1.5 text-[#7c5733]">
                <span className="material-symbols-outlined text-base">verified</span>
                <span className="font-body text-xs font-bold uppercase tracking-wider">
                  Especificaciones de Fábrica
                </span>
              </div>

              <div className="flex flex-col gap-1.5 text-[#44474c] font-body text-xs">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[10px] mt-1 text-[#000f20]">
                    fiber_manual_record
                  </span>
                  <span>
                    <strong>Tejido:</strong>{' '}
                    {product.specs?.fabric || 'Lona 100% Algodón de alto gramaje con torsión industrial.'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[10px] mt-1 text-[#000f20]">
                    fiber_manual_record
                  </span>
                  <span>
                    <strong>Confección:</strong>{' '}
                    {product.specs?.seams || 'Costuras dobles reforzadas con atraques en zonas de tensión.'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[10px] mt-1 text-[#000f20]">
                    fiber_manual_record
                  </span>
                  <span>
                    <strong>Herrajes:</strong>{' '}
                    {product.specs?.hardware || 'Botonadura maciza de alta durabilidad.'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Details, Wholesale Matrix, Sizes & Conversion (7 cols on Desktop) */}
          <div className="lg:col-span-7 p-4 sm:p-6 lg:p-8 flex flex-col justify-between gap-6 bg-[#ffffff]">
            <div className="flex flex-col gap-5">
              {/* Breadcrumbs, SKU, Stock Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-[#f3f4f6]">
                <div className="flex items-center gap-2 font-body text-xs uppercase tracking-wider text-[#44474c]">
                  <span>
                    SKU: <strong className="text-[#000f20]">{product.sku}</strong>
                  </span>
                  <span className="text-[#c4c6cd]">|</span>
                  <span>LÍNEA TRABAJO CONTINUO</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#dfe4df] text-[#181d1a] px-2.5 py-0.5 font-body text-[11px] uppercase font-bold tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#7c5733] animate-pulse"></span>
                  <span>Stock Disponible Inmediato</span>
                </div>
              </div>

              {/* Title & Concept */}
              <div>
                <h1 className="font-headline text-3xl sm:text-4xl font-bold text-[#000f20] tracking-tight uppercase leading-tight">
                  {product.name}
                </h1>
                <p className="font-body text-sm text-[#44474c] mt-1.5 leading-relaxed">
                  {product.extendedDescription || product.description}
                </p>
              </div>

              {/* Tiered Dual-Price Block (Retail & Wholesale) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#edeef0] p-2 border border-[#c4c6cd]">
                <div className="bg-[#ffffff] p-3 flex flex-col justify-center border border-[#e1e2e4]">
                  <span className="font-body text-[10px] uppercase tracking-wider text-[#44474c]">
                    Precio Unitario Minorista
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-headline text-3xl font-bold text-[#000f20]">
                      {formatARS(product.price)}
                    </span>
                    <span className="font-body text-[11px] text-[#44474c]">IVA incl.</span>
                  </div>
                  <span className="font-body text-[11px] text-[#44474c]">
                    Compra individual / factura A o B
                  </span>
                </div>

                <div className="bg-[#ffdcbf] text-[#2d1600] p-3 flex flex-col justify-center relative overflow-hidden border border-[#fdcb9e]">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-[10px] uppercase tracking-wider font-bold text-[#7c5733]">
                      A partir de {product.wholesaleMinUnits} unidades
                    </span>
                    <span className="bg-[#7c5733] text-[#ffffff] px-1.5 py-0.2 font-body text-[10px] font-bold">
                      {Math.round(((product.price - product.wholesalePrice) / product.price) * 100)}% OFF
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-headline text-3xl font-bold text-[#2d1600]">
                      {formatARS(product.wholesalePrice)}
                    </span>
                    <span className="font-body text-[11px] font-semibold">c/u mayorista</span>
                  </div>
                  <span className="font-body text-[11px] text-[#613f1e]">
                    Ahorrás {formatARS(product.price - product.wholesalePrice)} por prenda
                  </span>
                </div>
              </div>

              {/* Color Swatch Selector */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="font-body text-xs uppercase tracking-wider font-bold text-[#000f20]">
                    Color Seleccionado:{' '}
                    <span className="text-[#7c5733] font-bold">{selectedColor}</span>
                  </label>
                  <span className="font-body text-[11px] text-[#44474c] uppercase">
                    {product.colors.length} Tonos Industriales
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
                            ? 'bg-[#e7e8ea] ring-2 ring-[#152536] border-[#152536]'
                            : 'bg-[#edeef0] hover:bg-[#e7e8ea] border-[#c4c6cd]'
                        }`}
                      >
                        <span
                          className="w-5 h-5 block shadow-inner border border-[#191c1e]/20"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="font-body text-[11px] uppercase font-semibold pr-2 text-[#191c1e]">
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
                    <label className="font-body text-xs uppercase tracking-wider font-bold text-[#000f20]">
                      Talle Seleccionado:
                    </label>
                    <span className="font-body text-sm font-bold text-[#7c5733]">
                      {selectedSize}
                    </span>
                  </div>

                  {/* Guía de talles button / toggle */}
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                    className="flex items-center gap-1 text-[#7c5733] hover:text-[#000f20] transition-colors font-body text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">straighten</span>
                    <span>Guía de Medidas Exactas</span>
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
                            ? 'bg-[#152536] text-[#ffffff] shadow-sm border-[#152536]'
                            : 'bg-[#edeef0] hover:bg-[#e7e8ea] text-[#191c1e] border-[#c4c6cd]'
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
                <div className="bg-[#f3f4f6] p-3.5 flex flex-col gap-2 border border-[#c4c6cd] transition-all">
                  <div className="flex items-center justify-between pb-1 border-b border-[#e1e2e4]">
                    <div className="flex items-center gap-1.5 font-body text-[11px] font-bold uppercase tracking-wider text-[#7c5733]">
                      <span className="material-symbols-outlined text-sm">square_foot</span>
                      <span>{sizeGuide.title}</span>
                    </div>
                    <span className="font-body text-[10px] text-[#44474c] font-semibold">
                      {sizeGuide.tolerance}
                    </span>
                  </div>

                  {/* Measurement Table */}
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left font-body text-xs">
                      <thead>
                        <tr className="bg-[#e7e8ea] text-[#000f20] font-body text-[10px] uppercase tracking-wider font-bold">
                          <th className="py-1.5 px-2.5">{sizeGuide.columns.size}</th>
                          <th className="py-1.5 px-2.5">{sizeGuide.columns.primaryMeasure}</th>
                          <th className="py-1.5 px-2.5">{sizeGuide.columns.secondaryMeasure}</th>
                          <th className="py-1.5 px-2.5">{sizeGuide.columns.tertiaryMeasure}</th>
                          <th className="py-1.5 px-2.5 text-right">{sizeGuide.columns.recommendation}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e1e2e4]">
                        {sizeGuide.rows.map((row) => {
                          const isActive = row.size === selectedSize;
                          return (
                            <tr
                              key={row.size}
                              onClick={() => setSelectedSize(row.size)}
                              className={`cursor-pointer transition-colors ${
                                isActive
                                  ? 'bg-[#ffdcbf]/60 font-bold text-[#2d1600]'
                                  : 'hover:bg-[#e7e8ea]/50'
                              }`}
                            >
                              <td className="py-1.5 px-2.5 font-headline text-base flex items-center gap-1">
                                <span>{row.size}</span>
                                {isActive && (
                                  <span className="material-symbols-outlined text-xs text-[#7c5733]">
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

                  <p className="font-body text-[11px] text-[#44474c] italic pt-1">
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
                <div className="flex items-center bg-[#e7e8ea] h-12 w-full sm:w-36 border border-[#c4c6cd]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-full flex items-center justify-center font-headline text-xl text-[#000f20] hover:bg-[#d9dadc] transition-colors cursor-pointer select-none"
                    aria-label="Disminuir cantidad"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center font-headline text-xl font-bold text-[#000f20] select-none">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-full flex items-center justify-center font-headline text-xl text-[#000f20] hover:bg-[#d9dadc] transition-colors cursor-pointer select-none"
                    aria-label="Aumentar cantidad"
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
                      ? 'bg-[#7c5733] text-[#ffffff]'
                      : 'bg-[#152536] hover:bg-[#000f20] text-[#ffffff]'
                  }`}
                >
                  <span className="font-body text-xs sm:text-sm uppercase tracking-wider font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">
                      {addedSuccess ? 'check' : 'shopping_cart_checkout'}
                    </span>
                    {addedSuccess
                      ? `¡SUMADO AL PEDIDO (${quantity} UNID)!`
                      : 'AGREGAR AL PEDIDO'}
                  </span>
                  <span className="font-headline text-xl font-bold">
                    {formatARS(totalPrice)}
                  </span>
                </button>
              </div>

              {/* Wholesale Whatsapp Direct Inquiry */}
              <a
                href={`https://wa.me/${BRAND.whatsapp.rawNumber}?text=${encodeURIComponent(
                  `Hola ${BRAND.name}, quisiera consultar por la prenda ${product.name} (SKU ${product.sku}) por curva mayorista de ${quantity >= product.wholesaleMinUnits ? quantity : product.wholesaleMinUnits} unidades.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 bg-[#edeef0] hover:bg-[#e7e8ea] text-[#000f20] border border-[#c4c6cd] flex items-center justify-center gap-2 font-body text-xs uppercase tracking-wider font-bold transition-colors"
              >
                <span className="material-symbols-outlined text-[#7c5733] text-base">chat</span>
                <span>Consultar stock de este talle por WhatsApp</span>
              </a>

              {/* Assurance Micro-Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-[#f3f4f6]">
                <div className="flex items-center gap-2 text-[#44474c] font-body text-[11px] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[#7c5733] text-sm">sync_alt</span>
                  <span>Cambio de talle sin costo (15 días)</span>
                </div>
                <div className="flex items-center gap-2 text-[#44474c] font-body text-[11px] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[#7c5733] text-sm">local_shipping</span>
                  <span>Despacho express a todo el país</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Drawer Tray for Direct Related Pair */}
        {relatedProduct && (
          <div className="bg-[#e7e8ea] px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#c4c6cd]">
            <div className="flex items-center gap-2">
              <span className="bg-[#152536] text-[#ffffff] font-body text-[10px] px-2 py-0.5 uppercase tracking-wider font-bold">
                Conjunto Cuadrilla
              </span>
              <span className="font-body text-xs text-[#000f20]">
                Combiná esta prenda con: <strong>{relatedProduct.name}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body text-xs font-bold text-[#000f20]">
                {formatARS(relatedProduct.price)}
              </span>
              <button
                type="button"
                onClick={() => setActiveProductModal(relatedProduct)}
                className="font-body text-xs uppercase tracking-wider text-[#7c5733] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>Ver Prenda</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
