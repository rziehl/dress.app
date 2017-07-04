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
import WeatherForecastContainer from './WeatherForecastContainer';
import FitContainer from './FitContainer';

class RootContainer extends Component {
  render(){
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={'rgba(255, 255, 255, 1.0)'} />

        <ScrollView>
          <WeatherForecastContainer/>
          { this.props.show_add_fit ? <SectionDivider/> : undefined }
          { this.props.show_add_fit ? <FitContainer/> : undefined }
        </ScrollView>

      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    show_add_fit: state.weather.form_for ? true : false,
  };
}

export default connect(mapStateToProps)(RootContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1.0)'
  }
});
