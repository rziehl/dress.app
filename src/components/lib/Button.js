import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native';

export default class Button extends Component {
  render(){
    return (
      <TouchableNativeFeedback
        style={styles.container}
        onPress={this.props.onPress}
        background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, 0.5)', false)}
      >
        <View style={[styles.body, this.props.style]}>
          <Text style={[styles.label, this.props.textStyle]}>{this.props.text}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: 'rgba(69, 196, 156, 1.0)',
    borderRadius: 32,
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1
  },
  label: {
    color: 'rgba(255, 255, 255, 1.0)',
    fontFamily: 'abel_regular',
    fontSize: 15,
    textAlignVertical: 'center'
  }
});
