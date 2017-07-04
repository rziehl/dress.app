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

/*function generateListFor(fit, navigation, listener){
  let fit_choices = [
    {
      name: 'Outerwear',
      categories: ['OUTERWEAR'],
      item_id: fit.outerwear_id,
      icon: require('../../res/img/clothes_icons/trench-coat.png')
    },
    {
      name: 'Sweater',
      categories: ['SWEATER'],
      item_id: fit.sweater_id,
      icon: require('../../res/img/clothes_icons/hoodie.png')
    },
    {
      name: 'Shirt',
      categories: ['SHIRTING'],
      item_id: fit.shirting_id,
      icon: require('../../res/img/clothes_icons/shirt-1.png')
    },
    {
      name: 'Tee',
      categories: ['TEE'],
      item_id: fit.tee_id,
      icon: require('../../res/img/clothes_icons/shirt.png')
    },
    {
      name: 'Bottoms',
      categories: ['DENIM', 'PANT', 'SHORT'],
      item_id: fit.denim_id | fit.pants_id | fit.shorts_id,
      icon: require('../../res/img/clothes_icons/jeans.png')
    },
    {
      name: 'Footwear',
      categories: ['FOOTWEAR'],
      item_id: fit.footwear_id,
      icon: require('../../res/img/clothes_icons/shoe.png')
    },
    {
      name: 'Belt',
      categories: ['BELT'],
      item_id: fit.belt_id,
      icon: require('../../res/img/clothes_icons/belt.png')
    }
  ];

  var list = fit_choices.map((fit_item) => {
    if (fit_item.item_id > 0){
        let item = DataStore.objects('ClothingItem').filtered('id = $0', fit_item.item_id)[0];

        return (
          <ListItem
            key={'fit_item_' + fit_item.name.toLowerCase()}
            onPress={() => navigation.navigate('FitItemSelectScreen', {
              categories: fit_item.categories,
              listener: listener,
              navigation: navigation,
              title: 'Replace ' + fit_item.name,
              fit: fit
            })
          }>
            <Thumbnail small circle source={{uri: item.thumbnail}}/>
            <Body>
              <Text>{item.name}</Text>
              <Text note>{item.brand}</Text>
            </Body>
          </ListItem>
        );
    } else {
      /*onPress={() => navigation.navigate('FitItemSelectScreen', {
        categories: fit_item.categories,
        listener: listener,
        navigation: navigation,
        title: 'Choose ' + fit_item.name,
        fit: fit
      })*/

    /*  return (
        <ListItem key={'fit_item_' + fit_item.name.toLowerCase()}>
          <Thumbnail small square source={fit_item.icon}/>
          <Body>
            <Text>{fit_item.name}</Text>
            <Text note>None</Text>
          </Body>
        </ListItem>
      );
    }
  });

  var hasShirt = fit.shirting_id | fit.tee_id;
  var hasPants = fit.denim_id | fit.pants_id | fit.shorts_id;
  var hasShoes = fit.footwear_id;

  if (hasShirt && hasPants && hasShoes){
    list.push(
      <ListItem key="wear_this_fit_button">
        <Body>
          <Button block
            onPress={() => {
              //fit.date = Date();

              Object.keys(fit).forEach((key) => (fit[key] == null) && delete fit[key]);

              DataStore.write(() => {
                DataStore.create('Fit', fit);
              });
            }
          }>
            <Text>WEAR THIS FIT</Text>
          </Button>
        </Body>
      </ListItem>
    );
  }

  return list;
}*/
