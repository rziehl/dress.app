import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from '../lib/Button';
import Card from '../lib/Card';
import CardItem from '../lib/CardItem';

type Props = {
  onPressHandler: ?() => void
}

export default function AddFitPromptCard(props: Props) {
  return (
    <Card>
      <CardItem>
        <Button text="ADD A FIT" onPress={props.onPressHandler} />
      </CardItem>
    </Card>
  );
}
