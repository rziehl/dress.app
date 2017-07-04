// state - app should never call this directly

var initial_state = {
  is_fetching: false,
  crud_action: '',
  forecasts: [],
  form_for: null,
  filter: null,
  error: ''
};

// reducer - app does not know about this

// this is the same as getVisibleTodos

export function WeatherForecasts(state = initial_state, action){
  if (!state.is_fetching && action.type === 'FETCH_WEATHER_REQUEST'){
    return {
      ...state,
      is_fetching: true
    };
  } else if (action.type === 'FETCH_WEATHER_SUCCESS'){
    return {
      ...state,
      is_fetching: false,
      form_for: action.data,
    };
  } else if (action.type === 'FETCH_WEATHER_ERROR'){
    return {
      ...state,
      is_fetching: false,
      error: action.error,
    };
  } else if (action.type === 'WEATHER_CRUD_ACTION'){
    // fill in later when viewing a fit, what about when viewing all fits in a list? (hide maybe?)
  }

  return state;
}

// action creators - these create actions (functions which get passed into reducers)

function requestWeatherForecast(){
  return {
    type: 'FETCH_WEATHER_REQUEST',
  };
}

function didReceiveWeatherForecast(forecast){
  return {
    type: 'FETCH_WEATHER_SUCCESS',
    data: forecast,
  };
}

function didReceiveWeatherError(message){
  return {
    type: 'FETCH_WEATHER_ERROR',
    error: message,
  };
}

// thing that does something - sure this is hacky and there's a better thing to replace this

let wunderground_api_key = require('../../app_config.json')['wunderground_api_key'];
let wunderground_api_base = 'http://api.wunderground.com/api/';
let wunderground_conditions_endpoint = '/conditions/forecast/q/';
let wunderground_response_type = '.json';

export const getWeatherForecast = (dispatch, params) => {
  dispatch(requestWeatherForecast());

  return fetch(
    wunderground_api_base +
    wunderground_api_key +
    wunderground_conditions_endpoint +
    params.position.latitude +
    "," +
    params.position.longitude +
    wunderground_response_type
  )
  .then((response) => response.json())
  .then((responseJson) => {
    let forecast = convertResponseJsonToViewProps(responseJson);
    dispatch(didReceiveWeatherForecast(forecast));
  })
  .catch((error) => {
    dispatch(didReceiveWeatherError('Weather forecast request failed'));
  });
}

// private functions that were in components, now out of the view layer

function convertResponseJsonToViewProps(json){
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

function convertWundergroundIconToIonicon(icon){
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
