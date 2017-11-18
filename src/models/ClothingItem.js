import type { ClothingType } from '../util/ClothesUtil';

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