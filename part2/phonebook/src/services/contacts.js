import axios from "axios";
const baseUrl = "http://localhost:3001/contacts";

const getAll = () => axios.get(baseUrl).then((allContacts) => allContacts.data);

const create = (newContact) =>
  axios
    .post(baseUrl, newContact)
    .then((newContactResponse) => newContactResponse.data);

const update = (id, modifiedContact) => {
  return axios
    .put(`${baseUrl}\\${id}`, modifiedContact)
    .then((modifiedContact) => modifiedContact.data);
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}\\${id}`);
};

export default {
  getAll,
  create,
  update,
  deleteContact,
};
