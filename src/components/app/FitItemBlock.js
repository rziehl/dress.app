// --- THIRD PARTY INCLUDES ---

import React, { Component } from 'react';

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import type { ClothingCategory } from '../../util/ClothesUtil';

type Props = {
  onPress: ?(category: ClothingCategory) => void,
  thumbnail: any,
}

export default function FitItemBlock(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.block}>
        <View style={styles.blockContent}>
          <Image source={props.thumbnail} style={styles.avatar}/>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// css that should be revisited

const styles = StyleSheet.create({
  block: {
    marginLeft: 8,
    marginRight: 8,
    borderColor: 'rgba(232, 235, 239, 1.0)',
    borderWidth: 1,
    width: 80,
    height: 80,
    paddingVertical: 8
  },
  blockContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  }
});
