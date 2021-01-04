import axios from 'axios';

export default async (url, method = 'GET', payload = {}) => {
  const token = localStorage.getItem('user');
  switch (method) {
    case 'POST': {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    }
    default: {
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    }
  }
};
