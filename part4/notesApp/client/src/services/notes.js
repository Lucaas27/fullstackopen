import axios from 'axios';

const baseUrl = '/api/notes';

const getAll = () => {
  const request = axios.get(baseUrl).then((res) => res.data);

  return request;
};

const create = (newObj) => axios.post(baseUrl, newObj).then((res) => res.data);

const update = (id, newObj) => axios.put(`${baseUrl}/${id}`, newObj).then((res) => res.data);

const remove = (id) => axios.delete(`${baseUrl}/${id}`).then((res) => res.data);

export default {
  getAll,
  create,
  update,
  remove,
};
