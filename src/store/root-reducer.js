import { combineReducers } from 'redux';

import isAuthorizedReducer from './reducers/is-authorized-reducer';
import projectsReducer from './reducers/projects-reducer';

export default combineReducers({
  isAuthorized: isAuthorizedReducer,
  projects: projectsReducer,
});
