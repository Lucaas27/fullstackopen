import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
  const request = axios.get(baseUrl).then((res) => res.data);
  const fakeNote = {
    id: 1000,
    content: "This is a fake note",
    important: true,
  };

  return request.then((initialNotes) => initialNotes.concat(fakeNote));
};

const create = (newObj) => axios.post(baseUrl, newObj).then((res) => res.data);
const update = (id, newObj) =>
  axios.put(`${baseUrl}/${id}`, newObj).then((res) => res.data);

export default {
  getAll,
  create,
  update,
};
