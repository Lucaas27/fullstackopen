import express from 'express';
import NoteModel from '../models/note.js';

const notesRouter = express.Router();

// Routes
notesRouter.get('/', async (request, response) => {
  // NoteModel.find({}).then((notes) => {
  //   response.json(notes);
  // });
  const notes = await NoteModel.find({});
  response.json(notes);
});

notesRouter.post('/', async (request, response, next) => {
  const { content, important } = request.body;

  if (!content) {
    return response.status(400).json({ error: 'content missing' });
  }

  const note = new NoteModel({
    content,
    important: important || false,
  });
  try {
    const savedNote = await note.save();
    return response.json(savedNote);
  } catch (error) {
    return next(error);
  }
});

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await NoteModel.findById(request.params.id);
    return note ? response.json(note) : response.status(404).end();
  } catch (error) {
    return next(error);
  }
});

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await NoteModel.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  } catch (error) {
    return next(error);
  }
});

notesRouter.put('/:id', async (request, response, next) => {
  const { content, important } = request.body;
  try {
    const updatedNote = await NoteModel.findByIdAndUpdate(
      request.params.id,
      { content, important },
      { new: true, runValidators: true, context: 'query' },
    );
    return response.json(updatedNote);
  } catch (error) {
    return next(error);
  }
});

export default notesRouter;
