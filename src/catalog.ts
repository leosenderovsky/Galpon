import imageDimensions from './generated/imageDimensions.json';
import catalogData from './data/catalog.json' with { type: 'json' };
import type { CatalogConfig } from './generated/catalog.types';
import { BRAND } from './brand.config';

export type Product = CatalogConfig['products'][number];
export type ProductColor = Product['colors'][number];
export type ProductSpecification = NonNullable<Product['specs']>;

const catalog = catalogData as CatalogConfig;

export const CATEGORIES = [
  { id: 'all', label: BRAND.ui.catalog.allCategoryLabel },
  ...catalog.categories,
] as const;
export const AVAILABLE_SIZES = catalog.availableSizes;
export const PRODUCTS: Product[] = catalog.products;

export function getImageDimensions(src: string) {
  return Object.hasOwn(imageDimensions, src)
    ? imageDimensions[src as keyof typeof imageDimensions]
    : undefined;
}

export function getProductImageDimensions(src: string) {
  return getImageDimensions(src);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function formatARS(amount: number): string {
  return '$' + Math.round(amount).toLocaleString('es-AR');
}
