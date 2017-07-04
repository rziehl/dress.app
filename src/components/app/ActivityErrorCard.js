import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from '../lib/Button';
import Card from '../lib/Card';
import CardItem from '../lib/CardItem';

export default class ActivityErrorCard extends Component {
  render(){
    return (
      <Card>
        <CardItem>
          <Button text="RETRY" style={styles.retryButton} onPress={this.props.onRetryHandler} />
        </CardItem>
        <CardItem style={styles.centerContent}>
          <Text style={styles.messageText}>{this.props.message}</Text>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  centerContent: {
    justifyContent: 'center',
  },
  messageText: {
    color: 'rgba(87, 99, 104, 1.0)',
    fontFamily: 'abel_regular',
    fontSize: 24,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: 'rgba(244, 85, 49, 1.0)',
    marginBottom: 12
  },
});
