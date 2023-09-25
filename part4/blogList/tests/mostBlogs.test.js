import { mostBlogs } from '../utils/for_testing.js';
import { blogsList } from './dataJSON.js';

describe('author with most blogs', () => {
  test('Robert C. Martin has the most blogs', () =>
    expect(mostBlogs(blogsList)).toEqual({ author: 'Robert C. Martin', blogs: 3 }));
});
