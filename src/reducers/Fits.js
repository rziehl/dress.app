import * as ClothesUtil from '../util/ClothesUtil';

const initialFitsState = {
  current: undefined,
  fits: [],
};

export const fits = (state = initialFitsState, action) => {
  switch (action.type) {
    case 'CREATE_NEW_FIT':
      return {
        ...state,
        current: {}
      }
    case 'ADD_ITEM_TO_FIT':
      var fit = { ...state.current };
      fit[ClothesUtil.typeToCategory(action.item.type)] = action.item;

      return {
        ...state,
        current: fit
      }
    case 'REMOVE_ITEM_FROM_FIT': {
      var fit = { ...state.current };
      fit[action.item.category] = undefined;

      return {
        ...state,
        current: fit
      }
    }
    case 'ADD_FIT':
      return {
        ...state,
        fits: state.fits.concat([action.fit])
      }
    default:
      return state
  }
}