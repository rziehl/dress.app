import type { ClothingCategory } from '../models/ClothingItem';
import type { ClothingItem } from '../models/ClothingItem';

// actions

export const SET_CLOTHING_ITEMS = 'SET_CLOTHING_ITEMS';
export const SET_CLOTHING_FILTER = 'SET_CLOTHING_FILTER';

type SetClothingItemsAction = {
  type: typeof SET_CLOTHING_ITEMS,
  items: ClothingItem[]
}

type SetClothingFilterAction = {
  type: typeof SET_CLOTHING_FILTER,
  filter: ?string
}

type ClothesAction = SetClothingItemsAction | SetClothingFilterAction;

// action creators

export const setClothingItems = (clothes: ClothingItem[] = []) : SetClothingItemsAction => {
  return {
    type: SET_CLOTHING_ITEMS,
    items: clothes
  }
}

export const setClothingFilter = (filter: ?string) : SetClothingFilterAction => {
  return {
    type: SET_CLOTHING_FILTER,
    filter: filter
  }
}

// state

export type ClothesState = {
  items: ClothingItem[],
  filter: ?string,
}

const initialClothesState: ClothesState = {
  items: [],
  filter: undefined
};

// reducer

export const clothes = (state: ClothesState = initialClothesState, action: ClothesAction) : ClothesState => {
  switch (action.type) {
    case SET_CLOTHING_ITEMS:
      return {
          ...state,
          items: action.items
      }
    case SET_CLOTHING_FILTER:
      return {
        ...state,
        filter: action.filter
      }
    default:
      return state;
  } 
}