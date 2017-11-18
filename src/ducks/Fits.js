// TODO: include babel-plugin-flow-runtime once it works with react-native
// https://github.com/codemix/flow-runtime/issues/17
// https://codemix.github.io/flow-runtime/#/docs/working-with-flow

//import { reify } from 'flow-runtime';
//import type { Type } from 'flow-runtime';

import * as ClothesUtil from '../util/ClothesUtil';
import type { ClothingItem } from '../models/ClothingItem';
import type { Fit } from '../models/Fit';

// actions

const CREATE_NEW_FIT = 'CREATE_NEW_FIT';
const ADD_ITEM_TO_FIT = 'ADD_ITEM_TO_FIT';
const REMOVE_ITEM_FROM_FIT = 'REMOVE_ITEM_FROM_FIT';
const ADD_FIT = 'ADD_FIT';

type CreateNewFitAction = {
  type: typeof CREATE_NEW_FIT
}

type AddItemToFitAction = {
  type: typeof ADD_ITEM_TO_FIT,
  item: ClothingItem
}

type RemoveItemFromFitAction = {
  type: typeof REMOVE_ITEM_FROM_FIT,
  item: ClothingItem
}

type AddFitAction = {
  type: typeof ADD_FIT,
  fit: Fit
}

type FitsAction = CreateNewFitAction | AddItemToFitAction | RemoveItemFromFitAction | AddFitAction;

// action creators

export const createNewFit = () : CreateNewFitAction => {
  return {
    type: CREATE_NEW_FIT
  }
}

export const addItemToFit = (item: ClothingItem) : AddItemToFitAction => {
  return {
    type: ADD_ITEM_TO_FIT,
    item: item
  }
}

export const removeItemFromFit = (item: ClothingItem) : RemoveItemFromFitAction => {
  return {
    type: REMOVE_ITEM_FROM_FIT,
    item: item
  }
}

export const addFit = (fit: Fit) : AddFitAction => {
  return {
    type: ADD_FIT,
    fit: fit
  }
}

// state

type FitsState = {
  current: ?Fit,
  fits: Fit[],
}

const initialFitsState = {
  current: undefined,
  fits: [],
};

// reducer

export const fits = (state: FitsState = initialFitsState, action : FitsAction) : FitsState => {
  switch (action.type) {
    case CREATE_NEW_FIT:
      return {
        ...state,
        //current: (reify: Type<Fit>) // effectively new Fit()
        current: {
          outerwear: undefined,
          sweater: undefined,
          shirt: undefined,
          tee: undefined,
          bottoms: undefined,
          belt: undefined,
          footwear: undefined
        }
      }
    case ADD_ITEM_TO_FIT:
      var fit = { ...state.current };

      switch (action.item.type) {
        case ClothesUtil.CLOTHES_TYPE_OUTERWEAR: fit.outerwear = action.item; break;
        case ClothesUtil.CLOTHES_TYPE_SWEATER: fit.sweater = action.item; break;
        case ClothesUtil.CLOTHES_TYPE_SHIRTING: fit.shirt = action.item; break;
        case ClothesUtil.CLOTHES_TYPE_TEE: fit.tee = action.item; break;
        case ClothesUtil.CLOTHES_TYPE_PANT: fit.bottoms = action.item; break;
        case ClothesUtil.CLOTHES_TYPE_DENIM: fit.bottoms = action.item; break;
        case ClothesUtil.CLOTHES_TYPE_SHORT: fit.bottoms = action.item; break;
        case ClothesUtil.CLOTHES_TYPE_BELT: fit.belt = action.item; break;
        case ClothesUtil.CLOTHES_TYPE_FOOTWEAR: fit.footwear = action.item; break;
        default: break;
      }

      return {
        ...state,
        current: fit
      }
    case REMOVE_ITEM_FROM_FIT: {
      var fit = { ...state.current };

      switch (action.item.type) {
        case ClothesUtil.CLOTHES_TYPE_OUTERWEAR: fit.outerwear = undefined; break;
        case ClothesUtil.CLOTHES_TYPE_SWEATER: fit.sweater = undefined; break;
        case ClothesUtil.CLOTHES_TYPE_SHIRTING: fit.shirt = undefined; break;
        case ClothesUtil.CLOTHES_TYPE_TEE: fit.tee = undefined; break;
        case ClothesUtil.CLOTHES_TYPE_PANT: fit.bottoms = undefined; break;
        case ClothesUtil.CLOTHES_TYPE_DENIM: fit.bottoms = undefined; break;
        case ClothesUtil.CLOTHES_TYPE_SHORT: fit.bottoms = undefined; break;
        case ClothesUtil.CLOTHES_TYPE_BELT: fit.belt = undefined; break;
        case ClothesUtil.CLOTHES_TYPE_FOOTWEAR: fit.footwear = undefined; break;
        default: break;
      }

      return {
        ...state,
        current: fit
      }
    }
    case ADD_FIT:
      return {
        ...state,
        fits: state.fits.concat([action.fit])
      }
    default:
      return state
  }
}