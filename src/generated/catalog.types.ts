/* Types generated from src/data/catalog.schema.json. Do not edit by hand. */

/**
 * Referencia al esquema que valida estos datos.
 */
export type EsquemaDeDatos = string;
/**
 * Versión del formato de datos utilizado.
 */
export type VersionDelFormato = number;
/**
 * Identificador estable de la categoría, en kebab-case.
 */
export type IdentificadorDeLaCategoria = string;
/**
 * Texto que se muestra para identificar la categoría.
 */
export type NombreVisibleDeLaCategoria = string;
/**
 * Categorías disponibles en el catálogo.
 */
export type CategoriasDelCatalogo = {
  id: IdentificadorDeLaCategoria;
  label: NombreVisibleDeLaCategoria;
}[];
/**
 * Talle que se puede seleccionar para los productos.
 */
export type TalleDisponible = string;
/**
 * Lista completa y ordenada de talles que ofrece el negocio.
 */
export type TallesDisponibles = TalleDisponible[];
/**
 * Talle que se elige al abrir la ficha o al sumar un producto desde la tarjeta, si el producto lo tiene. Si no lo tiene, se elige el primero.
 */
export type TallePreseleccionado = "S" | "M" | "L" | "XL" | "XXL" | "3XL" | "40" | "42" | "44" | "46" | "48";
/**
 * Identificador estable de la categoría, en kebab-case.
 */
export type IdentificadorDelProducto = string;
/**
 * Código interno utilizado para identificar el producto.
 */
export type CodigoInternoDelProducto = string;
/**
 * Nombre que se muestra en el catálogo.
 */
export type NombreDelProducto = string;
/**
 * Línea corta sobre el nombre en la tarjeta del catálogo (por ejemplo, un código de artículo y la línea de producto). Si la dejás vacía, se muestra el nombre de la categoría.
 */
export type EtiquetaDeLaTarjetaDelProducto = string;
/**
 * Debe coincidir con una categoría definida en el catálogo.
 */
export type IdentificadorDeLaCategoria1 = string;
/**
 * Precio de venta del producto.
 */
export type PrecioDeVenta = number;
/**
 * Precio por unidad para compras mayoristas.
 */
export type PrecioMayorista = number;
/**
 * Cantidad mínima para acceder al precio mayorista.
 */
export type CantidadMinimaMayorista = number;
/**
 * Texto que acompaña el precio mayorista.
 */
export type EtiquetaDelPrecioMayorista = string;
/**
 * Talle que se puede seleccionar para los productos.
 */
export type TalleDisponible1 = string;
/**
 * Talles disponibles para este producto.
 */
export type TallesDelProducto = TalleDisponible1[];
/**
 * Nombre visible del color del producto.
 */
export type NombreDelColor = string;
/**
 * Color en formato #RRGGBB.
 */
export type ColorDelProducto = string;
/**
 * Colores disponibles para este producto.
 */
export type ColoresDisponibles = {
  name: NombreDelColor;
  hex: ColorDelProducto;
}[];
/**
 * Ruta pública de una imagen asociada al producto.
 */
export type RutaDeLaImagenDelProducto = string;
/**
 * Rutas de las imágenes asociadas al producto.
 */
export type ImagenesDelProducto = RutaDeLaImagenDelProducto[];
/**
 * Descripción breve que aparece en el catálogo.
 */
export type DescripcionBreveDelProducto = string;
/**
 * Lote informado para el producto.
 */
export type LoteDelProducto = string;
/**
 * Origen informado para el producto.
 */
export type OrigenDelProducto = string;
/**
 * Texto breve que destaca una característica del producto.
 */
export type EtiquetaDestacadaDelProducto = string;
/**
 * Define el color visual de la etiqueta sin depender del texto que muestra.
 */
export type ColorDeLaEtiquetaDestacada = "secondary" | "primary" | "accent";
/**
 * Descripción de la tela y sus características.
 */
export type TelaYMaterial = string;
/**
 * Descripción de las costuras y los refuerzos.
 */
export type Costuras = string;
/**
 * Descripción de botones, cierres u otros componentes.
 */
export type Herrajes = string;
/**
 * Identificador de otro producto relacionado.
 */
export type IdentificadorDelProductoRelacionado = string;
/**
 * Descripción ampliada que aparece en el detalle.
 */
export type DescripcionCompletaDelProducto = string;
/**
 * Material principal del producto.
 */
export type MaterialPrincipal = string;
/**
 * Productos que aparecen en el catálogo.
 */
export type ProductosDelCatalogo = {
  id: IdentificadorDelProducto;
  sku: CodigoInternoDelProducto;
  name: NombreDelProducto;
  cardLabel?: EtiquetaDeLaTarjetaDelProducto;
  category: IdentificadorDeLaCategoria1;
  price: PrecioDeVenta;
  wholesalePrice: PrecioMayorista;
  wholesaleMinUnits: CantidadMinimaMayorista;
  wholesaleBadge: EtiquetaDelPrecioMayorista;
  sizes: TallesDelProducto;
  colors: ColoresDisponibles;
  images: ImagenesDelProducto;
  description: DescripcionBreveDelProducto;
  lot: LoteDelProducto;
  origin: OrigenDelProducto;
  badge?: EtiquetaDestacadaDelProducto;
  badgeTone?: ColorDeLaEtiquetaDestacada;
  specs: EspecificacionesDelProducto;
  relatedProductId?: IdentificadorDelProductoRelacionado;
  longDescription: DescripcionCompletaDelProducto;
  material: MaterialPrincipal;
}[];

export interface CatalogConfig {
  $schema?: EsquemaDeDatos;
  schemaVersion: VersionDelFormato;
  categories: CategoriasDelCatalogo;
  availableSizes: TallesDisponibles;
  settings?: PreferenciasDelCatalogo;
  products: ProductosDelCatalogo;
}
/**
 * Ajustes comerciales del catálogo.
 */
export interface PreferenciasDelCatalogo {
  defaultSize?: TallePreseleccionado;
}
/**
 * Detalles de materiales, confección y componentes.
 */
export interface EspecificacionesDelProducto {
  fabric: TelaYMaterial;
  seams: Costuras;
  hardware: Herrajes;
}
