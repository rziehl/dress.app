import React, { Component } from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Card from '../lib/Card';
import CardItem from '../lib/CardItem';

export default class ActivityIndicatorCard extends Component {
  render(){
    return (
      <Card>
        <CardItem>
          <View style={styles.centerContent}>
            <ActivityIndicator color={this.props.indicatorColor} size={64}/>
          </View>
        </CardItem>
        <CardItem>
          <View style={styles.centerContent}>
            <Text style={styles.statusText}>{this.props.statusText}</Text>
          </View>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  statusText: {
    color: 'rgba(87, 99, 104, 1.0)',
    fontFamily: 'abel_regular',
    fontSize: 24,
    textAlign: 'center'
  },
});
