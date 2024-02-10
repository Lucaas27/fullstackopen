const dummy = posts => 1;

const totalLikes = posts => {
  posts = Array.isArray(posts) ? posts : [posts];
  const total = posts.reduce((likesPreviousPosts, { likes: likesCurrPost }) => {
    return likesPreviousPosts + likesCurrPost;
  }, 0);

  return total;
};

const favouritePost = posts => {
  posts = Array.isArray(posts) ? posts : [posts];

  const favourite = posts.reduce((favouritePost, currPost) => {
    return favouritePost.likes >= currPost.likes ? favouritePost : currPost;
  }, {});

  return favourite;
};

const mostPosts = posts => {
  posts = Array.isArray(posts) ? posts : [posts];

  const authors = posts.reduce((authors, currPost) => {
    const AuthorIsInTheArray = authors.find(authors => authors.name === currPost.author);

    if (AuthorIsInTheArray) {
      AuthorIsInTheArray.posts++; // Update the posts count
    } else {
      authors.push({ name: currPost.author, posts: 1 }); // Add author into array
    }

    return authors;
  }, []);

  const author = authors.filter(author => {
    return author.posts === Math.max(...authors.map(author => author.posts));
  });

  console.log(author);

  return author[0];
};

export { dummy, totalLikes, favouritePost, mostPosts };
