const dummy = blogs => 1;

const totalLikes = posts => {
  posts = Array.isArray(posts) ? posts : [posts];
  const total = posts.reduce((acc, currPost) => {
    const likesCurrPost = currPost.likes;
    return acc + likesCurrPost;
  }, 0);

  return total;
};

export { dummy, totalLikes };
