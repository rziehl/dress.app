var deepFreeze = require('deep-freeze');

import {
  CREATE_NEW_FIT,
  ADD_ITEM_TO_FIT,
  REMOVE_ITEM_FROM_FIT,
  ADD_FIT,
  createNewFit,
  addItemToFit,
  removeItemFromFit,
  addFit,
  fits
} from '../../src/ducks/Fits';

// action creators

describe('createNewFit()', () => {
  it('should have the correct type', () => {
    const expected = {
      type: CREATE_NEW_FIT
    };

    expect(createNewFit()).toEqual(expected);
  });
});

describe('addItemToFit()', () => {
  it('should have the correct type and the item provided', () => {
    const item = {
      type: 'FOOTWEAR',
      name: 'Service Boot'
    };

    const expected = {
      type: ADD_ITEM_TO_FIT,
      item: item
    };

    deepFreeze(item);

    expect(addItemToFit(item)).toEqual(expected);
  });
});

describe('removeItemFromFit()', () => {
  it('should have the correct type and the item provided', () => {
    const item = {
      type: 'FOOTWEAR',
      name: 'Service Boot'
    };

    const expected = {
      type: REMOVE_ITEM_FROM_FIT,
      item: item
    };

    deepFreeze(item);

    expect(removeItemFromFit(item)).toEqual(expected);
  });
});

describe('addFit()', () => {
  it('should have the correct type and the fit provided', () => {
    const fit = {
      outerwear: { name: 'Field Jacket' },
      shirt: { name: 'Flannel Shirt' },
      bottoms: { name: 'Raw Denim Jeans' },
      footwear: { name: 'Service Boot' }
    };

    const expected = {
      type: ADD_FIT,
      fit: fit
    };

    deepFreeze(fit);

    expect(addFit(fit)).toEqual(expected);
  });
});

// state

describe('initialFitsState', () => {
  it('should have no current fit and an empty list of fits', () => {
    const expected = {
      current: undefined,
      fits: []
    };

    expect(fits(undefined, { type: 'DefaultAction' })).toEqual(expected);
  });
});

// reducer

describe('fits()', () => {
  it('should use the initialFitsState if no state is provided', () => {
    const expected = {
      current: undefined,
      fits: []
    };

    expect(fits(undefined, { type: 'DefaultAction' })).toEqual(expected);
  });

  it('should create an empty fit object when a new fit is requested', () => {
    const expected = {
      current: {
        outerwear: undefined,
        sweater: undefined,
        shirt: undefined,
        tee: undefined,
        bottoms: undefined,
        belt: undefined,
        footwear: undefined
      },
      fits: []
    };

    expect(fits(undefined, createNewFit())).toEqual(expected);
  });

  it('should overwrite the existing fit if another new fit is requested', () => {
    const fit = {
      outerwear: { name: 'Field Jacket' },
      shirt: { name: 'Flannel Shirt' },
      bottoms: { name: 'Raw Denim Jeans' },
      footwear: { name: 'Service Boot' }
    };

    const state = {
      current: fit,
      fits: []
    };

    deepFreeze(fit);
    deepFreeze(state);

    const expected = {
      current: {
        outerwear: undefined,
        sweater: undefined,
        shirt: undefined,
        tee: undefined,
        bottoms: undefined,
        belt: undefined,
        footwear: undefined
      },
      fits: []
    };

    expect(fits(state, createNewFit())).toEqual(expected);
  });

  it('should correctly add a new item to the current fit based on its category', () => {
    const fit = {
      outerwear: { name: 'Field Jacket' },
      shirt: { name: 'Flannel Shirt' },
      bottoms: { name: 'Raw Denim Jeans' },
      footwear: { name: 'Service Boot' }
    };

    const state = {
      current: fit,
      fits: []
    };

    const item = {
      type: 'OUTERWEAR',
      name: 'Bomber Jacket'
    };

    const expected = {
      current: {
        outerwear: item,
        shirt: { name: 'Flannel Shirt' },
        bottoms: { name: 'Raw Denim Jeans' },
        footwear: { name: 'Service Boot' }
      },
      fits: []
    };

    deepFreeze(fit);
    deepFreeze(item);
    deepFreeze(state);

    expect(fits(state, addItemToFit(item))).toEqual(expected);
  });

  it('should not modify the current fit if the new items category does not exist', () => {
    const fit = {
      outerwear: { name: 'Field Jacket' },
      shirt: { name: 'Flannel Shirt' },
      bottoms: { name: 'Raw Denim Jeans' },
      footwear: { name: 'Service Boot' }
    };

    const item = {
      type: 'Accessory',
      name: 'Dive Watch'
    };

    const state = {
      current: fit,
      fits: []
    };

    deepFreeze(item);
    deepFreeze(state);

    expect(fits(state, addItemToFit(item))).toEqual(state);
  });

  it('should remove an item from the current fit based on its category', () => {
    const item = {
      type: 'OUTERWEAR',
      name: 'Field Jacket'
    };

    const fit = {
      outerwear: item,
      shirt: { name: 'Flannel Shirt' },
      bottoms: { name: 'Raw Denim Jeans' },
      footwear: { name: 'Service Boot' }
    };

    const state = {
      current: fit,
      fits: []
    };

    const expected = {
      current: {
        outerwear: undefined,
        shirt: { name: 'Flannel Shirt' },
        bottoms: { name: 'Raw Denim Jeans' },
        footwear: { name: 'Service Boot' }
      },
      fits: []
    };

    deepFreeze(fit);
    deepFreeze(item);
    deepFreeze(state);

    expect(fits(state, removeItemFromFit(item))).toEqual(expected);
  });

  it('should not modify the current fit if the item to be removed has a category that does not exist', () => {
    const fit = {
      outerwear: { name: 'Field Jacket' },
      shirt: { name: 'Flannel Shirt' },
      bottoms: { name: 'Raw Denim Jeans' },
      footwear: { name: 'Service Boot' }
    };

    const item = {
      type: 'Accessory',
      name: 'Dive Watch'
    };

    const state = {
      current: fit,
      fits: []
    };

    deepFreeze(item);
    deepFreeze(state);

    expect(fits(state, removeItemFromFit(item))).toEqual(state);
  });

  it('should add a fit to the list of fits', () => {
    const fit = {
      outerwear: { name: 'Field Jacket' },
      shirt: { name: 'Flannel Shirt' },
      bottoms: { name: 'Raw Denim Jeans' },
      footwear: { name: 'Service Boot' }
    };

    const state = {
      current: fit,
      fits: []
    };

    const expected = {
      current: undefined,
      fits: [fit]
    };

    deepFreeze(fit);
    deepFreeze(state);

    // TODO: redundant to pass a fit when current exists?

    expect(fits(state, addFit(fit))).toEqual(expected);
  });
});