// --- THIRD PARTY INCLUDES ---

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { connect } from 'react-redux';

// --- APP INCLUDES ---

import Button from '../components/lib/Button';
import Card from '../components/lib/Card';
import CardItem from '../components/lib/CardItem';
import SectionDivider from '../components/lib/SectionDivider';

import FitCategoryBlock from '../components/app/FitCategoryBlock';
import FitItemBlock from '../components/app/FitItemBlock';

import { setClothingFilter } from '../ducks/ClothingItems';

import * as ClothesUtil from '../util/ClothesUtil';

class FitCreateContainer extends Component {
  render() {
    let descriptionContents = this.props.isValid ? (
      <Button text="I'M WEARING THIS" onPress={() => {}} />
    ) : (
      <View>
        <Text style={styles.descriptionText}>Tap a category to choose each part of your outfit. Cover both the top and bottom half of your body, then pick out some shoes before confirming.</Text>
      </View>
    );

    const topCategoryRow = ClothesUtil.CLOTHES_CATEGORIES.slice(0, 4);
    const bottomCategoryRow = ClothesUtil.CLOTHES_CATEGORIES.slice(4, 7);

    const topCategoryBlocks = topCategoryRow.map((category) => {
      return this.createCategoryBlock(
        this.props.fit[category],
        category,
        ClothesUtil.iconForCategory(category)
      )
    });

    const bottomCategoryBlocks = bottomCategoryRow.map((category) => {
      return this.createCategoryBlock(
        this.props.fit[category],
        category,
        ClothesUtil.iconForCategory(category)
      )
    });

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
          {topCategoryBlocks}
        </CardItem>

        <SectionDivider style={styles.extraPadding}/>

        <CardItem style={styles.iconRow}>
          {bottomCategoryBlocks}
        </CardItem>
      </Card>
    );
  }

  createCategoryBlock(current_item, category, icon){
    if (current_item) {
      return (
        <FitItemBlock
          key={'fit_item_for_' + category.toLowerCase()}
          onPress={this.props.onCategoryPress.bind(this, category)}
          thumbnail={{uri: current_item.thumbnail}}
        />
      );
    }

    return (
      <FitCategoryBlock
        key={'fit_item_for_' + category.toLowerCase()}
        category={category}
        onPress={this.props.onCategoryPress.bind(this, category)}
        thumbnail={icon}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    fit: state.fits.current,
    isValid: verifyFit(state.fits.current)
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCategoryPress: (category) => { dispatch(setClothingFilter(category)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FitCreateContainer);

function verifyFit(fit){
  let hasShirt = fit[ClothesUtil.CLOTHES_CATEGORY_SHIRTING] || fit[ClothesUtil.CLOTHES_CATEGORY_TEE];
  let hasPants = fit[ClothesUtil.CLOTHES_CATEGORY_BOTTOMS];
  let hasShoes = fit[ClothesUtil.CLOTHES_CATEGORY_FOOTWEAR];

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
