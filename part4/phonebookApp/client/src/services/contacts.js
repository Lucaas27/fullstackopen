import axios from 'axios';

const baseUrl = '/api/contacts';

const getAll = () => axios.get(baseUrl).then((allContacts) => allContacts.data);

const create = (newContact) => axios
  .post(baseUrl, newContact)
  .then((newContactResponse) => newContactResponse.data);

const update = (id, modifiedContact) => axios
  .put(`${baseUrl}\\${id}`, modifiedContact)
  .then((newContact) => newContact.data);

const deleteContact = (id) => axios.delete(`${baseUrl}\\${id}`);

export default {
  getAll,
  create,
  update,
  deleteContact,
};
