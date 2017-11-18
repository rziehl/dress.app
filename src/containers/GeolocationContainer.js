// --- THIRD PARTY INCLUDES ---

import React, { Component } from 'react';

import { connect } from 'react-redux';

// --- APP INCLUDES ---

import { getGeolocation } from '../ducks/Geolocations';

import ActivityErrorCard from '../components/app/ActivityErrorCard';
import ActivityIndicatorCard from '../components/app/ActivityIndicatorCard';

class GeolocationContainer extends Component {
  componentWillMount(){
    this.props.onRetryHandler();
  }

  render(){
    if (this.props.error){
      return <ActivityErrorCard message='Failed to get GPS Location' onRetryHandler={this.props.onRetryHandler}/>;
    }

    return <ActivityIndicatorCard indicatorColor='rgba(69, 196, 156, 1.0)' statusText='Getting GPS Location...' />;
  }
}

const mapStateToProps = (state, props) => {
  return {
    gps_position: state.geolocations.current,
    error: state.geolocations.error
  }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onRetryHandler: () => { dispatch(getGeolocation()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeolocationContainer);
