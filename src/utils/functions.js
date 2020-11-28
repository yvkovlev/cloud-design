import dictionary from '@utils/dictionary';

export const getSumByArray = (arr) => {
  const reducer = (accumulator, currentItem) => {
    if (currentItem.value !== '' && currentItem.status !== false) {
      return accumulator + parseInt(currentItem.value, 10);
    }
    return accumulator;
  };
  return arr.reduce(reducer, 0);
};

export const getProjectStatus = (id) => {
  const foundStatus = dictionary.PROJECT_STATUSES.filter((item) => item.id === id)[0];
  return foundStatus || dictionary.PROJECT_STATUSES[0];
};
