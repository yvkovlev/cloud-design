import Type from './action-types';
import fetchData from '../utils/fetch';

export const setProjectsData = (data) => ({
  type: Type.SET_PROJECTS_DATA,
  payload: data,
});

export const getProjectsData = () => async (dispatch) => {
  try {
    const data = await fetchData('/mocks/projects/get.json');
    dispatch(setProjectsData(data));
  } catch (err) {
    console.log(err);
  }
};
