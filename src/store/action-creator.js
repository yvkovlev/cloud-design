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

export const getProjectsData = (email) => async (dispatch) => {
  try {
    const data = await fetchData(`/api/projects?email=${email}`);
    dispatch(setProjectsData(data));
  } catch (err) {
    console.log(err);
  }
};

export const getBalanceData = (email) => async (dispatch) => {
  try {
    const data = await fetchData(`/api/balance?email=${email}`);
    dispatch(setBalanceData(data));
  } catch (err) {
    console.log(err);
  }
};
