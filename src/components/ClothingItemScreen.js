/*import React, { Component } from 'react';

import {
  Image,
  StyleSheet,
  View
} from 'react-native';

export default class ClothingItemScreen extends Component {
  render() {
    const { params } = this.props.navigation.state;

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <Content style={{ backgroundColor: '#fff' }}>
            <View style={styles.itemContainer}>
              <Image resizeMode={Image.resizeMode.contain}
                source={{uri: params.item.image}}
                style={styles.itemImage}
              />
            </View>
            <List>
              <Separator bordered>
                <Text>DETAILS</Text>
              </Separator>
              <ListItem icon>
                <Left><Icon name="md-shirt" style={{ color: "#888" }}/></Left>
                <Body><Text>Brand</Text></Body>
                <Right><Text note>{params.item.brand}</Text></Right>
              </ListItem>
              <ListItem icon>
                <Left><Icon name="md-color-fill" style={{ color: "#888" }}/></Left>
                <Body><Text>Color</Text></Body>
                <Right><Text note>{params.item.color}</Text></Right>
              </ListItem>
              <ListItem icon>
                <Left><Icon name="md-resize" style={{ color: "#888" }}/></Left>
                <Body><Text>Size</Text></Body>
                <Right><Text note>{params.item.size}</Text></Right>
              </ListItem>
              <ListItem icon>
                <Left><Icon name="md-hammer" style={{ color: "#888" }}/></Left>
                <Body><Text>Made In</Text></Body>
                <Right><Text note>{params.item.made_in}</Text></Right>
              </ListItem>
              <ListItem icon>
                <Left><Icon name="md-filing" style={{ color: "#888" }}/></Left>
                <Body><Text>Category</Text></Body>
                <Right><Text note>{params.item.type}</Text></Right>
              </ListItem>
            </List>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  itemImage: {
    flex: 1,
    alignSelf: 'center',
    width: 360,
    height: 360,
  }
});
*/
