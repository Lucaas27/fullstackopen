import Note from '../models/note';

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

export { initialNotes, notesInDB, nonExistingId };
