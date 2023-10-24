import express from 'express';
import ContactModel from '../models/contact.js';

const contactsRouter = express.Router();

contactsRouter.get('/info', (request, response) => {
  const date = new Date().toLocaleString('en-GB', {
    dateStyle: 'long',
    timeStyle: 'full',
  });
  ContactModel.estimatedDocumentCount().then((count) => {
    response.send(`<p>The phonebook has ${count} contacts <p/>
        <p>Last sync: ${date}<p/>`);
  });
});

contactsRouter.get('/', (request, response) => {
  ContactModel.find({}).then((contacts) => response.json(contacts));
});

contactsRouter.get('/:id', (request, response, next) => {
  ContactModel.findById(request.params.id)
    .then((contact) => (contact ? response.json(contact) : response.status(404).end()))
    .catch((error) => next(error));
});

contactsRouter.delete('/:id', (request, response, next) => {
  // const id = Number(request.params.id);
  ContactModel.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

contactsRouter.put('/:id', (request, response, next) => {
  const { name, number } = request.body;

  ContactModel.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then((contactAdded) => response.json(contactAdded))
    .catch((error) => next(error));
});

contactsRouter.post('/', (request, response, next) => {
  const { name, number } = request.body;

  if (!name) {
    return response
      .status(404)
      .json({
        error: 'Name is missing',
      });
  }
  if (!number) {
    return response
      .status(404)
      .json({
        error: 'Number is missing',
      });
  }

  const contact = new ContactModel({
    name,
    number,
  });

  return contact
    .save()
    .then((newContact) => response.json(newContact))
    .catch((error) => next(error));
});

export default contactsRouter;
