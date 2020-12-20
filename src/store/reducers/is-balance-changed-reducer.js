import Type from '../action-types';

const initialState = true;

const isBalanceChangedReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.SET_IS_BALANCE_CHANGED:
      return action.payload;
    default:
      return state;
  }
};

export default isBalanceChangedReducer;
