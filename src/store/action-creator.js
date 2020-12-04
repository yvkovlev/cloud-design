import Type from './action-types';
import fetchData from '../utils/fetch';

export const setIsAuthorizedData = (data) => ({
  type: Type.SET_IS_AUTHORIZED,
  payload: data,
});

export const fetchProjectsData = (data) => ({
  type: Type.SET_PROJECTS_DATA,
  payload: data,
});

export const setProjectsData = (data) => ({
  type: Type.SET_PROJECTS_DATA,
  payload: data,
});

export const getProjectsData = () => async (dispatch) => {
  try {
    const data = await fetchData('/mocks/projects/get.json');
    dispatch(fetchProjectsData(data));
  } catch (err) {
    console.log(err);
  }
};

export const updateProjectsData = (data) => async (dispatch) => {
  try {
    dispatch(setProjectsData(data));
  } catch (err) {
    console.log(err);
  }
};

export const updateIsAuthorizedData = (data) => async (dispatch) => {
  try {
    dispatch(setIsAuthorizedData(data));
  } catch (err) {
    console.log(err);
  }
};
