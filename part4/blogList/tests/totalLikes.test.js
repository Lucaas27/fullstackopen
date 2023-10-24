import { expect } from 'chai';
import { totalLikes } from '../utils/for_testing.js';
import { blogsList, listWithOneBlog } from './dataJSON.js';

describe('total likes', () => {
  it('of empty list is zero', () => expect(totalLikes([])).to.equal(0));
  it('returns the total likes of a list with one single blog', () =>
    expect(totalLikes(listWithOneBlog)).to.equal(5));
  it('of a bigger list is calculated right', () => expect(totalLikes(blogsList)).to.equal(36));
});
