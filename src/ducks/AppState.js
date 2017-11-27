import { combineReducers } from 'redux';

import { clothes } from './ClothingItems';
import { forecasts } from './Forecasts';
import { fits } from './Fits';
import { geolocations } from './Geolocations';

import type { ClothesState } from './ClothingItems';
import type { ForecastsState } from './Forecasts';
import type { FitsState } from './Fits';
import type { GeolocationsState } from './Geolocations';

export type GlobalAppState = {
  clothes: ClothesState,
  forecasts: ForecastsState,
  fits: FitsState,
  geolocations: GeolocationsState
};

export const AppState = combineReducers({ clothes, forecasts, fits, geolocations });

// reversible state tree

const REWIND_APP_STATE = 'REWIND_APP_STATE';

type RewindAppStateAction = {
  type: typeof REWIND_APP_STATE
}

export const rewindAppState = () : RewindAppStateAction => {
  return {
    type: 'REWIND_APP_STATE'
  }
};

export const HigherOrderStateRewinder = (reducer) => {
  const initialState = {
    current: reducer(undefined, { type: '' }),
    history: []
  };

  return (state = initialState, action) => {
    const { current, history } = state;

    switch (action.type) {
      case 'REWIND_APP_STATE':
        if (history.length > 0) {
          const previousState = history[history.length - 1];
          const newHistory = history.slice(0, history.length - 1);

          return {
            history: newHistory,
            current: previousState
          };
        }

        return state; // cannot rewind
      default: 
        const newCurrent = reducer(current, action);

        return {
          current: newCurrent,
          history: [...history, current]
        }
    }
  }
}