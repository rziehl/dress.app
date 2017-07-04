import React, { Component } from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

export default class Card extends Component {
  render(){
    return (
      <View style={[styles.card, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    //backgroundColor: 'rgba(33, 33, 33, 0.85)',
    marginTop: 16,
    marginHorizontal: 8,
    flexDirection: 'column',
    //alignItems: 'center',
    //justifyContent: 'center'
  }
});
