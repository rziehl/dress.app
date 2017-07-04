/*import React, { Component } from 'react';

//import { DataStore } from '../data/DataStore';

import { connect } from 'react-redux';

import { getAllFits } from '../state/Fits';

class FitsTab extends Component {*/
  /*constructor(props){
    super(props);
    //this.state = {}
  }*/

  //componentDidMount(){
    //DataStore.objects('Fit').addListener((fits, changes) => this.setState(this.state));
  //}

  /*render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <Content>
            <List
              dataArray={this.props.fits}
              renderRow={(item) => getRowFor(item, this.props.navigation)}
              style={{ backgroundColor: '#fff' }}>
            </List>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    fits: state.fit.fits,
  }
}

export default connect(mapStateToProps)(FitsTab)

function getRowFor(item, navigation){
  return (
    <ListItem
      onPress={() => navigation.navigate('FitViewScreen', {item: item}) }>
      <Thumbnail size={120} source={{uri: item.photo_uri}}/>
      <Body>
        <Text>{Date()}</Text>
        <Text note>High: 20, Low: 10, Wind: 10km/h, Rain: 40%</Text>
      </Body>
    </ListItem>
  );
}*/
