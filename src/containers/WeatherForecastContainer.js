// --- THIRD PARTY INCLUDES ---

import React, { Component } from 'react';

import { connect } from 'react-redux';

import { PermissionsAndroid } from 'react-native';

// --- APP INCLUDES ---

import { getGpsPosition } from '../state/GeoLocations';
import { getWeatherForecast } from '../state/WeatherForecasts';

import ActivityErrorCard from '../components/app/ActivityErrorCard';
import ActivityIndicatorCard from '../components/app/ActivityIndicatorCard';
import WeatherForecastCard from '../components/app/WeatherForecastCard';

class WeatherForecastContainer extends Component {
  componentWillMount(){
    this.props.on_retry_handler = requestGpsCoordinates(this);
    requestGpsCoordinates(this);
  }

  render(){
    if (this.props.forecast){
      return <WeatherForecastCard forecast={this.props.forecast} minimized={this.props.should_shrink}/>;
    } else if (this.props.gps_position){
      return <ActivityIndicatorCard indicatorColor='rgba(69, 196, 156, 1.0)' statusText='Fetching Weather Data...' />;
    } else if (this.props.error){
      return <ActivityErrorCard message='Failed to get GPS Location' onRetryHandler={() => { requestGpsCoordinates(this) }}/>;
    }

    return <ActivityIndicatorCard indicatorColor='rgba(69, 196, 156, 1.0)' statusText='Getting GPS Location...' />;
  }
}

const mapStateToProps = (state, props) => {
  return {
    forecast: state.weather.form_for,
    gps_position: state.geolocation.form_for,
    error: state.geolocation.error,
    should_shrink: state.fit.form_for ? true : false,
  }
}

export default connect(mapStateToProps)(WeatherForecastContainer);

function requestGpsCoordinates(context){
  /*PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((granted) => {
    console.warn("GRANTED " + granted);
  }).catch((error) => {
    console.warn("NOT GRANTED: " + error);
  });*/

  const { dispatch } = context.props;
  getGpsPosition(dispatch).then(() => {
    const { gps_position } = context.props;
    getWeatherForecast(dispatch, { position: gps_position });
  }).catch((error) => {
    // do nothing for now
  });
}
