import sizeGuideData from './data/size-guide.json' with { type: 'json' };
import type { SizeGuideConfig } from './generated/size-guide.types';

export type CategorySizeGuide = SizeGuideConfig['guides'][keyof SizeGuideConfig['guides']];
export type SizeMeasurementRow = CategorySizeGuide['rows'][number];

export const SIZE_GUIDES: Record<string, CategorySizeGuide> = (sizeGuideData as SizeGuideConfig).guides;

export function getSizeGuideForProduct(category: string): CategorySizeGuide {
  const firstGuide = Object.values(SIZE_GUIDES)[0];
  return SIZE_GUIDES[category] || firstGuide;
}

export const DEFAULT_SIZE_GUIDE_CATEGORY = Object.keys(SIZE_GUIDES)[0] || '';
