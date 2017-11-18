// --- THIRD PARTY INCLUDES ---

import React, { Component } from 'react';

import { connect } from 'react-redux';

// --- APP INCLUDES ---

import { getForecast } from '../ducks/Forecasts';

import ActivityErrorCard from '../components/app/ActivityErrorCard';
import ActivityIndicatorCard from '../components/app/ActivityIndicatorCard';
import WeatherForecastCard from '../components/app/WeatherForecastCard';

class ForecastContainer extends Component {
  componentWillMount(){
    this.props.onRetryHandler(this.props.position);
  }

  render(){
    if (this.props.forecast){
      return <WeatherForecastCard forecast={this.props.forecast} minimized={this.props.should_shrink}/>;
    } else if (this.props.error){
      return <ActivityErrorCard message='Failed to get Forecast' onRetryHandler={() => this.props.onRetryHandler(this.props.position)}/>;
    }

    return <ActivityIndicatorCard indicatorColor='rgba(69, 196, 156, 1.0)' statusText='Fetching Weather Data...' />;
  }
}

const mapStateToProps = (state, props) => {
  return {
    position: state.geolocations.current,
    forecast: state.forecasts.current,
    error: state.forecasts.error,
    should_shrink: state.fits.current ? true : false,
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRetryHandler: (position) => { dispatch(getForecast(position)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForecastContainer);
