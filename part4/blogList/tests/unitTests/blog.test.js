import { createRequire } from 'module';
import { totalLikes } from '../../utils/testing.js';

const require = createRequire(import.meta.url);
const data = require('./data.json');
const allPosts = data.posts;

console.table(allPosts); // Logging for debugging

describe('Total likes', () => {
  test('When list has only one post, equals the likes of that post', () => {
    const likesInFirstPost = totalLikes(allPosts[0]);
    expect(likesInFirstPost).toBe(7);
  });

  test('Sum of all likes is accurate', () => {
    const likesAllPosts = totalLikes(allPosts);
    expect(likesAllPosts).toBe(41);
  });
});
