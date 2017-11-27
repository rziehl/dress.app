var deepFreeze = require('deep-freeze');

import {
  REQUEST_GEOLOCATION,
  GEOLOCATION_REQUEST_ERROR,
  GEOLOCATION_REQUEST_SUCCESS,
  ADD_GEOLOCATION,
  requestGeolocation,
  geolocationRequestError,
  geolocationRequestSuccess,
  addGeolocation,
  geolocations
} from '../../src/ducks/Geolocations';

// action creators

describe('requestGeolocation()', () => {
  it('should have the correct type', () => {
    const expected = {
      type: REQUEST_GEOLOCATION
    };
    expect(requestGeolocation()).toEqual(expected);
  });
});

describe('geolocationRequestError()', () => {
  it('should have the correct type as well as an error message', () => {
    const message = 'Could not acquire a GPS position';

    const expected = {
      type: GEOLOCATION_REQUEST_ERROR,
      error: message
    };

    deepFreeze(message);

    expect(geolocationRequestError(message)).toEqual(expected);
  });
});

describe('geolocationRequestSuccess()', () => {
  it('should have the correct type and a position', () => {
    const position = {
      longitude: 123,
      latitude: 456
    };

    const expected = {
      type: GEOLOCATION_REQUEST_SUCCESS,
      position: position
    };

    deepFreeze(position);

    expect(geolocationRequestSuccess(position)).toEqual(expected);
  });
});

describe('addGeolocation()', () => {
  it('should have the correct type', () => {
    const expected = {
      type: ADD_GEOLOCATION
    };
    expect(addGeolocation()).toEqual(expected);
  });
});

// state

describe('initialGeolocationsState', () => {
  it('should have everything unset and positions should be an empty list', () => {
    const expected = {
      isFetching: false,
      current: undefined,
      positions: [],
      error: undefined
    };

    expect(geolocations(undefined, { type: 'DefaultAction' })).toEqual(expected);
  });
});

// reducer

describe('geolocations()', () => {
  it('should use the initialGeolocationsState if no state is provided', () => {
    const expected = {
      isFetching: false,
      current: undefined,
      positions: [],
      error: undefined
    };

    expect(geolocations(undefined, { type: 'DefaultAction' })).toEqual(expected);
  });

  it('should update the fetching state when a new request is made', () => {
    const state = {
      isFetching: false,
      current: undefined,
      positions: [],
      error: undefined
    };

    const expected = {
      isFetching: true,
      current: undefined,
      positions: [],
      error: undefined
    };

    deepFreeze(state);

    expect(geolocations(state, requestGeolocation())).toEqual(expected);
  });

  it('should clear any past errors when a new request is made', () => {
    const state = {
      isFetching: false,
      current: undefined,
      positions: [],
      error: 'Could not acquire a GPS position'
    };

    const expected = {
      isFetching: true,
      current: undefined,
      positions: [],
      error: undefined
    };

    deepFreeze(state);

    expect(geolocations(state, requestGeolocation())).toEqual(expected);
  });

  it('should not modify the list of positions when a new request is made', () => {
    const positions = [
      {
        longitude: 123,
        latitude: 456
      },
      {
        longitude: 789,
        latitude: 123
      }
    ];

    const state = {
      isFetching: false,
      current: undefined,
      positions: positions,
      error: undefined
    };

    const expected = {
      isFetching: true,
      current: undefined,
      positions: positions,
      error: undefined
    };

    deepFreeze(positions);
    deepFreeze(state);

    expect(geolocations(state, requestGeolocation())).toEqual(expected);
  });

  it('should update the network state and the error message when an error is received', () => {
    const state = {
      isFetching: true,
      current: undefined,
      positions: [],
      error: undefined
    };

    const message = 'Unable to acquire a GPS position';

    const expected = {
      isFetching: false,
      current: undefined,
      positions: [],
      error: message
    };

    deepFreeze(state);

    expect(geolocations(state, geolocationRequestError(message))).toEqual(expected);
  });

  it('should update the network state and the current position when a position is received', () => {
    const state = {
      isFetching: true,
      current: undefined,
      positions: [],
      error: undefined
    };

    const position = {
      longitude: 123,
      latitude: 456
    };

    const expected = {
      isFetching: false,
      current: position,
      positions: [],
      error: undefined
    };

    deepFreeze(position);
    deepFreeze(state);

    expect(geolocations(state, geolocationRequestSuccess(position))).toEqual(expected);
  });

  it('should clear out the current position and add it to the list', () => {
    const position = {
      longitude: 123,
      latitude: 456
    };

    const state = {
      isFetching: false,
      current: position,
      positions: [],
      error: undefined
    };

    deepFreeze(position);
    deepFreeze(state);

    const expected = {
      isFetching: false,
      current: undefined,
      positions: [position],
      error: undefined
    };

    expect(geolocations(state, addGeolocation())).toEqual(expected);
  });
});

// TODO: thunk tests