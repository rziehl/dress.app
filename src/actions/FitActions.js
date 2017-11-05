export const createNewFit = () => {
  return {
    type: 'CREATE_NEW_FIT'
  }
}

export const addItemToFit = (item) => {
  return {
    type: 'ADD_ITEM_TO_FIT',
    item: item
  }
}

export const removeItemFromFit = (item) => {
  return {
    type: 'REMOVE_ITEM_FROM_FIT',
    item: item
  }
}

export const addFit = (fit) => {
  return {
    type: 'ADD_FIT',
    fit: fit
  }
}