/*@flow */

import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import Clothes from './src/data/Clothes';
import { AppState } from './src/state/AppState';
import { setClothingItems } from './src/state/ClothingItems';

import RootContainer from './src/containers/RootContainer';

const loggerMiddleware = createLogger();

const store = createStore(
  AppState, 
  undefined, // <- preloadedState? how is this different from AppState's default argument for state
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

class DressAppRoot extends React.Component {
  componentWillMount(){
    store.dispatch(setClothingItems(Clothes));
  }

  render(){
    return (
      <Provider store={store}>
        <RootContainer/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => DressAppRoot);
