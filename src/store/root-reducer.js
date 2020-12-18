import { combineReducers } from 'redux';

import projectsReducer from './reducers/projects-reducer';
import isProjectsChangedReducer from './reducers/is-projects-changed-reducer';

export default combineReducers({
  projects: projectsReducer,
  isProjectsChanged: isProjectsChangedReducer,
});
