import Type from './action-types';
import fetchData from '../utils/fetch';

export const setProjectsData = (data) => ({
  type: Type.SET_PROJECTS_DATA,
  payload: data,
});

export const setIsProjectsChangedData = (data) => ({
  type: Type.SET_IS_PROJECTS_CHANGED,
  payload: data,
});

export const setBalanceData = (data) => ({
  type: Type.SET_BALANCE_DATA,
  payload: data,
});

export const setIsBalanceChangedData = (data) => ({
  type: Type.SET_IS_BALANCE_CHANGED,
  payload: data,
});

export const setTransactionData = (data) => ({
  type: Type.SET_TRANSACTION_DATA,
  payload: data,
});

export const getProjectsData = () => async (dispatch) => {
  try {
    const data = await fetchData('/api/projects');
    dispatch(setProjectsData(data));
  } catch (err) {
    console.log(err);
  }
};

export const getBalanceData = () => async (dispatch) => {
  try {
    const data = await fetchData('/api/balance');
    dispatch(setBalanceData(data));
  } catch (err) {
    console.log(err);
  }
};

export const getTransactionsData = () => async (dispatch) => {
  try {
    const data = await fetchData('/api/transaction-history');
    dispatch(setTransactionData(data));
  } catch (err) {
    console.log(err);
  }
};
