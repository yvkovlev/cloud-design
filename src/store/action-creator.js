import Type from './action-types';
import fetchData from '../utils/fetch';

export const fetchDateData = (data) => ({
  type: Type.FETCH_DATE_DATA,
  payload: data,
});

export const setDateData = (data) => ({
  type: Type.SET_DATE,
  payload: data,
});

export const getDateData = () => async (dispatch) => {
  try {
    const data = await fetchData('/mocks/date/get.json');
    dispatch(fetchDateData(data));
  } catch (err) {
    console.log(err);
  }
};

export const updateDateData = (data) => async (dispatch) => {
  try {
    dispatch(setDateData(data));
  } catch (err) {
    console.log(err);
  }
};
