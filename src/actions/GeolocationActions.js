export const requestGeolocation = () => {
  return {
    type: 'REQUEST_GEOLOCATION'
  }
}

export const geolocationRequestError = (message) => {
  return {
    type: 'GEOLOCATION_REQUEST_ERROR',
    error: message
  }
}

export const geolocationRequestSuccess = (position) => {
  return {
    type: 'GEOLOCATION_REQUEST_SUCCESS',
    position: position
  }
}

export const addGeolocation = () => {
  return {
    type: 'ADD_GEOLOCATION'
  }
}