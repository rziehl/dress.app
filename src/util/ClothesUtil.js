export const CLOTHES_TYPE_OUTERWEAR = 'OUTERWEAR';
export const CLOTHES_TYPE_SWEATER = 'SWEATER';
export const CLOTHES_TYPE_DENIM = 'DENIM';
export const CLOTHES_TYPE_SHIRTING = 'SHIRTING';
export const CLOTHES_TYPE_TEE = 'TEE';
export const CLOTHES_TYPE_PANT = 'PANT';
export const CLOTHES_TYPE_SHORT = 'SHORT';
export const CLOTHES_TYPE_FOOTWEAR = 'FOOTWEAR';
export const CLOTHES_TYPE_BELT = 'BELT';

// TODO: try find a way to avoid repeating the strings here
export type ClothingType = 'OUTERWEAR' | 'SWEATER' | 'DENIM' | 'SHIRTING' | 'TEE' | 'PANT' | 'SHORT' | 'FOOTWEAR' | 'BELT';

export const CLOTHES_CATEGORY_OUTERWEAR = 'OUTERWEAR';
export const CLOTHES_CATEGORY_SWEATER = 'SWEATER';
export const CLOTHES_CATEGORY_SHIRTING = 'SHIRT';
export const CLOTHES_CATEGORY_TEE = 'TEE';
export const CLOTHES_CATEGORY_BELT = 'BELT';
export const CLOTHES_CATEGORY_BOTTOMS = 'BOTTOMS';
export const CLOTHES_CATEGORY_FOOTWEAR = 'FOOTWEAR';

// TODO: try find a way to avoid repeating the strings here
export type ClothingCategory = 'OUTERWEAR' | 'SWEATER' | 'SHIRT' | 'TEE' | 'BELT' | 'BOTTOMS' | 'FOOTWEAR';

export const CLOTHES_CATEGORIES: ClothingCategory[] = [
  CLOTHES_CATEGORY_OUTERWEAR,
  CLOTHES_CATEGORY_SWEATER,
  CLOTHES_CATEGORY_SHIRTING,
  CLOTHES_CATEGORY_TEE,
  CLOTHES_CATEGORY_BELT,
  CLOTHES_CATEGORY_BOTTOMS,
  CLOTHES_CATEGORY_FOOTWEAR
];

// TODO: try work out a way to use the CLOTHES_TYPE variables above as keys

const typesToCategoriesMap = {
  'OUTERWEAR': CLOTHES_CATEGORY_OUTERWEAR,
  'SWEATER': CLOTHES_CATEGORY_SWEATER,
  'DENIM': CLOTHES_CATEGORY_BOTTOMS,
  'SHIRTING': CLOTHES_CATEGORY_SHIRTING,
  'TEE': CLOTHES_CATEGORY_TEE,
  'PANT': CLOTHES_CATEGORY_BOTTOMS,
  'SHORT': CLOTHES_CATEGORY_BOTTOMS,
  'FOOTWEAR': CLOTHES_CATEGORY_FOOTWEAR,
  'BELT': CLOTHES_CATEGORY_BELT,
};

// TODO: try work out a way to use the CLOTHES_CATEGORY variables above as keys

const categoriesToIconsMap = {
  'OUTERWEAR': require('../../res/img/clothes_icons/trench-coat.png'),
  'SWEATER': require('../../res/img/clothes_icons/hoodie.png'),
  'SHIRT': require('../../res/img/clothes_icons/shirt-1.png'),
  'TEE': require('../../res/img/clothes_icons/shirt.png'),
  'BELT': require('../../res/img/clothes_icons/belt.png'),
  'BOTTOMS': require('../../res/img/clothes_icons/jeans.png'),
  'FOOTWEAR': require('../../res/img/clothes_icons/shoe.png')
};

export function typeToCategory(type: ClothingType) {
  return typesToCategoriesMap[type];
}

export function iconForCategory(category: ClothingCategory) {
  return categoriesToIconsMap[category];
}