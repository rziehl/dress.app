import React, { Component } from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Card from '../lib/Card';
import CardItem from '../lib/CardItem';
import type { Forecast } from '../../models/Forecast';

type Props = {
  forecast: Forecast,
  minimized: boolean
}

export default function WeatherForecastCard(props: Props) {
  const precipitationRow = props.forecast.pop > 0 ? (
    <CardItem style={styles.detailsItem}>
      <View style={styles.textContainer}>
        <Text style={styles.detailsText}>PRECIPITATION</Text>
        <Text style={styles.locationText}>{props.forecast.pop}%</Text>
      </View>
    </CardItem>
  ) : undefined;

  const detailedForecast = props.minimized ? undefined : (
    <View>
      <CardItem style={styles.detailsItem}>
        <View style={styles.textContainer}>
          <Text style={styles.detailsText}>HIGH</Text>
          <Text style={styles.locationText}>{props.forecast.high}°C</Text>
        </View>
      </CardItem>
      <CardItem style={styles.detailsItem}>
        <View style={styles.textContainer}>
          <Text style={styles.detailsText}>LOW</Text>
          <Text style={styles.locationText}>{props.forecast.low}°C</Text>
        </View>
      </CardItem>
      <CardItem style={styles.detailsItem}>
        <View style={styles.textContainer}>
          <Text style={styles.detailsText}>AVG. WIND</Text>
          <Text style={styles.locationText}>{props.forecast.avg_wind}KM/H</Text>
        </View>
      </CardItem>

      {precipitationRow}

      <CardItem style={styles.detailsItem}>
        <View style={styles.textContainer}>
          <Text style={styles.detailsText}>HUMIDITY</Text>
          <Text style={styles.locationText}>{props.forecast.humidity}%</Text>
        </View>
      </CardItem>

      <CardItem style={styles.detailsItemLast}>
        <View style={styles.logoContainer}>
          <Text style={styles.attributionText}>POWERED BY</Text>
          <Image
            resizeMode={Image.resizeMode.contain}
            source={require('../../../res/img/wundergroundLogo_4c_horz.png')}
            style={styles.logoImage}
          />
        </View>
      </CardItem>
    </View>
  );

  return (
    <Card>
      <CardItem>
        <View style={[styles.textContainer, styles.headerContainer]}>
          <Text style={styles.temperatureText}>{props.forecast.temperature}°C</Text>
        </View>
      </CardItem>

      <CardItem>
        <View style={[styles.textContainer, styles.subheaderContainer]}>
          <Text style={styles.conditionsText}>{props.forecast.weather} in {props.forecast.city}</Text>
        </View>
      </CardItem>

      { detailedForecast }

    </Card>
  );
}

const styles = StyleSheet.create({
  // temperature title

  headerContainer: {
    justifyContent: 'center',
  },
  temperatureText: {
    color: 'rgba(69, 196, 156, 1.0)',
    fontFamily: 'abel_regular',
    fontSize: 64,
  },

  // conditions & location subheader

  subheaderContainer: {
    marginTop: -16,
    marginBottom: 8,
    justifyContent: 'center',
  },
  conditionsText: {
    color: 'rgba(87, 99, 104, 1.0)',
    fontFamily: 'abel_regular',
    fontSize: 24
  },

  // detail rows - needs some cleaning up

  detailsItem: {
    paddingVertical: 4,
  },
  detailsText: {
    fontFamily: 'abel_regular',
    fontSize: 13,
    color: 'rgba(4, 13, 20, 1.0)',
    textAlignVertical: 'center'
  },
  locationText: {
    fontFamily: 'abel_regular',
    fontSize: 13,
    color: 'rgba(177, 191, 196, 1.0)',
    textAlignVertical: 'center'
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  /* wunderground logo */

  detailsItemLast: {
    paddingTop: 12,
  },
  attributionText: {
    fontFamily: 'abel_regular',
    fontSize: 13,
    color: 'rgba(87, 99, 104, 1.0)',
    textAlignVertical: 'center',
    marginRight: 4,
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    height: 30
  },
  logoImage: {
    width: 128,
    height: 30
  }
});
