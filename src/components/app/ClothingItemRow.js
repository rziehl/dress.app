// --- THIRD PARTY INCLUDES ---

import React, { Component } from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// refactor to know nothing about clothing items

export default function ClothingItemRow(props) {
  return (
    <TouchableOpacity onPress={props.onPress} key={'clothing_item_' + props.index}>
      <View style={styles.clothingItemRow}>
        <Image source={{ uri: props.clothing_item.thumbnail }} style={styles.avatar} />
        <View style={styles.clothingItemTextContainer}>
          <Text style={styles.clothingItemText}>{props.clothing_item.name}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>BY {props.clothing_item.brand.toUpperCase()}</Text>
            <Text style={styles.descriptionText}>{props.clothing_item.color.toUpperCase()}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },
  clothingItemTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  clothingItemText: {
    fontFamily: 'abel_regular',
    fontSize: 17,
    color: 'rgba(69, 196, 156, 1.0)',
  },
  clothingItemRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 4
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  descriptionText: {
    color: 'rgba(177, 191, 196, 1.0)',
    fontFamily: 'abel_regular',
    fontSize: 13,
  }
});