import Type from '../action-types';

const balanceReducer = (state = null, action) => {
  switch (action.type) {
    case Type.SET_BALANCE_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default balanceReducer;
