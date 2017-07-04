import React, { Component } from 'react';

import {
  Image,
  StyleSheet,
} from 'react-native';

export default class BackgroundImage extends Component {
  render(){
    return (
      <Image
        resizeMode={Image.resizeMode.cover}
        source={require('../../../res/img/wardrobe_background.png')}
        style={styles.backgroundImage}
      >
        {this.props.children}
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
});
