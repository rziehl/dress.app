// --- THIRD PARTY INCLUDES ---

import React, { Component } from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import type { ClothingCategory } from '../../models/ClothingItem';

type Props = {
  onPress: ?(category: ClothingCategory) => void,
  thumbnail: any,
  category: string
}

export default function FitCategoryBlock(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.block}>
        <View style={styles.blockContent}>
          <Image source={props.thumbnail} style={styles.thumbnail}/>
          <View style={styles.textContainer}>
            <Text style={styles.categoryTitle}>{props.category.toUpperCase()}</Text>
          </View>
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

  categoryTitle: {
    fontFamily: 'abel_regular',
    fontSize: 13,
    color: 'rgba(69, 196, 156, 1.0)',
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  thumbnail: {
    width: 32,
    height: 32,
    tintColor: 'rgba(177, 191, 196, 1.0)',
    marginBottom: 8
  }
});
