import React, { useState, useMemo } from 'react';
import { Txt } from './Txt';
import { BRAND, formatText } from '../brand.config';
import { PRODUCTS, CATEGORIES, Product, formatARS, getProductImageDimensions } from '../products';
import { useCart } from '../context/CartContext';

export const Catalog: React.FC = () => {
  const { addToCart, setActiveProductModal, setIsSizeGuideModalOpen, setSelectedCategoryForGuide, setIsCartOpen } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [addedToast, setAddedToast] = useState<{ name: string; price: number } | null>(null);

  // Available size buttons for quick filter
  const filterSizes = ['TODOS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '40', '42', '44', '46', '48'];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSize =
        selectedSizeFilter === 'all' ||
        selectedSizeFilter === 'TODOS' ||
        product.sizes.includes(selectedSizeFilter);
      return matchesCategory && matchesSize;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // default featured
    });
  }, [selectedCategory, selectedSizeFilter, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    // Use default first size and first color
    const defaultSize = product.sizes[0] || 'L';
    const defaultColor = product.colors[0]?.name || BRAND.ui.catalog.standardColor;
    addToCart(product, defaultSize, defaultColor, 1);

    setAddedToast({ name: product.name, price: product.price });
    setTimeout(() => {
      setAddedToast(null);
    }, 2800);
  };

  return (
    <section className="w-full bg-brand-background py-14 sm:py-20" id="catalogo">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header & Ledger Meta */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8">
          <div className="flex flex-col gap-1">
            <Txt as="span" className="font-body text-xs uppercase tracking-widest text-brand-secondary font-bold" value={BRAND.ui.catalog.eyebrow} />
            <Txt as="h2" className="font-headline text-3xl sm:text-5xl uppercase text-brand-primary-deep tracking-tight leading-tight" value={BRAND.ui.catalog.title} />
            <Txt as="p" className="font-body text-sm sm:text-base text-brand-text-secondary" value={BRAND.ui.catalog.description} />
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-brand-surface-hover px-4 py-2 text-brand-text shadow-sm">
            <span className="material-symbols-outlined text-brand-secondary text-lg">tune</span>
            <span className="font-body text-xs sm:text-sm uppercase font-bold tracking-wider">
              {formatText(BRAND.ui.catalog.activeCount, { count: String(filteredProducts.length) })}
            </span>
          </div>
        </div>

        {/* Filter Controls Tier */}
        <div className="bg-white p-4 sm:p-5 shadow-sm border border-brand-border-soft mb-8 flex flex-col gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1" id="category-bar">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 font-body text-xs sm:text-sm uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'bg-brand-surface-subtle text-brand-text hover:bg-brand-surface-hover'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Secondary Filter: Sizes and Sorting */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1 bg-brand-surface-muted p-3 border border-brand-border-soft">
            {/* Size Selector Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <Txt as="span" className="font-body text-xs uppercase tracking-wider text-brand-text-secondary font-bold pr-1" value={BRAND.ui.catalog.sizeFilterLabel} />
              {filterSizes.map((size) => {
                const isActive =
                  selectedSizeFilter === size ||
                  (size === 'TODOS' && selectedSizeFilter === 'all');
                return (
                  <button
                    key={size}
                    onClick={() =>
                      setSelectedSizeFilter(size === 'TODOS' ? 'all' : size)
                    }
                    className={`min-w-8 h-8 px-2 text-xs font-body font-bold flex items-center justify-center transition-all cursor-pointer ${
                      isActive
                        ? 'bg-brand-primary text-white shadow-sm'
                        : 'bg-white text-brand-text hover:bg-brand-surface-subtle border border-brand-border-strong'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {/* Sorting Controls & Size Guide Trigger */}
            <div className="flex items-center gap-4 self-end lg:self-auto">
              <button
                onClick={() => {
                  setSelectedCategoryForGuide(
                    selectedCategory === 'all' ? 'camperas' : selectedCategory
                  );
                  setIsSizeGuideModalOpen(true);
                }}
                className="hidden sm:flex items-center gap-1.5 text-brand-secondary hover:text-brand-primary-deep font-body text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">straighten</span>
                <Txt as="span" value={BRAND.ui.catalog.sizeGuideButton} />
              </button>

              <div className="flex items-center gap-2">
                <Txt as="span" className="font-body text-xs uppercase tracking-wider text-brand-text-secondary font-bold" value={BRAND.ui.catalog.sortLabel} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white text-brand-text font-body text-xs uppercase tracking-wider px-3 py-1.5 font-bold border border-brand-border focus:outline-none focus:ring-1 focus:ring-brand-secondary cursor-pointer"
                >
                  <option value="featured">{BRAND.ui.catalog.sortPopular}</option>
                  <option value="price-asc">{BRAND.ui.catalog.sortPriceAsc}</option>
                  <option value="price-desc">{BRAND.ui.catalog.sortPriceDesc}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              onClick={() => setActiveProductModal(product)}
              className="group bg-white border border-brand-border-soft shadow-sm flex flex-col justify-between transition-all hover:shadow-md hover:border-brand-primary cursor-pointer"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative w-full aspect-square bg-brand-surface-muted overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    width={getProductImageDimensions(product.images[0])?.width}
                    height={getProductImageDimensions(product.images[0])?.height}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Top Status Badge */}
                  {product.badge && (
                    <div
                      className={`absolute top-3 left-3 px-2.5 py-1 font-body text-[11px] uppercase tracking-widest font-bold shadow-sm ${
                        product.badge === 'DESTACADO'
                          ? 'bg-brand-secondary text-white'
                          : product.badge === 'MÁS VENDIDO'
                          ? 'bg-brand-primary text-white'
                          : product.badge === 'PACK X2'
                          ? 'bg-brand-accent text-brand-accent-on'
                          : 'bg-brand-secondary text-white'
                      }`}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Material Spec Tag */}
                  {product.materialTag && (
                    <div className="absolute bottom-3 right-3 bg-brand-primary-deep/90 text-white px-2 py-0.5 font-body text-[10px] uppercase font-bold tracking-wider backdrop-blur-xs">
                      {product.materialTag}
                    </div>
                  )}

                  {/* Quick Inspect Overlay */}
                  <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-white text-brand-primary-deep px-3.5 py-1.5 font-body text-xs uppercase tracking-wider font-bold shadow-md flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">visibility</span>{BRAND.ui.catalog.viewSheet}</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 sm:p-5 flex flex-col gap-2">
                  <span className="font-body text-[11px] uppercase tracking-wider text-brand-secondary font-bold">
                    {product.categoryLabel}
                  </span>
                  <h3 className="font-headline text-2xl uppercase text-brand-primary-deep leading-tight group-hover:text-brand-secondary transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-brand-text-secondary line-clamp-2">
                    {product.description}
                  </p>

                  {/* Sizes Chips */}
                  <div className="flex items-center gap-1.5 pt-2 flex-wrap">
                    <Txt as="span" className="font-body text-[11px] uppercase text-brand-text-secondary font-bold pr-1" value={BRAND.ui.catalog.cardSizes} />
                    {product.sizes.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 bg-brand-surface-subtle text-brand-text font-body text-[11px] font-bold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Colors Preview Dots */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <Txt as="span" className="font-body text-[11px] uppercase text-brand-text-secondary font-bold pr-1" value={BRAND.ui.catalog.cardColors} />
                    {product.colors.map((c, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 border border-brand-border shadow-inner"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & Add Trigger */}
              <div className="p-4 sm:p-5 pt-0 flex flex-col gap-3">
                <div className="bg-brand-surface-muted p-3 flex items-center justify-between border border-brand-border-soft">
                  <div>
                    <Txt as="span" className="font-body text-[10px] uppercase tracking-wider text-brand-text-secondary block" value={BRAND.ui.catalog.retailPrice} />
                    <span className="font-headline text-xl text-brand-primary-deep font-bold leading-none">
                      {formatARS(product.price)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-body text-[10px] uppercase tracking-wider text-brand-secondary font-bold block">
                      {product.wholesaleBadge}
                    </span>
                    <span className="font-body text-sm text-brand-secondary font-bold leading-none">
                      {formatARS(product.wholesalePrice)} c/u
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveProductModal(product)}
                    className="w-full bg-brand-surface-subtle hover:bg-brand-surface-hover text-brand-text py-2.5 font-body text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1 transition-colors border border-brand-border cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">straighten</span>
                    <Txt as="span" value={BRAND.ui.catalog.measures} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="w-full bg-brand-primary hover:bg-brand-primary-deep text-white py-2.5 font-body text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm active:translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-sm">shopping_cart</span>
                    <Txt as="span" value={BRAND.ui.catalog.add} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state if filter doesn't match */}
        {filteredProducts.length === 0 && (
          <div className="p-12 text-center bg-white border border-brand-border-soft my-6">
            <span className="material-symbols-outlined text-4xl text-brand-secondary mb-2">inventory_2</span>
            <Txt as="p" className="font-headline text-xl uppercase text-brand-primary-deep" value={BRAND.ui.catalog.emptyTitle} />
            <Txt as="p" className="font-body text-sm text-brand-text-secondary mt-1" value={BRAND.ui.catalog.emptyDescription} />
            <Txt as="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSizeFilter('all');
              }}
              className="mt-4 px-6 py-2.5 bg-brand-primary text-white font-body text-xs uppercase tracking-wider font-bold" value={BRAND.ui.catalog.viewAll} />
          </div>
        )}

        {/* Inventory Ledger Footnote Banner */}
        <div className="mt-12 bg-brand-surface-subtle border border-brand-border p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-brand-secondary text-3xl">precision_manufacturing</span>
            <div>
              <Txt as="span" className="font-body text-sm sm:text-base uppercase text-brand-primary-deep font-bold block" value={BRAND.ui.catalog.sizeCtaTitle} />
              <Txt as="span" className="font-body text-xs sm:text-sm text-brand-text-secondary" value={BRAND.ui.catalog.sizeCtaText} />
            </div>
          </div>
          <Txt as="button"
            onClick={() => {
              setSelectedCategoryForGuide('camperas');
              setIsSizeGuideModalOpen(true);
            }}
            className="bg-brand-primary text-white px-6 py-3 font-body text-xs uppercase tracking-wider font-bold hover:bg-brand-primary-deep transition-colors cursor-pointer shrink-0 shadow-sm" value={BRAND.ui.catalog.sizeCtaButton} />
        </div>
      </div>

      {/* Floating Quick Toast Notification when adding item */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 bg-brand-primary-deep text-white p-4 shadow-2xl z-50 flex items-center gap-3 border-l-4 border-brand-secondary animate-bounce-short">
          <span className="material-symbols-outlined text-brand-accent text-2xl">check_circle</span>
          <div className="flex flex-col">
            <Txt as="span" className="font-body text-xs uppercase font-bold tracking-wider text-brand-accent" value={BRAND.ui.catalog.addedToast} />
            <span className="font-body text-sm text-white">
              {addedToast.name} — {formatARS(addedToast.price)}
            </span>
          </div>
          <Txt as="button"
            onClick={() => setIsCartOpen(true)}
            className="ml-3 px-3 py-1.5 bg-brand-secondary hover:bg-brand-secondary-dark text-white font-body text-xs uppercase font-bold" value={BRAND.ui.catalog.viewCart} />
        </div>
      )}
    </section>
  );
};
