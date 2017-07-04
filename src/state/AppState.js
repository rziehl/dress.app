import { Clothes } from './ClothingItems';
import { Fits } from './Fits';
import { GeoLocations } from './GeoLocations';
import { WeatherForecasts } from './WeatherForecasts';

// eventually replace with combineReducers()

export function AppState(state = {}, action){
  return {
    clothing: Clothes(state.clothing, action),
    fit: Fits(state.fit, action),
    geolocation: GeoLocations(state.geolocation, action),
    weather: WeatherForecasts(state.weather, action),
  };
}
