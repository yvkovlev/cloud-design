import Type from '../action-types';

const initialState = [];

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.SET_PROJECTS_DATA:
      return action.payload;
    case Type.RESET_STORE:
      return initialState;
    default:
      return state;
  }
};

export default projectsReducer;
