import Type from './action-types';
import fetchData from '../utils/fetch';

export const setProjectsData = (data) => ({
  type: Type.SET_PROJECTS_DATA,
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
