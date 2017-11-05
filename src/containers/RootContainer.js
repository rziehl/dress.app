// --- THIRD PARTY INCLUDES ---

import React, { Component } from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

import { connect } from 'react-redux';

// --- APP INCLUDES ---

import SectionDivider from '../components/lib/SectionDivider';
import ForecastContainer from './ForecastContainer';
import FitContainer from './FitContainer';
import GeolocationContainer from './GeolocationContainer';

class RootContainer extends Component {
  render(){
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={'rgba(255, 255, 255, 1.0)'} />

        <ScrollView>
          { this.props.has_position ? <ForecastContainer/> : <GeolocationContainer/> }
          { this.props.show_add_fit ? <SectionDivider/> : undefined }
          { this.props.show_add_fit ? <FitContainer/> : undefined }
        </ScrollView>

      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    has_position: state.geolocations.current ? true : false,
    show_add_fit: state.forecasts.current ? true : false,
  };
}

export default connect(mapStateToProps)(RootContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1.0)'
  }
});
