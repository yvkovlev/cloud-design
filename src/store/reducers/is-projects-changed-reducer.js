import Type from '../action-types';

const initialState = null;

const isProjectsChangedReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.SET_IS_PROJECTS_CHANGED:
      return action.payload;
    case Type.RESET_STORE:
      return initialState;
    default:
      return state;
  }
};

export default isProjectsChangedReducer;
