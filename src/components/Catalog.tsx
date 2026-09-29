import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES, Product, formatARS } from '../products';
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
    const defaultColor = product.colors[0]?.name || 'Estándar';
    addToCart(product, defaultSize, defaultColor, 1);

    setAddedToast({ name: product.name, price: product.price });
    setTimeout(() => {
      setAddedToast(null);
    }, 2800);
  };

  return (
    <section className="w-full bg-[#f8f9fb] py-14 sm:py-20" id="catalogo">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header & Ledger Meta */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8">
          <div className="flex flex-col gap-1">
            <span className="font-body text-xs uppercase tracking-widest text-[#7c5733] font-bold">
              DESPACHO DIRECTO DE PRODUCCIÓN
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl uppercase text-[#000f20] tracking-tight leading-tight">
              CATÁLOGO DE EXISTENCIAS 2025
            </h2>
            <p className="font-body text-sm sm:text-base text-[#44474c]">
              Filtrá por categoría y talles. Precios unitarios minoristas y escalas de curva mayorista por caja o bulto.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-[#e7e8ea] px-4 py-2 text-[#191c1e] shadow-sm">
            <span className="material-symbols-outlined text-[#7c5733] text-lg">tune</span>
            <span className="font-body text-xs sm:text-sm uppercase font-bold tracking-wider">
              {filteredProducts.length} ARTÍCULOS ACTIVOS
            </span>
          </div>
        </div>

        {/* Filter Controls Tier */}
        <div className="bg-[#ffffff] p-4 sm:p-5 shadow-sm border border-[#e1e2e4] mb-8 flex flex-col gap-4">
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
                      ? 'bg-[#152536] text-[#ffffff] shadow-sm'
                      : 'bg-[#edeef0] text-[#191c1e] hover:bg-[#e7e8ea]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Secondary Filter: Sizes and Sorting */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1 bg-[#f3f4f6] p-3 border border-[#e1e2e4]">
            {/* Size Selector Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="font-body text-xs uppercase tracking-wider text-[#44474c] font-bold pr-1">
                Talle:
              </span>
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
                        ? 'bg-[#152536] text-[#ffffff] shadow-sm'
                        : 'bg-[#ffffff] text-[#191c1e] hover:bg-[#edeef0] border border-[#d9dadc]'
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
                className="hidden sm:flex items-center gap-1.5 text-[#7c5733] hover:text-[#000f20] font-body text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">straighten</span>
                <span>Guía de Talles</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="font-body text-xs uppercase tracking-wider text-[#44474c] font-bold">
                  Ordenar:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#ffffff] text-[#191c1e] font-body text-xs uppercase tracking-wider px-3 py-1.5 font-bold border border-[#c4c6cd] focus:outline-none focus:ring-1 focus:ring-[#7c5733] cursor-pointer"
                >
                  <option value="featured">Más Vendidos</option>
                  <option value="price-asc">Menor Precio</option>
                  <option value="price-desc">Mayor Precio</option>
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
              className="group bg-[#ffffff] border border-[#e1e2e4] shadow-sm flex flex-col justify-between transition-all hover:shadow-md hover:border-[#152536] cursor-pointer"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative w-full aspect-square bg-[#f3f4f6] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Top Status Badge */}
                  {product.badge && (
                    <div
                      className={`absolute top-3 left-3 px-2.5 py-1 font-body text-[11px] uppercase tracking-widest font-bold shadow-sm ${
                        product.badge === 'DESTACADO'
                          ? 'bg-[#7c5733] text-[#ffffff]'
                          : product.badge === 'MÁS VENDIDO'
                          ? 'bg-[#152536] text-[#ffffff]'
                          : product.badge === 'PACK X2'
                          ? 'bg-[#fdcb9e] text-[#2d1600]'
                          : 'bg-[#7c5733] text-[#ffffff]'
                      }`}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Material Spec Tag */}
                  {product.materialTag && (
                    <div className="absolute bottom-3 right-3 bg-[#000f20]/90 text-[#ffffff] px-2 py-0.5 font-body text-[10px] uppercase font-bold tracking-wider backdrop-blur-xs">
                      {product.materialTag}
                    </div>
                  )}

                  {/* Quick Inspect Overlay */}
                  <div className="absolute inset-0 bg-[#152536]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-[#ffffff] text-[#000f20] px-3.5 py-1.5 font-body text-xs uppercase tracking-wider font-bold shadow-md flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      Ver Ficha Técnica
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 sm:p-5 flex flex-col gap-2">
                  <span className="font-body text-[11px] uppercase tracking-wider text-[#7c5733] font-bold">
                    {product.categoryLabel}
                  </span>
                  <h3 className="font-headline text-2xl uppercase text-[#000f20] leading-tight group-hover:text-[#7c5733] transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#44474c] line-clamp-2">
                    {product.description}
                  </p>

                  {/* Sizes Chips */}
                  <div className="flex items-center gap-1.5 pt-2 flex-wrap">
                    <span className="font-body text-[11px] uppercase text-[#44474c] font-bold pr-1">
                      Talles:
                    </span>
                    {product.sizes.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 bg-[#edeef0] text-[#191c1e] font-body text-[11px] font-bold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Colors Preview Dots */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="font-body text-[11px] uppercase text-[#44474c] font-bold pr-1">
                      Tonos:
                    </span>
                    {product.colors.map((c, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 border border-[#c4c6cd] shadow-inner"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & Add Trigger */}
              <div className="p-4 sm:p-5 pt-0 flex flex-col gap-3">
                <div className="bg-[#f3f4f6] p-3 flex items-center justify-between border border-[#e1e2e4]">
                  <div>
                    <span className="font-body text-[10px] uppercase tracking-wider text-[#44474c] block">
                      Precio Minorista
                    </span>
                    <span className="font-headline text-xl text-[#000f20] font-bold leading-none">
                      {formatARS(product.price)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-body text-[10px] uppercase tracking-wider text-[#7c5733] font-bold block">
                      {product.wholesaleBadge}
                    </span>
                    <span className="font-body text-sm text-[#7c5733] font-bold leading-none">
                      {formatARS(product.wholesalePrice)} c/u
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveProductModal(product)}
                    className="w-full bg-[#edeef0] hover:bg-[#e7e8ea] text-[#191c1e] py-2.5 font-body text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1 transition-colors border border-[#c4c6cd] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">straighten</span>
                    <span>Medidas</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="w-full bg-[#152536] hover:bg-[#000f20] text-[#ffffff] py-2.5 font-body text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm active:translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-sm">shopping_cart</span>
                    <span>Sumar</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state if filter doesn't match */}
        {filteredProducts.length === 0 && (
          <div className="p-12 text-center bg-[#ffffff] border border-[#e1e2e4] my-6">
            <span className="material-symbols-outlined text-4xl text-[#7c5733] mb-2">inventory_2</span>
            <p className="font-headline text-xl uppercase text-[#000f20]">No encontramos prendas para este filtro</p>
            <p className="font-body text-sm text-[#44474c] mt-1">Probá seleccionando otra categoría o limpiando el filtro de talles.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSizeFilter('all');
              }}
              className="mt-4 px-6 py-2.5 bg-[#152536] text-[#ffffff] font-body text-xs uppercase tracking-wider font-bold"
            >
              Ver Todo el Catálogo
            </button>
          </div>
        )}

        {/* Inventory Ledger Footnote Banner */}
        <div className="mt-12 bg-[#edeef0] border border-[#c4c6cd] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#7c5733] text-3xl">precision_manufacturing</span>
            <div>
              <span className="font-body text-sm sm:text-base uppercase text-[#000f20] font-bold block">
                ¿Buscás una tabla de medidas exacta para tu equipo?
              </span>
              <span className="font-body text-xs sm:text-sm text-[#44474c]">
                Todas las prendas son confeccionadas bajo norma IRAM de holgura de trabajo y faena pesada.
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedCategoryForGuide('camperas');
              setIsSizeGuideModalOpen(true);
            }}
            className="bg-[#152536] text-[#ffffff] px-6 py-3 font-body text-xs uppercase tracking-wider font-bold hover:bg-[#000f20] transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            Ver Tabla de Medidas Oficial (IRAM)
          </button>
        </div>
      </div>

      {/* Floating Quick Toast Notification when adding item */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 bg-[#000f20] text-[#ffffff] p-4 shadow-2xl z-50 flex items-center gap-3 border-l-4 border-[#7c5733] animate-bounce-short">
          <span className="material-symbols-outlined text-[#fdcb9e] text-2xl">check_circle</span>
          <div className="flex flex-col">
            <span className="font-body text-xs uppercase font-bold tracking-wider text-[#fdcb9e]">
              ¡Agregado al Pedido!
            </span>
            <span className="font-body text-sm text-[#ffffff]">
              {addedToast.name} — {formatARS(addedToast.price)}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-3 px-3 py-1.5 bg-[#7c5733] hover:bg-[#613f1e] text-[#ffffff] font-body text-xs uppercase font-bold"
          >
            Ver Carrito
          </button>
        </div>
      )}
    </section>
  );
};
