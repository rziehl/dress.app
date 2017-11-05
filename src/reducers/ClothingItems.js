const initialClothesState = {
  items: [],
  filter: undefined
};

export const clothes = (state = initialClothesState, action) => {
  switch (action.type) {
    case 'SET_CLOTHING_ITEMS':
      return {
          ...state,
          items: action.items
      }
    case 'SET_CLOTHING_FILTER':
      return {
        ...state,
        filter: action.filter
      }
    default:
      return state;
  } 
}