export const setClothingItems = (clothes = []) => {
  return {
    type: 'SET_CLOTHING_ITEMS',
    items: clothes
  }
}

export const setClothingFilter = (filter) => {
  return {
    type: 'SET_CLOTHING_FILTER',
    filter: filter
  }
}