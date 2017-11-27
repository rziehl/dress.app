var deepFreeze = require('deep-freeze');

import {
  REQUEST_FORECAST,
  FORECAST_REQUEST_ERROR,
  FORECAST_REQUEST_SUCCESS,
  ADD_FORECAST,
  requestForecast,
  forecastRequestError,
  forecastRequestSuccess,
  addForecast,
  forecasts
} from '../../src/ducks/Forecasts';

// action creators

describe('requestForecast()', () => {
  it('should have the correct type', () => {
    const expected = {
      type: REQUEST_FORECAST
    };
    expect(requestForecast()).toEqual(expected);
  });
});

describe('forecastRequestError()', () => {
  it('should have the correct type as well as an error message', () => {
    const message = 'Could not get a valid weather forecast';

    const expected = {
      type: FORECAST_REQUEST_ERROR,
      error: message
    };

    deepFreeze(message);

    expect(forecastRequestError(message)).toEqual(expected);
  });
});

describe('forecastRequestSuccess()', () => {
  it('should have the correct type and a forecast', () => {
    const forecast = {
      city: 'Ottawa',
      temperature: '-20'
    };

    const expected = {
      type: FORECAST_REQUEST_SUCCESS,
      forecast: forecast
    };

    deepFreeze(forecast);

    expect(forecastRequestSuccess(forecast)).toEqual(expected);
  });
});

describe('addForecast()', () => {
  it('should have the correct type', () => {
    const expected = {
      type: ADD_FORECAST
    };
    expect(addForecast()).toEqual(expected);
  });
});

// state

describe('initialForecastsState', () => {
  it('should have everything unset and forecasts should be an empty list', () => {
    const expected = {
      isFetching: false,
      current: undefined,
      forecasts: [],
      error: undefined
    };

    expect(forecasts(undefined, { type: 'DefaultAction' })).toEqual(expected);
  });
});

// reducer

describe('forecasts()', () => {
  it('should use the initialForecastsState if no state is provided', () => {
    const expected = {
      isFetching: false,
      current: undefined,
      forecasts: [],
      error: undefined
    };

    expect(forecasts(undefined, { type: 'DefaultAction' })).toEqual(expected);
  });

  it('should update the fetching state when a new request is made', () => {
    const state = {
      isFetching: false,
      current: undefined,
      forecasts: [],
      error: undefined
    };

    const expected = {
      isFetching: true,
      current: undefined,
      forecasts: [],
      error: undefined
    };

    deepFreeze(state);

    expect(forecasts(state, requestForecast())).toEqual(expected);
  });

  it('should clear any past errors when a new request is made', () => {
    const state = {
      isFetching: false,
      current: undefined,
      forecasts: [],
      error: 'Could not get a valid weather forecast'
    };

    const expected = {
      isFetching: true,
      current: undefined,
      forecasts: [],
      error: undefined
    };

    deepFreeze(state);

    expect(forecasts(state, requestForecast())).toEqual(expected);
  });

  it('should not modify the list of forecasts when a new request is made', () => {
    const weather = [
      {
        city: 'Ottawa',
        temperature: '-20'
      },
      {
        city: 'Calgary',
        temperature: '-5'
      }
    ];

    const state = {
      isFetching: false,
      current: undefined,
      forecasts: weather,
      error: undefined
    };

    const expected = {
      isFetching: true,
      current: undefined,
      forecasts: weather,
      error: undefined
    };

    deepFreeze(weather);
    deepFreeze(state);

    expect(forecasts(state, requestForecast())).toEqual(expected);
  });

  it('should update the network state and the error message when an error is received', () => {
    const state = {
      isFetching: true,
      current: undefined,
      forecasts: [],
      error: undefined
    };

    const message = 'Could not get a valid weather forecast';

    const expected = {
      isFetching: false,
      current: undefined,
      forecasts: [],
      error: message
    };

    deepFreeze(state);

    expect(forecasts(state, forecastRequestError(message))).toEqual(expected);
  });

  it('should update the network state and the current forecast when a forecast is received', () => {
    const state = {
      isFetching: true,
      current: undefined,
      forecasts: [],
      error: undefined
    };

    const forecast = {
      city: 'Ottawa',
      temperature: '-20'
    };

    const expected = {
      isFetching: false,
      current: forecast,
      forecasts: [],
      error: undefined
    };

    deepFreeze(forecast);
    deepFreeze(state);

    expect(forecasts(state, forecastRequestSuccess(forecast))).toEqual(expected);
  });

  it('should clear out the current forecast and add it to the list', () => {
    const forecast = {
      city: 'Ottawa',
      temperature: '-20'
    };

    const state = {
      isFetching: false,
      current: forecast,
      forecasts: [],
      error: undefined
    };

    deepFreeze(forecast);
    deepFreeze(state);

    const expected = {
      isFetching: false,
      current: undefined,
      forecasts: [forecast],
      error: undefined
    };

    expect(forecasts(state, addForecast())).toEqual(expected);
  });
});

// TODO: thunk tests

// TODO: util tests