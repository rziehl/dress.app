const initialGeolocationsState = {
  isFetching: false,
  current: undefined,
  positions: [],
  error: undefined
}

export const geolocations = (state = initialGeolocationsState, action) => {
  switch (action.type) {
    case 'REQUEST_GEOLOCATION':
      return {
        ...state,
        isFetching: true,
        error: undefined
      }
    case 'GEOLOCATION_REQUEST_ERROR':
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case 'GEOLOCATION_REQUEST_SUCCESS':
      return {
        ...state,
        isFetching: false,
        current: action.position
      }
    case 'ADD_GEOLOCATION': // save, create? store?
      return {
        ...state,
        current: undefined,
        positions: state.positions.concat([state.current])
      }
    default:
      return state
  }
}