/* Types generated from src/data/size-guide.schema.json. Do not edit by hand. */

/**
 * Referencia al esquema que valida estos datos.
 */
export type EsquemaDeDatos = string;
/**
 * Versión del formato de datos utilizado.
 */
export type VersionDelFormato = number;
/**
 * Debe coincidir con una categoría definida en el catálogo.
 */
export type IdentificadorDeLaCategoria = string;
/**
 * Texto que encabeza la guía de talles.
 */
export type TituloDeLaGuiaDeTalles = string;
/**
 * Margen de variación de las medidas.
 */
export type ToleranciaDeLasMedidas = string;
/**
 * Talle al que corresponden las medidas.
 */
export type Talle = string;
/**
 * Nombre de la medida principal de cada talle.
 */
export type MedidaPrincipal = string;
/**
 * Nombre de la segunda medida de cada talle.
 */
export type MedidaSecundaria = string;
/**
 * Nombre de la tercera medida de cada talle.
 */
export type TerceraMedida = string;
/**
 * Nombre de la referencia adicional de talle.
 */
export type ReferenciaDeTalle = string;
/**
 * Talle al que corresponden las medidas.
 */
export type Talle1 = string;
/**
 * Texto que se muestra para identificar el talle.
 */
export type NombreVisibleDelTalle = string;
/**
 * Medida de pecho o cintura para este talle.
 */
export type MedidaDePechoOCintura = string;
/**
 * Largo de la prenda para este talle.
 */
export type LargoDeLaPrenda = string;
/**
 * Largo de manga o entrepierna para este talle.
 */
export type LargoDeMangaOEntrepierna = string;
/**
 * Estatura sugerida para este talle.
 */
export type EstaturaRecomendada = string;
/**
 * Peso sugerido para este talle.
 */
export type PesoRecomendado = string;
/**
 * Medidas disponibles para cada talle.
 */
export type MedidasPorTalle = {
  size: Talle1;
  sizeLabel: NombreVisibleDelTalle;
  chestOrWaist: MedidaDePechoOCintura;
  length: LargoDeLaPrenda;
  sleeveOrInseam: LargoDeMangaOEntrepierna;
  recommendedHeight: EstaturaRecomendada;
  recommendedWeight?: PesoRecomendado;
}[];
/**
 * Consejo de calce para elegir el talle.
 */
export type RecomendacionDeCalce = string;
/**
 * Texto que se muestra en la pestaña de esta guía.
 */
export type NombreVisibleDeLaPestana = string;

export interface SizeGuideConfig {
  $schema?: EsquemaDeDatos;
  schemaVersion: VersionDelFormato;
  guides: GuiasDeTalles;
}
/**
 * Guías de talles organizadas por categoría.
 */
export interface GuiasDeTalles {
  [k: string]: DatosDeLaGuiaDeTalles;
}
/**
 * Medidas y textos de una categoría del catálogo.
 *
 * This interface was referenced by `GuiasDeTalles`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z0-9]+(?:-[a-z0-9]+)*$".
 */
export interface DatosDeLaGuiaDeTalles {
  category: IdentificadorDeLaCategoria;
  title: TituloDeLaGuiaDeTalles;
  tolerance: ToleranciaDeLasMedidas;
  columns: EncabezadosDeLaTabla;
  rows: MedidasPorTalle;
  recommendationNote: RecomendacionDeCalce;
  tabLabel: NombreVisibleDeLaPestana;
}
/**
 * Textos que encabezan las columnas de la tabla.
 */
export interface EncabezadosDeLaTabla {
  size: Talle;
  primaryMeasure: MedidaPrincipal;
  secondaryMeasure: MedidaSecundaria;
  tertiaryMeasure: TerceraMedida;
  recommendation: ReferenciaDeTalle;
}
