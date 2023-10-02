import { expect } from 'chai';
import { mostLikes } from '../utils/for_testing.js';
import { blogsList } from './dataJSON.js';

describe('author with most likes', () => {
  const mostLiked = {
    author: 'Edsger W. Dijkstra',
    likes: 17,
  };
  it('returns Edsger W. Dijkstra as the author with most liked blogs', () => {
    expect(mostLikes(blogsList)).to.deep.equal(mostLiked);
  });
});
