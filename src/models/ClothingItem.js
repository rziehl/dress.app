export const TYPE_OUTERWEAR = 'OUTERWEAR';
export const TYPE_SWEATER = 'SWEATER';
export const TYPE_DENIM = 'DENIM';
export const TYPE_SHIRTING = 'SHIRTING';
export const TYPE_TEE = 'TEE';
export const TYPE_PANT = 'PANT';
export const TYPE_SHORT = 'SHORT';
export const TYPE_FOOTWEAR = 'FOOTWEAR';
export const TYPE_BELT = 'BELT';

// TODO: try find a way to avoid repeating the strings here
export type ClothingType = 'OUTERWEAR' | 'SWEATER' | 'DENIM' | 'SHIRTING' | 'TEE' | 'PANT' | 'SHORT' | 'FOOTWEAR' | 'BELT';

export const CATEGORY_OUTERWEAR = 'OUTERWEAR';
export const CATEGORY_SWEATER = 'SWEATER';
export const CATEGORY_SHIRTING = 'SHIRT';
export const CATEGORY_TEE = 'TEE';
export const CATEGORY_BELT = 'BELT';
export const CATEGORY_BOTTOMS = 'BOTTOMS';
export const CATEGORY_FOOTWEAR = 'FOOTWEAR';

// TODO: try find a way to avoid repeating the strings here
export type ClothingCategory = 'OUTERWEAR' | 'SWEATER' | 'SHIRT' | 'TEE' | 'BELT' | 'BOTTOMS' | 'FOOTWEAR';

export type ClothingItem = {
  type: ClothingType,
  name: string,
  color: string,
  brand: string,
  size: string,
  image: string,
  thumbnail: string,
  made_in: string,
  id: number
};