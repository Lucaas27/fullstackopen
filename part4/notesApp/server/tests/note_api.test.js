import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';

const api = supertest(app);

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-type', /application\/json/);
}, 100000);

test('there are two notes', async () => {
  const res = await api.get('/api/notes');

  expect(res.body).toHaveLength(2);
});

test('the first note is about HTTP methods', async () => {
  const res = await api.get('/api/notes');
  // console.log(res.body);
  expect(res.body[0].content).toMatch(/HTTP/);
});

afterAll(async () => {
  await mongoose.connection.close();
});
