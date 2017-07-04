/*@flow */

import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { AppState } from './src/state/AppState';

import RootContainer from './src/containers/RootContainer';

import { initializeDataLayer } from './src/data/DataStore';

const store = createStore(AppState);

class DressAppRoot extends React.Component {
  componentWillMount(){
    initializeDataLayer();
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
