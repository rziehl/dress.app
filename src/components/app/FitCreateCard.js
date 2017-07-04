// --- THIRD PARTY INCLUDES ---

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { connect } from 'react-redux';

// --- APP INCLUDES ---

import Button from '../lib/Button';
import Card from '../lib/Card';
import CardItem from '../lib/CardItem';
import SectionDivider from '../lib/SectionDivider';

import FitCategoryBlock from './FitCategoryBlock';
import FitItemBlock from './FitItemBlock';

import { getClothingItems } from '../../state/ClothingItems';

class FitCreateCard extends Component {
  render() {
    const { dispatch, fit } = this.props;

    let descriptionContents = this.props.isValid ? (
      <Button text="I'M WEARING THIS" onPress={() => {}} />
    ) : (
      <View>
        <Text style={styles.descriptionText}>Tap a category to choose each part of your outfit. Cover both the top and bottom half of your body, then grab some kicks before confirming.</Text>
      </View>
    );

    return (
      <Card>
        <CardItem>
          <View style={[styles.textContainer, styles.sectionHeaderContainer]}>
            <Text style={styles.headerText}>What are you wearing today?</Text>
          </View>
        </CardItem>
        <CardItem>
          {descriptionContents}
        </CardItem>

        <CardItem style={styles.iconRow}>
          {createCategoryBlock(
            dispatch,
            this.props.fit['OUTERWEAR'],
            'Outerwear',
            require('../../../res/img/clothes_icons/trench-coat.png')
          )}
          {createCategoryBlock(
            dispatch,
            this.props.fit['SWEATER'],
            'Sweater',
            require('../../../res/img/clothes_icons/hoodie.png')
          )}
          {createCategoryBlock(
            dispatch,
            this.props.fit['SHIRTING'],
            'Shirt',
            require('../../../res/img/clothes_icons/shirt-1.png')
          )}
          {createCategoryBlock(
            dispatch,
            this.props.fit['TEE'],
            'Tee',
            require('../../../res/img/clothes_icons/shirt.png')
          )}
        </CardItem>

        <SectionDivider style={styles.extraPadding}/>

        <CardItem style={styles.iconRow}>
          {createCategoryBlock(
            dispatch,
            this.props.fit['BELT'],
            'Belt',
            require('../../../res/img/clothes_icons/belt.png')
          )}
          {createCategoryBlock(
            dispatch,
            this.props.fit['DENIM'] || this.props.fit['PANT'] || this.props.fit['SHORT'],
            'Bottoms',
            require('../../../res/img/clothes_icons/jeans.png')
          )}
          {createCategoryBlock(
            dispatch,
            this.props.fit['FOOTWEAR'],
            'Footwear',
            require('../../../res/img/clothes_icons/shoe.png')
          )}
        </CardItem>
      </Card>
    );
  }
}

function createCategoryBlock(dispatch, current_item, category, icon){
  if (current_item){
    return (
      <FitItemBlock
        key={'fit_item_for' + category.toLowerCase()}
        onPress={getClothingItems(dispatch, category)}
        thumbnail={{uri: current_item.thumbnail}}
      />
    );
  } else {
    return (
      <FitCategoryBlock
        key={'fit_item_for' + category.toLowerCase()}
        category={category}
        onPress={getClothingItems(dispatch, category)}
        thumbnail={icon}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    fit: state.fit.form_for,
    isValid: verifyFit(state.fit.form_for)
  }
}

export default connect(mapStateToProps)(FitCreateCard);

function verifyFit(fit){
  let hasShirt = fit['SHIRTING'] || fit['TEE'];
  let hasPants = fit['DENIM'] || fit['PANT'] || fit['SHORT'];
  let hasShoes = fit['FOOTWEAR'];

  return hasShirt && hasPants && hasShoes;
}

const styles = StyleSheet.create({
  descriptionText: {
    color: 'rgba(177, 191, 196, 1.0)',
    fontFamily: 'abel_regular',
    fontSize: 17,
    paddingHorizontal: 8,
    textAlign: 'center'
  },
  extraPadding: {
    marginTop: 8,
    marginBottom: 8
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
  iconRow: {
    justifyContent: 'center'
  }
});
