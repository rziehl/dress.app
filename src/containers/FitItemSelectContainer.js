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

import Button from '../components/lib/Button';
import Card from '../components/lib/Card';
import CardItem from '../components/lib/CardItem';
import SectionDivider from '../components/lib/SectionDivider';
import ClothingItemRow from '../components/app/ClothingItemRow';

import { setClothingFilter } from '../ducks/ClothingItems';
import { addItemToFit } from '../ducks/Fits';

import * as ClothesUtil from '../util/ClothesUtil';

// TODO: this should use a proper listview for performance
// TODO: this should allow for rows to deselected
// TODO: ClothingItemRows should show some visual indication they are selected

class FitItemSelectContainer extends Component {
  render() {
    let itemRows = this.props.clothes.map((clothing_item, index) => {
      return (
        <ClothingItemRow 
          key={'clothing_item_row_' + index}
          onPress={this.props.onItemPress.bind(this, clothing_item)}
          clothing_item={clothing_item}
          index={index}
        />
      );
    });

    // TODO: textContainer and sectionHeaderContainer can be combined

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
          <Button text='BACK' style={styles.backButton} onPress={this.props.onBackPress}/>
        </CardItem>
      </Card>
    );
  }
}

function filterClothes(clothes, category) {
  return clothes.filter((item) => {
    return ClothesUtil.typeToCategory(item.type) === category
  });
}

const mapStateToProps = (state, props) => {
  return {
    clothes: filterClothes(state.clothes.items, state.clothes.filter),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onItemPress: (item) => { dispatch(addItemToFit(item)) },
    onBackPress: () => { dispatch(setClothingFilter(undefined)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FitItemSelectContainer);

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: 'rgba(232, 235, 239, 1.0)',
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
