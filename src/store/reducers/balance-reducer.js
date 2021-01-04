import Type from '../action-types';

const initialState = null;

const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.SET_BALANCE_DATA:
      return action.payload;
    case Type.RESET_STORE:
      return initialState;
    default:
      return state;
  }
};

export default balanceReducer;
