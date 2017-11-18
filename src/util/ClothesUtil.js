import type { ClothingType } from '../models/ClothingItem';
import type { ClothingCategory } from '../models/ClothingItem';
import * as Clothes from '../models/ClothingItem';

export const CLOTHES_CATEGORIES: ClothingCategory[] = [
  Clothes.CATEGORY_OUTERWEAR,
  Clothes.CATEGORY_SWEATER,
  Clothes.CATEGORY_SHIRTING,
  Clothes.CATEGORY_TEE,
  Clothes.CATEGORY_BELT,
  Clothes.CATEGORY_BOTTOMS,
  Clothes.CATEGORY_FOOTWEAR
];

// TODO: try work out a way to use the CLOTHES_TYPE variables above as keys

const typesToCategoriesMap = {
  'OUTERWEAR': Clothes.CATEGORY_OUTERWEAR,
  'SWEATER': Clothes.CATEGORY_SWEATER,
  'DENIM': Clothes.CATEGORY_BOTTOMS,
  'SHIRTING': Clothes.CATEGORY_SHIRTING,
  'TEE': Clothes.CATEGORY_TEE,
  'PANT': Clothes.CATEGORY_BOTTOMS,
  'SHORT': Clothes.CATEGORY_BOTTOMS,
  'FOOTWEAR': Clothes.CATEGORY_FOOTWEAR,
  'BELT': Clothes.CATEGORY_BELT,
};

// TODO: try work out a way to use the Clothes.CATEGORY variables above as keys

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