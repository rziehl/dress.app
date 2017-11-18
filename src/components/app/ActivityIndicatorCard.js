import React, { Component } from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Card from '../lib/Card';
import CardItem from '../lib/CardItem';

type Props = {
  indicatorColor: string,
  statusText: string
}

export default function ActivityIndicatorCard(props: Props) {
  return (
    <Card>
      <CardItem>
        <View style={styles.centerContent}>
          <ActivityIndicator color={props.indicatorColor} size={64}/>
        </View>
      </CardItem>
      <CardItem>
        <View style={styles.centerContent}>
          <Text style={styles.statusText}>{props.statusText}</Text>
        </View>
      </CardItem>
    </Card>
  );
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
