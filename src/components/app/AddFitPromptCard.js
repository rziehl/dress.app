import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from '../lib/Button';
import Card from '../lib/Card';
import CardItem from '../lib/CardItem';

export default class AddFitPromptCard extends Component {
  render(){
    return (
      <Card>
        <CardItem>
          <Button text="ADD A FIT" onPress={this.props.onPressHandler} />
        </CardItem>
      </Card>
    );
  }
}
