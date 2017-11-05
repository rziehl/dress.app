const initialForecastsState = {
  isFetching: false,
  current: undefined,
  forecasts: [],
  error: undefined
}

export const forecasts = (state = initialForecastsState, action) => {
  switch (action.type) {
    case 'REQUEST_FORECAST':
      return {
        ...state,
        isFetching: true,
        error: undefined
      }
    case 'FORECAST_REQUEST_ERROR':
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case 'FORECAST_REQUEST_SUCCESS':
      return {
        ...state,
        current: action.forecast,
        isFetching: false
      }
    case 'ADD_FORECAST':
      return {
        ...state,
        current: undefined,
        forecasts: state.forecasts.concat([state.current])
      }
    default:
      return state;
  }
}