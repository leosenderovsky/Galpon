/**
 * SIZE GUIDE & MEASUREMENTS REPOSITORY
 * ====================================
 * Tablas de datos de medidas oficiales bajo norma de confección IRAM de trabajo.
 * Enlazadas directamente desde la ficha de cada producto y desde el pie de página.
 */

export interface SizeMeasurementRow {
  size: string;
  sizeLabel?: string;
  chestOrWaist: string;
  length: string;
  sleeveOrInseam?: string;
  recommendedHeight?: string;
  recommendedWeight?: string;
}

export interface CategorySizeGuide {
  category: string;
  title: string;
  tolerance: string;
  columns: {
    size: string;
    primaryMeasure: string;
    secondaryMeasure: string;
    tertiaryMeasure: string;
    recommendation: string;
  };
  rows: SizeMeasurementRow[];
  recommendationNote: string;
}

export const SIZE_GUIDES: Record<string, CategorySizeGuide> = {
  camperas: {
    category: 'camperas',
    title: 'Medidas de Camperas y Abrigos Pesados (Prenda Extendida)',
    tolerance: 'Tolerancia ± 1 cm',
    columns: {
      size: 'Talle',
      primaryMeasure: 'Pecho / Sisa (cm)',
      secondaryMeasure: 'Largo Espalda (cm)',
      tertiaryMeasure: 'Largo Manga (cm)',
      recommendation: 'Estatura Rec.'
    },
    rows: [
      {
        size: 'M',
        sizeLabel: 'M (38-40)',
        chestOrWaist: '104 - 108 cm',
        length: '72 cm',
        sleeveOrInseam: '64.0 cm',
        recommendedHeight: '1.70 - 1.76 m'
      },
      {
        size: 'L',
        sizeLabel: 'L (42-44)',
        chestOrWaist: '110 - 114 cm',
        length: '74 cm',
        sleeveOrInseam: '65.5 cm',
        recommendedHeight: '1.77 - 1.83 m'
      },
      {
        size: 'XL',
        sizeLabel: 'XL (46-48)',
        chestOrWaist: '116 - 120 cm',
        length: '76 cm',
        sleeveOrInseam: '67.0 cm',
        recommendedHeight: '1.82 - 1.88 m'
      },
      {
        size: 'XXL',
        sizeLabel: 'XXL (50-52)',
        chestOrWaist: '122 - 126 cm',
        length: '78 cm',
        sleeveOrInseam: '68.0 cm',
        recommendedHeight: '1.86 - 1.95 m'
      },
      {
        size: '3XL',
        sizeLabel: '3XL (Especial)',
        chestOrWaist: '128 - 134 cm',
        length: '80 cm',
        sleeveOrInseam: '69.5 cm',
        recommendedHeight: '1.88 - 2.00 m'
      }
    ],
    recommendationNote:
      'Corte regular de trabajo: Posee holgura funcional pensada para calzar con un buzo o camisa de abrigo debajo. Si dudás entre dos talles para uso con ropa pesada, sugerimos elegir el superior.'
  },

  pantalones: {
    category: 'pantalones',
    title: 'Medidas de Pantalones Cargo y Faena',
    tolerance: 'Tolerancia ± 1 cm',
    columns: {
      size: 'Talle Arg.',
      primaryMeasure: 'Cintura Contorno (cm)',
      secondaryMeasure: 'Cadera (cm)',
      tertiaryMeasure: 'Largo Total (cm)',
      recommendation: 'Talle Jean Ref.'
    },
    rows: [
      {
        size: '40',
        sizeLabel: 'Talle 40',
        chestOrWaist: '80 - 84 cm',
        length: '104 cm',
        sleeveOrInseam: '100 cm',
        recommendedHeight: 'Jean 28 - 30'
      },
      {
        size: '42',
        sizeLabel: 'Talle 42',
        chestOrWaist: '84 - 88 cm',
        length: '105 cm',
        sleeveOrInseam: '104 cm',
        recommendedHeight: 'Jean 31 - 32'
      },
      {
        size: '44',
        sizeLabel: 'Talle 44',
        chestOrWaist: '88 - 92 cm',
        length: '106 cm',
        sleeveOrInseam: '108 cm',
        recommendedHeight: 'Jean 33 - 34'
      },
      {
        size: '46',
        sizeLabel: 'Talle 46',
        chestOrWaist: '92 - 96 cm',
        length: '107 cm',
        sleeveOrInseam: '112 cm',
        recommendedHeight: 'Jean 36'
      },
      {
        size: '48',
        sizeLabel: 'Talle 48',
        chestOrWaist: '96 - 102 cm',
        length: '108 cm',
        sleeveOrInseam: '116 cm',
        recommendedHeight: 'Jean 38'
      }
    ],
    recommendationNote:
      'Tiro medio-alto reforzado: Permite flexión de rodilla y agacharse en obra sin que se baje en la cintura. Recomendamos medir el contorno sobre el cinturón.'
  },

  remeras: {
    category: 'remeras',
    title: 'Medidas de Remeras Básicas Pesadas 24/1',
    tolerance: 'Tolerancia ± 1 cm',
    columns: {
      size: 'Talle',
      primaryMeasure: 'Ancho Pecho / Sisa (cm)',
      secondaryMeasure: 'Largo Total (cm)',
      tertiaryMeasure: 'Ancho Hombros (cm)',
      recommendation: 'Peso Estimado'
    },
    rows: [
      {
        size: 'S',
        sizeLabel: 'S (36-38)',
        chestOrWaist: '50 cm (100 contorno)',
        length: '69 cm',
        sleeveOrInseam: '44 cm',
        recommendedHeight: '60 - 70 kg'
      },
      {
        size: 'M',
        sizeLabel: 'M (38-40)',
        chestOrWaist: '53 cm (106 contorno)',
        length: '72 cm',
        sleeveOrInseam: '46 cm',
        recommendedHeight: '70 - 80 kg'
      },
      {
        size: 'L',
        sizeLabel: 'L (42-44)',
        chestOrWaist: '56 cm (112 contorno)',
        length: '74 cm',
        sleeveOrInseam: '48 cm',
        recommendedHeight: '80 - 90 kg'
      },
      {
        size: 'XL',
        sizeLabel: 'XL (46-48)',
        chestOrWaist: '59 cm (118 contorno)',
        length: '76 cm',
        sleeveOrInseam: '50 cm',
        recommendedHeight: '90 - 102 kg'
      },
      {
        size: 'XXL',
        sizeLabel: 'XXL (50-52)',
        chestOrWaist: '63 cm (126 contorno)',
        length: '78 cm',
        sleeveOrInseam: '53 cm',
        recommendedHeight: '102 - 115 kg'
      }
    ],
    recommendationNote:
      'Algodón 100% puro peinado: Las prendas fueron sometidas a pre-encogimiento térmico en tintorería, por lo que retienen el tamaño original post lavado con agua fría.'
  },

  chalecos: {
    category: 'chalecos',
    title: 'Medidas de Buzos y Chalecos Térmicos',
    tolerance: 'Tolerancia ± 1 cm',
    columns: {
      size: 'Talle',
      primaryMeasure: 'Contorno Pecho (cm)',
      secondaryMeasure: 'Largo Espalda (cm)',
      tertiaryMeasure: 'Hombro a Hombro (cm)',
      recommendation: 'Estatura Rec.'
    },
    rows: [
      {
        size: 'S',
        sizeLabel: 'S (36-38)',
        chestOrWaist: '102 - 106 cm',
        length: '68 cm',
        sleeveOrInseam: '45 cm',
        recommendedHeight: '1.65 - 1.72 m'
      },
      {
        size: 'M',
        sizeLabel: 'M (38-40)',
        chestOrWaist: '106 - 110 cm',
        length: '71 cm',
        sleeveOrInseam: '47 cm',
        recommendedHeight: '1.70 - 1.77 m'
      },
      {
        size: 'L',
        sizeLabel: 'L (42-44)',
        chestOrWaist: '112 - 116 cm',
        length: '73 cm',
        sleeveOrInseam: '49 cm',
        recommendedHeight: '1.76 - 1.83 m'
      },
      {
        size: 'XL',
        sizeLabel: 'XL (46-48)',
        chestOrWaist: '118 - 122 cm',
        length: '75 cm',
        sleeveOrInseam: '51 cm',
        recommendedHeight: '1.82 - 1.89 m'
      },
      {
        size: 'XXL',
        sizeLabel: 'XXL (50-52)',
        chestOrWaist: '124 - 128 cm',
        length: '77 cm',
        sleeveOrInseam: '53 cm',
        recommendedHeight: '1.85 - 1.95 m'
      }
    ],
    recommendationNote:
      'Chaleco con espalda extendida: Protege la cintura del frío y corrientes de aire en taller y depósito al inclinarse o levantar cargas.'
  }
};

export function getSizeGuideForProduct(category: string): CategorySizeGuide {
  return SIZE_GUIDES[category] || SIZE_GUIDES['camperas'];
}
