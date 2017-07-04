import React, { Component } from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

export default class CardItem extends Component {
  render(){
    return (
      <View style={[styles.cardItem, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardItem: {
    padding: 16,
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between'
  }
});
