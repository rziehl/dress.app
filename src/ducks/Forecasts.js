import type { Forecast } from '../models/Forecast';
import type { Geolocation } from '../models/Geolocation';

// actions

const REQUEST_FORECAST = 'REQUEST_FORECAST';
const FORECAST_REQUEST_ERROR = 'FORECAST_REQUEST_ERROR';
const FORECAST_REQUEST_SUCCESS = 'FORECAST_REQUEST_SUCCESS';
const ADD_FORECAST = 'ADD_FORECAST';

type RequestForecastAction = {
  type: typeof REQUEST_FORECAST
}

type ForecastRequestErrorAction = {
  type: typeof FORECAST_REQUEST_ERROR,
  error: string
}

type ForecastRequestSuccessAction = {
  type: typeof FORECAST_REQUEST_SUCCESS,
  forecast: Forecast
}

type AddForecastAction = {
  type: typeof ADD_FORECAST
}

type ForecastAction = RequestForecastAction | ForecastRequestErrorAction | ForecastRequestSuccessAction | AddForecastAction;

// action creators

export const requestForecast = () : RequestForecastAction => {
    return {
        type: 'REQUEST_FORECAST'
    }
}

export const forecastRequestError = (message: string) : ForecastRequestErrorAction => {
    return {
        type: 'FORECAST_REQUEST_ERROR',
        error: message
    }
}

export const forecastRequestSuccess = (forecast: Forecast) : ForecastRequestSuccessAction => {
    return {
        type: 'FORECAST_REQUEST_SUCCESS',
        forecast: forecast
    }
}

export const addForecast = () : AddForecastAction => {
    return {
        type: 'ADD_FORECAST'
    }
}

// thunks

const wunderground_api_key = require('../../app_config.json')['wunderground_api_key'];
const wunderground_api_base = 'http://api.wunderground.com/api/';
const wunderground_conditions_endpoint = '/conditions/forecast/q/';
const wunderground_response_type = '.json';

export const getForecast = (position: Geolocation) => {
    return (dispatch: (action: ForecastAction) => void) => {
        dispatch(requestForecast());

        fetch(
            wunderground_api_base +
            wunderground_api_key +
            wunderground_conditions_endpoint +
            position.latitude +
            "," +
            position.longitude +
            wunderground_response_type
        )
        .then((response) => response.json())
        .then((responseJson) => {
            let forecast = convertResponseJsonToViewProps(responseJson);
            dispatch(forecastRequestSuccess(forecast));
        })
        .catch((error) => {
            dispatch(forecastRequestError('Weather forecast request failed'));
        });
    }
}

// state

type ForecastState = {
  isFetching: boolean,
  current: ?Forecast,
  forecasts: Forecast[],
  error: ?string
}

const initialForecastsState: ForecastState = {
  isFetching: false,
  current: undefined,
  forecasts: [],
  error: undefined
}

// reducer

export const forecasts = (state: ForecastState = initialForecastsState, action: ForecastAction) : ForecastState => {
  switch (action.type) {
    case REQUEST_FORECAST:
      return {
        ...state,
        isFetching: true,
        error: undefined
      }
    case FORECAST_REQUEST_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FORECAST_REQUEST_SUCCESS:
      return {
        ...state,
        current: action.forecast,
        isFetching: false
      }
    case ADD_FORECAST:
      if (state.current) {
        return {
          ...state,
          current: undefined,
          forecasts: state.forecasts.concat([state.current])
        }
      } else {
        return state;
      }
    default:
      return state;
  }
}

// util

function convertResponseJsonToViewProps(json): Forecast {
  let forecast_for_today = json["forecast"]["simpleforecast"]["forecastday"].filter(getForecastForToday)[0];

  return {
    city: json["current_observation"]["display_location"]["full"],
    weather: json["current_observation"]["weather"],
    temperature: json["current_observation"]["temp_c"],
    high: forecast_for_today["high"]["celsius"],
    low: forecast_for_today["low"]["celsius"],
    max_wind: forecast_for_today["maxwind"]["kph"],
    avg_wind: forecast_for_today["avewind"]["kph"],
    pop: forecast_for_today["pop"],
    humidity: forecast_for_today["avehumidity"],
    icon: convertWundergroundIconToIonicon(forecast_for_today["icon"])
  };
}

function getForecastForToday(forecast){
  return forecast["period"] == 1;
}

function convertWundergroundIconToIonicon(icon: string): string {
  if (
    icon === 'chanceflurries' ||
    icon === 'chancesleet' ||
    icon === 'chancesnow' ||
    icon === 'chancestorms' ||
    icon === 'flurries' ||
    icon === 'sleet' ||
    icon === 'snow'
  ){
    return "md-snow";
  } else if (
    icon === 'chancerain' ||
    icon === 'rain'
  ){
    return "md-rainy";
  } else if (
    icon === 'cloudy'
  ){
    return "md-cloud";
  } else if (
    icon === 'clear' ||
    icon === 'sunny'
  ){
    return "md-sunny";
  } else if (
    icon === 'mostlycloudy' ||
    icon === 'partlycloudy'
  ){
    return "md-cloudy";
  } else if (
    icon === 'mostlysunny' ||
    icon === 'partlysunny'
  ){
    return "md-partly-sunny";
  } else if (
    icon === 'tstorms'
  ){
    return "md-thunderstorm";
  }

  return "md-help";
}