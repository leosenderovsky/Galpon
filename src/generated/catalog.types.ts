/* Types generated from src/data/catalog.schema.json. Do not edit by hand. */

/**
 * Dato editable del catálogo.
 */
export type CampoCatalogo$Schema = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoSchemaVersion = number;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoCategoriesId = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoCategoriesLabel = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoAvailableSizes = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsId = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsSku = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsName = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsCategory = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsPrice = number;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsWholesalePrice = number;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsWholesaleMinUnits = number;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsWholesaleBadge = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsSizes = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsColorsName = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsColorsHex = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsImages = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsDescription = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsLot = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsOrigin = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsBadge = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsSpecsFabric = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsSpecsSeams = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsSpecsHardware = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsRelatedProductId = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsLongDescription = string;
/**
 * Dato editable del catálogo.
 */
export type CampoCatalogoProductsMaterial = string;

export interface CatalogConfig {
  $schema?: CampoCatalogo$Schema;
  schemaVersion: CampoCatalogoSchemaVersion;
  categories: {
    id: CampoCatalogoCategoriesId;
    label: CampoCatalogoCategoriesLabel;
  }[];
  availableSizes: CampoCatalogoAvailableSizes[];
  products: {
    id: CampoCatalogoProductsId;
    sku: CampoCatalogoProductsSku;
    name: CampoCatalogoProductsName;
    category: CampoCatalogoProductsCategory;
    price: CampoCatalogoProductsPrice;
    wholesalePrice: CampoCatalogoProductsWholesalePrice;
    wholesaleMinUnits: CampoCatalogoProductsWholesaleMinUnits;
    wholesaleBadge: CampoCatalogoProductsWholesaleBadge;
    sizes: CampoCatalogoProductsSizes[];
    colors: {
      name: CampoCatalogoProductsColorsName;
      hex: CampoCatalogoProductsColorsHex;
    }[];
    images: CampoCatalogoProductsImages[];
    description: CampoCatalogoProductsDescription;
    lot: CampoCatalogoProductsLot;
    origin: CampoCatalogoProductsOrigin;
    badge?: CampoCatalogoProductsBadge;
    specs: {
      fabric: CampoCatalogoProductsSpecsFabric;
      seams: CampoCatalogoProductsSpecsSeams;
      hardware: CampoCatalogoProductsSpecsHardware;
    };
    relatedProductId?: CampoCatalogoProductsRelatedProductId;
    longDescription: CampoCatalogoProductsLongDescription;
    material: CampoCatalogoProductsMaterial;
  }[];
}
