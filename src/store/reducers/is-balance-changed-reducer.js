import Type from '../action-types';

const initialState = null;

const isBalanceChangedReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.SET_IS_BALANCE_CHANGED:
      return action.payload;
    case Type.RESET_STORE:
      return initialState;
    default:
      return state;
  }
};

export default isBalanceChangedReducer;
