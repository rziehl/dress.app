import type { Geolocation } from '../models/Geolocation';

// actions

export const REQUEST_GEOLOCATION = 'REQUEST_GEOLOCATION';
export const GEOLOCATION_REQUEST_ERROR = 'GEOLOCATION_REQUEST_ERROR';
export const GEOLOCATION_REQUEST_SUCCESS = 'GEOLOCATION_REQUEST_SUCCESS';
export const ADD_GEOLOCATION = 'ADD_GEOLOCATION';

type RequestGeolocationAction = {
  type: typeof REQUEST_GEOLOCATION
}

type GeolocationRequestErrorAction = {
  type: typeof GEOLOCATION_REQUEST_ERROR,
  error: string
}

type GeolocationRequestSuccessAction = {
  type: typeof GEOLOCATION_REQUEST_SUCCESS,
  position: Geolocation
}

type AddGeolocationAction = {
  type: typeof ADD_GEOLOCATION
}

type GeolocationAction = RequestGeolocationAction | GeolocationRequestErrorAction | GeolocationRequestSuccessAction | AddGeolocationAction;

// action creators

export const requestGeolocation = () : RequestGeolocationAction => {
  return {
    type: REQUEST_GEOLOCATION
  }
}

export const geolocationRequestError = (message: string) : GeolocationRequestErrorAction => {
  return {
    type: GEOLOCATION_REQUEST_ERROR,
    error: message
  }
}

export const geolocationRequestSuccess = (position: Geolocation) : GeolocationRequestSuccessAction => {
  return {
    type: GEOLOCATION_REQUEST_SUCCESS,
    position: position
  }
}

export const addGeolocation = () : AddGeolocationAction => {
  return {
    type: ADD_GEOLOCATION
  }
}

// thunks

export const getGeolocation = () => {
    return (dispatch: (GeolocationAction) => void) => {
        dispatch(requestGeolocation());

        navigator.geolocation.getCurrentPosition(
            (gps_data: Position) => {
                const position: Geolocation = {
                    longitude: gps_data.coords.longitude,
                    latitude: gps_data.coords.latitude
                };

                dispatch(geolocationRequestSuccess(position));
            },
            (error) => {
                dispatch(geolocationRequestError(error.message));
            },
            {enableHighAccuracy: false, timeout: 5000, maximumAge: 1000}
        );
    }
}

// state

type GeolocationState = {
  isFetching: boolean,
  current: ?Geolocation,
  positions: Geolocation[],
  error: ?string
}

const initialGeolocationsState: GeolocationState = {
  isFetching: false,
  current: undefined,
  positions: [],
  error: undefined
}

// reducer

export const geolocations = (state: GeolocationState = initialGeolocationsState, action: GeolocationAction) : GeolocationState => {
  switch (action.type) {
    case REQUEST_GEOLOCATION:
      return {
        ...state,
        isFetching: true,
        error: undefined
      }
    case GEOLOCATION_REQUEST_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case GEOLOCATION_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        current: action.position
      }
    case ADD_GEOLOCATION:
      if (state.current) {
        return {
          ...state,
          current: undefined,
          positions: state.positions.concat([state.current])
        }
      } else {
        return state;
      }
    default:
      return state
  }
}