import { expect } from 'chai';
import { mostBlogs } from '../utils/for_testing.js';
import { blogsList } from './dataJSON.js';

describe('author with most blogs', () => {
  it('returns Robert C. Martin as the author with most blogs', () =>
    expect(mostBlogs(blogsList)).to.deep.equal({ author: 'Robert C. Martin', blogs: 3 }));
});
