import type { Fit } from '../models/Fit';
import type { ClothingItem } from '../models/ClothingItem';
import * as Clothes from '../models/ClothingItem';
import type { ClothingCategory } from '../models/ClothingItem';

export function getFitItemForCategory(fit: Fit, category: ClothingCategory): ?ClothingItem {
  switch(category) {
    case Clothes.CATEGORY_OUTERWEAR: return fit.outerwear;
    case Clothes.CATEGORY_SWEATER: return fit.sweater;
    case Clothes.CATEGORY_SHIRTING: return fit.shirt;
    case Clothes.CATEGORY_TEE: return fit.tee;
    case Clothes.CATEGORY_BELT: return fit.belt;
    case Clothes.CATEGORY_BOTTOMS: return fit.bottoms;
    case Clothes.CATEGORY_FOOTWEAR: return fit.footwear;
    default: return undefined;
  }
}