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

import { rewindAppState } from '../ducks/AppState';
import Button from '../components/lib/Button';
import Card from '../components/lib/Card';
import CardItem from '../components/lib/Card';

class RootContainer extends Component {
  render(){
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={'rgba(255, 255, 255, 1.0)'} />

        <ScrollView>
          <Card>
            <CardItem>
              <Button text="REWIND" style={styles.rewindButton} onPress={this.props.rewind} />
            </CardItem>
          </Card>
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
    has_position: state.current.geolocations.current ? true : false,
    show_add_fit: state.current.forecasts.current ? true : false,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    rewind: () => { dispatch(rewindAppState()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1.0)'
  },
  rewindButton: {
    backgroundColor: 'rgba(33, 173, 172, 1.0)',
    marginBottom: 12
  }
});
