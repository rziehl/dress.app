import { DataStore } from '../data/DataStore';

// state - app should never call this directly

var initial_state = {
  crud_action: '',
  clothes: [],
  form_for: undefined,
  filter: undefined,
  error: ''
};

// reducer

export function Clothes(state = initial_state, action){
  if (action.type === 'CLOTHING_CRUD_ACTION'){
    if (action.crud_action == 'CRUD_ACTION_INDEX'){
      return {
        crud_action: action.crud_action,
        clothes: action.clothes,
        form_for: undefined,
        filter: action.filter,
        error: ''
      };
    }
  }

  return state;
}

// action creators

function getClothes(filter = undefined){
  var clothes = DataStore.objects('ClothingItem');

  if (filter){
    let query_string = filter.map((c) => 'type == "' + c + '"').join(" OR ");
    clothes = clothes.filtered(query_string);
  }

  return {
    type: 'CLOTHING_CRUD_ACTION',
    filter: filter,
    clothes: clothes,
    crud_action: 'CRUD_ACTION_INDEX'
  }
}

// thunk?

export function getClothingItems(dispatch, category = undefined){
  return function(){
    var filter = undefined;

    switch (category){
      case 'Outerwear': filter = ['OUTERWEAR']; break;
      case 'Sweater': filter = ['SWEATER']; break;
      case 'Shirt': filter = ['SHIRTING']; break;
      case 'Tee': filter = ['TEE']; break;
      case 'Belt': filter = ['BELT']; break;
      case 'Bottoms': filter = ['DENIM', 'PANT', 'SHORT']; break;
      case 'Footwear': filter = ['FOOTWEAR']; break;
      default: break;
    }

    dispatch(getClothes(filter));
  }
}
