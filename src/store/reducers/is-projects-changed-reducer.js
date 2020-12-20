import Type from '../action-types';

const initialState = true;

const isProjectsChangedReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.SET_IS_PROJECTS_CHANGED:
      return action.payload;
    default:
      return state;
  }
};

export default isProjectsChangedReducer;
