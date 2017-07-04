// --- THIRD PARTY INCLUDES ---

import React, { Component } from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { connect } from 'react-redux';

// --- APP INCLUDES ---

import Button from '../lib/Button';
import Card from '../lib/Card';
import CardItem from '../lib/CardItem';
import SectionDivider from '../lib/SectionDivider';

import { getClothingItems } from '../../state/ClothingItems';
import { updateFitWith } from '../../state/Fits';

class FitItemSelectCard extends Component {
  render() {
    const { dispatch } = this.props;

    let itemRows = this.props.clothes.map((clothing_item, index) => {
      return (
        <TouchableOpacity onPress={updateFitWith(dispatch, clothing_item)} key={'clothing_item_' + index}>
          <View style={styles.clothingItemRow}>
            <Image source={{uri: clothing_item.thumbnail}} style={styles.avatar}/>
            <View style={styles.clothingItemTextContainer}>
              <Text style={styles.clothingItemText}>{clothing_item.name}</Text>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>BY {clothing_item.brand.toUpperCase()}</Text>
                <Text style={styles.descriptionText}>{clothing_item.color.toUpperCase()}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <Card>
        <CardItem>
          <View style={[styles.textContainer, styles.sectionHeaderContainer]}>
            <Text style={styles.headerText}>Select an item</Text>
          </View>
        </CardItem>

        <CardItem style={styles.vertical}>
          {itemRows}
        </CardItem>

        <CardItem>
          <Button text='BACK' style={styles.backButton} onPress={getClothingItems(dispatch)}/>
        </CardItem>
      </Card>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    clothes: state.clothing.clothes,
  }
}

export default connect(mapStateToProps)(FitItemSelectCard);

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },
  backButton: {
    backgroundColor: 'rgba(232, 235, 239, 1.0)',
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
  },
  headerText: {
    marginTop: -8,
    color: 'rgba(87, 99, 104, 1.0)',
    fontFamily: 'abel_regular',
    fontSize: 24
  },
  sectionHeaderContainer: {
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vertical: {
    flexDirection: 'column'
  }
});
