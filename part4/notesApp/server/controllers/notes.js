import express from 'express';
import NoteModel from '../models/note.js';

const notesRouter = express.Router();

// Routes
notesRouter.get('/', (request, response) => {
  NoteModel.find({}).then((notes) => {
    response.json(notes);
  });
});

notesRouter.post('/', (request, response, next) => {
  const { content, important } = request.body;

  if (!content) {
    return response.status(400).json({ error: 'content missing' });
  }

  const note = new NoteModel({
    content,
    important: important || false,
  });

  return note
    .save()
    .then((savedNote) => response.json(savedNote))
    .catch((error) => next(error));
});

notesRouter.get('/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // const note = notes.find((note) => note.id === id)
  // note ? response.json(note) : response.status(404).end()

  NoteModel.findById(request.params.id)
    .then((note) => (note ? response.json(note) : response.status(404).end()))
    .catch((error) => next(error));
});

notesRouter.delete('/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // notes = notes.filter((note) => note.id !== id)
  NoteModel.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body;

  NoteModel.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedNote) => response.json(updatedNote))
    .catch((error) => next(error));
});

export default notesRouter;
