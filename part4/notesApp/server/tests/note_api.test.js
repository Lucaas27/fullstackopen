import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import Note from '../models/note';

const api = supertest(app);
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

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObj = new Note(initialNotes[0]);
  await noteObj.save();
  noteObj = new Note(initialNotes[1]);
  await noteObj.save();
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-type', /application\/json/);
}, 100000);

test('all notes are returned', async () => {
  const res = await api.get('/api/notes');

  expect(res.body).toHaveLength(initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
  const res = await api.get('/api/notes');

  const contents = res.body.map((r) => r.content);
  expect(contents).toContain('Browser can execute only JavaScript');
});

afterAll(async () => {
  await mongoose.connection.close();
});
