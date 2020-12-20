import { combineReducers } from 'redux';

import projectsReducer from './reducers/projects-reducer';
import isProjectsChangedReducer from './reducers/is-projects-changed-reducer';
import balanceReducer from './reducers/balance-reducer';
import isBalanceChangedReducer from './reducers/is-balance-changed-reducer';
import transactionReducer from './reducers/transaction-reducer';

export default combineReducers({
  projects: projectsReducer,
  isProjectsChanged: isProjectsChangedReducer,
  balance: balanceReducer,
  isBalanceChanged: isBalanceChangedReducer,
  transactionHistory: transactionReducer,
});
