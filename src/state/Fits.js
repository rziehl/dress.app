import { DataStore } from '../data/DataStore';

// state - app should never call this directly

var initial_state = {
  crud_action: '',
  fits: [],
  form_for: undefined,
  filter: undefined,
  error: ''
};

// reducer - app does not know about this

// this is the same as getVisibleTodos

export function Fits(state = initial_state, action){
  if (action.type === 'FIT_CRUD_ACTION'){
    if (action.crud_action == 'CRUD_ACTION_INDEX'){
      return {
        crud_action: action.crud_action,
        fits: action.fits,
        form_for: undefined,
        filter: undefined,
        error: ''
      };
    } else if (action.crud_action == 'CRUD_ACTION_NEW'){
      let form_for = {
        ...state.form_for,
        ...action.form_for
      };

      return {
        crud_action: action.crud_action,
        fits: [],
        form_for: form_for,
        filter: undefined,
        error: ''
      };
    }
    // fill in later when viewing a fit, what about when viewing all fits in a list? (hide maybe?)
  }

  return state;
}

// action creators - these create actions (functions which get passed into reducers)

function newFit(){
  return {
    type: 'FIT_CRUD_ACTION',
    form_for: {},
    crud_action: 'CRUD_ACTION_NEW'
  };
}

function newFitUpdate(clothing_item){
  let form_for = {};
  form_for[clothing_item.type] = clothing_item;

  return {
    type: 'FIT_CRUD_ACTION',
    form_for: form_for,
    crud_action: 'CRUD_ACTION_NEW'
  };
}

function getFits(fits){
  return {
    type: 'FIT_CRUD_ACTION',
    fits: fits,
    crud_action: 'CRUD_ACTION_INDEX'
  };
}

function getFit(id){
  return {
    type: 'FIT_CRUD_ACTION',
    fits: DataStore.objects('Fit'), // where id == id
    crud_action: 'CRUD_ACTION_VIEW'
  };
}

// thing that does something - sure this is hacky and there's a better thing to replace this

export function getAllFits(dispatch){
  let fits = DataStore.objects('Fit');
  dispatch(getFits(fits));
}

export function createFit(dispatch){
  return function(){
    dispatch(newFit());
  }
}

export function updateFitWith(dispatch, clothing_item){
  return function(){
    dispatch(newFitUpdate(clothing_item));
  }
}
