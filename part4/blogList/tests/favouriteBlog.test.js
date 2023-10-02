import { expect } from 'chai';
import { blogsList } from './dataJSON.js';
import { favouriteBlog } from '../utils/for_testing.js';

describe('favourite blog', () => {
  it('returns "Canonical string reduction" as the blog with most number of likes', () =>
    expect(favouriteBlog(blogsList)).to.deep.equal(blogsList[2]));
});
