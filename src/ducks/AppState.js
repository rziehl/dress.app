import { combineReducers } from 'redux';

import { clothes } from './ClothingItems';
import { forecasts } from './Forecasts';
import { fits } from './Fits';
import { geolocations } from './Geolocations';

export const AppState = combineReducers({ clothes, forecasts, fits, geolocations });