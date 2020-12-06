import { combineReducers } from 'redux';

import projectsReducer from './reducers/projects-reducer';

export default combineReducers({
  projects: projectsReducer,
});
