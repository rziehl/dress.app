import { ClothingItem } from '../models/ClothingItem';
import { Forecast } from '../models/Forecast';
import { Fit } from '../models/Fit';

import Clothes from './Clothes';

var Realm = require('realm');

export var DataStore = new Realm({
  schema: [ClothingItem, Fit, Forecast],
});

export function initializeDataLayer(){
  seedDataStore();
}

function seedDataStore(){
  let clothes = DataStore.objects('ClothingItem');

  if (clothes.length == 0){
    DataStore.write(() => {
      for (var i=0; i<Clothes.length; i++){
        DataStore.create('ClothingItem', Clothes[i]);
      }
    });
  }
}
