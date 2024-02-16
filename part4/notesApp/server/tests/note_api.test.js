/* eslint-disable import/no-extraneous-dependencies */
import { expect, test, describe } from 'vitest';
import supertest from 'supertest';
import app from '../app';
import { initialNotes, notesInDB, nonExistingId } from './helpers/helpers.js';

const api = supertest(app);

describe('When there are initial notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-type', /application\/json/);
  }, 100000);

  test('all notes are returned', async () => {
    const res = await notesInDB();
    console.log(JSON.stringify(res, null, 2));
    expect(res).toHaveLength(initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const res = await notesInDB();

    const contents = res.map((note) => note.content);
    expect(contents).toContain('Browser can execute only JavaScript');
  });
});

describe('Viewing a specific note', () => {
  test('a specific note can be viewed', async () => {
    const notes = await notesInDB();
    const noteToView = notes[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(resultNote.body).toEqual(noteToView);
  });

  test('fails with 404 if note does not exist', async () => {
    const fakeID = await nonExistingId();

    await api.get(`/api/notes/${fakeID}`).expect(404);
  });

  test('fails with 404 if id is invalid', async () => {
    const invalidID = await nonExistingId();

    await api.get(`/api/notes/${invalidID}`).expect(404);
  });
});

test('a valid note can be added', async () => {
  const newNote = {
    content: 'Async/await simplifies making async calls',
    important: true,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const res = await notesInDB();
  const contents = res.map((r) => r.content);

  expect(res).toHaveLength(initialNotes.length + 1);
  expect(contents).toContain('Async/await simplifies making async calls');
});

test('note without content is not added ', async () => {
  const newNote = {
    important: true,
  };
  await api.post('/api/notes').send(newNote).expect(400);

  const res = await notesInDB();

  expect(res).toHaveLength(initialNotes.length);
});

test('a note can be deleted', async () => {
  const notes = await notesInDB();
  const noteToDelete = notes[0];

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

  const notesAfterDeletion = await notesInDB();
  expect(notesAfterDeletion).toHaveLength(initialNotes.length - 1);

  const contents = notesAfterDeletion.map((r) => r.content);
  expect(contents).not.toContain(noteToDelete.content);
});
