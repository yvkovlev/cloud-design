import Type from '../action-types';

const initialState = [];

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.SET_TRANSACTION_DATA:
      return action.payload;
    case Type.RESET_STORE:
      return initialState;
    default:
      return state;
  }
};

export default transactionReducer;
