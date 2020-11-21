import { combineReducers } from 'redux';

import dateReducer from './reducers/date-reducer';

export default combineReducers({
  date: dateReducer,
});
