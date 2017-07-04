/*import React, { Component } from 'react';

import { DataStore } from '../data/DataStore';

export default class WardrobeTab extends Component {
  render() {
    let clothes = formatForViewList(DataStore.objects('ClothingItem'));

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <Content>
            <List
              dataArray={clothes}
              renderRow={(item) => getRowFor(item, this.props.navigation)}
              style={{ backgroundColor: '#fff' }}>
            </List>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

function getRowFor(item, navigation){
  if (item.type === 'HEADER'){
    return (
      <Separator bordered>
        <Text>{item.name}</Text>
      </Separator>
    );
  }

  return (
    <ListItem avatar
      onPress={() => navigation.navigate('ClothingItemScreen', {item: item}) }>
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

    list.push({
        type: 'HEADER',
        name: display_string
    });

    var category_clothes = clothes.filtered('type = $0', category);

    for (var j=0; j<category_clothes.length; j++){
      list.push(category_clothes[j]);
    }
  }

  return list;
}*/
