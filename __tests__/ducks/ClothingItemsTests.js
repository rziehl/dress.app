var deepFreeze = require('deep-freeze');

import {
  SET_CLOTHING_ITEMS,
  SET_CLOTHING_FILTER,
  setClothingItems,
  setClothingFilter,
  clothes
} from '../../src/ducks/ClothingItems';

// action creators

describe('setClothingItems()', () => {
  it('should return the correct type and array of clothes passed to it', () => {
    const clothes = [
      {
        type: 'OUTERWEAR',
        name: 'Bomber Jacket'
      },
      {
        type: 'FOOTWEAR',
        name: 'Service Boot'
      }
    ];

    deepFreeze(clothes);

    const expected = {
      type: SET_CLOTHING_ITEMS,
      items: clothes
    };

    expect(setClothingItems(clothes)).toEqual(expected);
  });
});

describe('setClothingFilter()', () => {
  it('should return the correct type and filter passed to it', () => {
    const expected = {
      type: SET_CLOTHING_FILTER,
      filter: 'FOOTWEAR'
    };

    expect(setClothingFilter('FOOTWEAR')).toEqual(expected);
  });
});

// state

describe('initialClothesState', () => {
  it('should have an empty list of clothes and no filter', () => {
    const expected = {
      items: [],
      filter: undefined
    };

    expect(clothes(undefined, { type: 'DefaultAction' })).toEqual(expected);
  });
});

// reducer

describe('clothes()', () => {
  it('should use the initialClothesState if no state is provided', () => {
    const expected = {
      items: [],
      filter: undefined
    };

    expect(clothes(undefined, { type: 'DefaultAction' })).toEqual(expected);
  });

  it('should set the list of clothing items correctly', () => {
    const items = [
      {
        type: 'OUTERWEAR',
        name: 'Bomber Jacket'
      },
      {
        type: 'FOOTWEAR',
        name: 'Service Boot'
      }
    ];

    const expected = {
      items: items,
      filter: undefined
    };

    deepFreeze(items);

    const result = clothes(undefined, setClothingItems(items));
    expect(result).toEqual(expected);
  });

  it('should overwrite the previous list of clothing items if called again', () => {
    const state = {
      items: [
        {
          type: 'OUTERWEAR',
          name: 'Bomber Jacket'
        },
        {
          type: 'FOOTWEAR',
          name: 'Service Boot'
        }
      ],
      filter: undefined
    };

    const items = [
      {
        type: 'SHIRT',
        name: 'OCBD'
      }
    ];

    const expected = {
      items: items,
      filter: undefined
    };

    deepFreeze(state);
    deepFreeze(items);

    const result = clothes(state, setClothingItems(items));
    expect(result).toEqual(expected);
  });

  it('should set the clothing items filter correctly', () => {
    const expected = {
      items: [],
      filter: 'BOTTOMS'
    };

    const result = clothes(undefined, setClothingFilter('BOTTOMS'));
    expect(result).toEqual(expected);
  });

  it('should overwrite the previously set clothing filter', () => {
    const state = {
      items: [],
      filter: 'BOTTOMS'
    };

    const expected = {
      items: [],
      filter: 'FOOTWEAR'
    };

    deepFreeze(state);

    expect(clothes(state, setClothingFilter('FOOTWEAR'))).toEqual(expected);
  });

  it('should return the same state if an unsupplied action is provided', () => {
    const state = {
      items: [
        {
          type: 'OUTERWEAR',
          name: 'Bomber Jacket'
        }
      ],
      filter: 'SHIRTING'
    };

    deepFreeze(state);

    expect(clothes(state, { type: 'UnsupportedAction' })).toEqual(state);
  });
});