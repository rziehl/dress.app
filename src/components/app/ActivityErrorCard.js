import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from '../lib/Button';
import Card from '../lib/Card';
import CardItem from '../lib/CardItem';

type Props = {
  message: string,
  onRetryHandler: ?() => void,
}

export default function ActivityErrorCard(props: Props) {
  return (
    <Card>
      <CardItem>
        <Button text="RETRY" style={styles.retryButton} onPress={props.onRetryHandler} />
      </CardItem>
      <CardItem style={styles.centerContent}>
        <Text style={styles.messageText}>{props.message}</Text>
      </CardItem>
    </Card>
  );
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
