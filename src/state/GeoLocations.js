// state - app should never call this directly

var initial_state = {
  is_fetching: false,
  crud_action: '',
  locations: [],
  form_for: null,
  filter: null,
  error: ''
};

// reducer - app does not know about this

// this is the same as getVisibleTodos

export function GeoLocations(state = initial_state, action){
  if (!state.is_fetching && action.type === 'FETCH_GEOLOCATION_REQUEST'){
    return {
      ...initial_state,
      is_fetching: true,
    };
  } else if (action.type === 'FETCH_GEOLOCATION_SUCCESS'){
    return {
      ...state,
      is_fetching: false,
      form_for: action.data,
    };
  } else if (action.type === 'FETCH_GEOLOCATION_ERROR'){
    return {
      ...state,
      is_fetching: false,
      error: action.error,
    };
  } else if (action.type === 'GEOLOCATION_CRUD_ACTION'){
    // fill in later when viewing a fit, what about when viewing all fits in a list? (hide maybe?)
  }

  return state;
}

// action creators - these create actions (functions which get passed into reducers)

function requestGpsPosition(){
  return {
    type: 'FETCH_GEOLOCATION_REQUEST',
  };
}

function didReceiveGpsPosition(position){
  return {
    type: 'FETCH_GEOLOCATION_SUCCESS',
    data: position,
  };
}

function didReceiveGpsError(message){
  return {
    type: 'FETCH_GEOLOCATION_ERROR',
    error: message,
  };
}

// this returns a promise which is kind of gross now?

export const getGpsPosition = (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(requestGpsPosition());

    navigator.geolocation.getCurrentPosition(
      (gps_data) => {
        var position = {
          longitude: gps_data["coords"]["longitude"],
          latitude: gps_data["coords"]["latitude"]
        };

        dispatch(didReceiveGpsPosition(position));
        resolve();
      },
      (error) => {
        dispatch(didReceiveGpsError(error.message));
        reject();
      },
      {enableHighAccuracy: false, timeout: 5000, maximumAge: 1000}
    );
  });
}
