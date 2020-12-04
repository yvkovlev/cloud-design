import Type from '../action-types';

const initialState = false;

const isAuthorizedReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.SET_IS_AUTHORIZED:
      return action.payload;
    default:
      return state;
  }
};

export default isAuthorizedReducer;
