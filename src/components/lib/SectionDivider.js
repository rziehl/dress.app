import React, { Component } from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

export default class SectionDivider extends Component {
  render(){
    return (
      <View style={[styles.dividerLine, this.props.style]}/>
    );
  }
}

const styles = StyleSheet.create({
  dividerLine: {
    flex: 1,
    backgroundColor: 'rgba(232, 235, 239, 1.0)',
    marginLeft: 64,
    marginRight: 64,
    height: 1
  },
});
