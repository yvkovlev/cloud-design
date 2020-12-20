import Type from '../action-types';

const projectsReducer = (state = null, action) => {
  switch (action.type) {
    case Type.SET_PROJECTS_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default projectsReducer;
