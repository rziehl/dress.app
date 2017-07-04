/*import React, { Component } from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

import { NavigationActions } from 'react-navigation';

import { DataStore } from '../data/DataStore';

export default class FitItemSelectScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Choose Item',
    headerStyle: {
      backgroundColor: 'rgba(121, 85, 72, 1.0)',
    },
    headerTintColor: '#fff'
  });

  render() {
    const { params } = this.props.navigation.state;

    let all_clothes = DataStore.objects('ClothingItem');
    var query_string = params.categories.map((c) => 'type == "' + c + '"').join(" OR ");
    let clothes = formatForViewList(all_clothes.filtered(query_string));

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <Content>
            <List
              dataArray={clothes}
              renderRow={(item) => getRowFor(item, this.props.navigation, params)}
              style={{ backgroundColor: '#fff' }}>
            </List>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

function getRowFor(item, navigation, params){
  if (item.type === 'HEADER'){
    return (
      <Separator bordered>
        <Text>{item.name}</Text>
      </Separator>
    );
  }

  return (
    <ListItem avatar
      onPress={() => {
        fit = addItemIdToFit(item, params.fit);
        params.listener.setState({ fit: fit });
        const back_action = NavigationActions.back({});
        navigation.dispatch(back_action);
      }
    }>
      <Left>
        <Thumbnail size={80} source={{uri: item.thumbnail}}/>
      </Left>

      <Body>
        <Text>{item.name}</Text>
        <Text note>{item.brand}</Text>
        <Text note>{item.color}</Text>
      </Body>
    </ListItem>
  );
}

function formatForViewList(clothes){
  var list = [];

  var categories = [
    ['OUTERWEAR', 'OUTERWEAR'],
    ['SWEATER', 'SWEATERS'],
    ['SHIRTING', 'SHIRTING'],
    ['DENIM', 'DENIM'],
    ['TEE', 'TEES'],
    ['PANT', 'PANTS'],
    ['SHORT', 'SHORTS'],
    ['FOOTWEAR', 'FOOTWEAR'],
    ['BELT', 'BELTS']
  ];

  for (var i=0; i<categories.length; i++){
    let category = categories[i][0];
    let display_string = categories[i][1];

    var category_clothes = clothes.filtered('type = $0', category);

    if (category_clothes.length > 0){
      list.push({
          type: 'HEADER',
          name: display_string
      });

      for (var j=0; j<category_clothes.length; j++){
        list.push(category_clothes[j]);
      }
    }
  }

  return list;
}

function addItemIdToFit(item, fit){
  var new_fit = {
    outerwear_id: fit.outerwear_id,
    sweater_id: fit.sweater_id,
    shirting_id: fit.shirting_id,
    tee_id: fit.tee_id,
    denim_id: fit.denim_id,
    pants_id: fit.pants_id,
    shorts_id: fit.shorts_id,
    footwear_id: fit.footwear_id,
    belt_id: fit.belt_id
  };

  switch (item.type){
    case 'OUTERWEAR': new_fit.outerwear_id = item.id; break;
    case 'SWEATER': new_fit.sweater_id = item.id; break;
    case 'SHIRTING': new_fit.shirting_id = item.id; break;
    case 'TEE': new_fit.tee_id = item.id; break;
    case 'DENIM': new_fit.denim_id = item.id; break;
    case 'PANT': new_fit.pants_id = item.id; break;
    case 'SHORT': new_fit.shorts_id = item.id; break;
    case 'FOOTWEAR': new_fit.footwear_id = item.id; break;
    case 'BELT': new_fit.belt_id = item.id; break;
    default: break;
  }

  return new_fit;
}*/
