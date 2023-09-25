import { blogsList } from './dataJSON.js';
import { favouriteBlog } from '../utils/for_testing.js';

describe('favourite blog', () => {
  test('Canonical string reduction had the most number of likes', () =>
    expect(favouriteBlog(blogsList)).toEqual(blogsList[2]));
});
