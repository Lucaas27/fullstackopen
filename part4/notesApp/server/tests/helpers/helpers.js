import Note from '../../models/note';
import { info } from '../../utils/logger';

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
];

const clearCollection = async () => {
  await Note.deleteMany({});
  info('Mongo collection cleared');
};

const addNotesToCollection = async () => {
  const savedNotes = initialNotes.map((n) => new Note(n));
  savedNotes.map((note) => note.save());
  Promise.all(savedNotes);
  info('Notes saved into db');
};

const notesInDB = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

export {
  initialNotes,
  notesInDB,
  nonExistingId,
  clearCollection,
  addNotesToCollection,
};
