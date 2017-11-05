import {
    requestForecast,
    forecastRequestError,
    forecastRequestSuccess
} from '../actions/ForecastActions';

let wunderground_api_key = require('../../app_config.json')['wunderground_api_key'];
let wunderground_api_base = 'http://api.wunderground.com/api/';
let wunderground_conditions_endpoint = '/conditions/forecast/q/';
let wunderground_response_type = '.json';

export const getForecast = (position) => {
    return (dispatch) => {
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

// utility functions

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
