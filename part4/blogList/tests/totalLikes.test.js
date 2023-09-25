import { totalLikes } from '../utils/for_testing.js';
import { blogsList, listWithOneBlog } from './dataJSON.js';

describe('total likes', () => {
  test('of empty list is zero', () => expect(totalLikes([])).toBe(0));
  test('when list has only one blog, equals the likes of that', () =>
    expect(totalLikes(listWithOneBlog)).toBe(5));
  test('of a bigger list is calculated right', () => expect(totalLikes(blogsList)).toBe(36));
});
