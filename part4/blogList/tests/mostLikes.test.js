import { mostLikes } from '../utils/for_testing.js';
import { blogsList } from './dataJSON.js';

describe('author with most likes', () => {
  const mostLiked = {
    author: 'Edsger W. Dijkstra',
    likes: 17,
  };
  test('Edsger W. Dijkstra has the most liked blogs', () => {
    expect(mostLikes(blogsList)).toEqual(mostLiked);
  });
});
