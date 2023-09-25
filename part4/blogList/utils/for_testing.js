const dummy = blogs => 1;

const totalLikes = blogs => {
  const likes = blogs.map(blog => blog.likes);
  return likes.reduce((initial, value) => initial + value, 0);
};

const favouriteBlog = blogs =>
  blogs.reduce((mostLiked, blog) => (mostLiked.likes > blog.likes ? mostLiked : blog));

// const likes = blogs.map(blog => blog.likes); // array with all the likes
// const highestAmountLikes = Math.max(...likes); // get the maximum amount of likes
// const BlogsWithMostLikes = blogs.filter(n => n.likes === highestAmountLikes); // filter the blog list and return all the blogs witht he maximum amount of likes
// return BlogsWithMostLikes[0]; // return the first blog with the maximum amount of likes

const mostBlogs = blogs => {
  const blogsByAuthor = blogs.reduce((authors, currAuthor) => {
    const i = authors.findIndex(el => el.author === currAuthor.author);
    if (i === -1) {
      authors.push({ author: currAuthor.author, blogs: 1 });
    } else {
      authors[i].blogs++;
    }
    return authors;
  }, []);

  // const authorWithMostBlogs = blogsByAuthor.reduce((firstOcurrence, currOcurrence) =>
  //   firstOcurrence.blogs > currOcurrence.blogs ? firstOcurrence : currOcurrence,
  // );

  const authorWithMostBlogs = blogsByAuthor.filter(
    author => author.blogs === Math.max(...blogsByAuthor.map(n => n.blogs)),
  )[0];

  return authorWithMostBlogs;
};

const mostLikes = b => {
  const likesByAuthor = b.reduce((blogs, currBlog) => {
    const i = blogs.findIndex(x => x.author === currBlog.author);
    if (i === -1) {
      blogs.push({ author: currBlog.author, likes: currBlog.likes });
    } else {
      blogs[i].likes += currBlog.likes;
    }
    return blogs;
  }, []);

  const mostLikedAuthor = likesByAuthor.filter(
    blog => blog.likes === Math.max(...likesByAuthor.map(y => y.likes)),
  )[0];

  return mostLikedAuthor;
};

export { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
