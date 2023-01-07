const PER_PAGE: number = 1000;
const DEV_API = process.env.NEXT_PUBLIC_BLOGS_API;

/**
 * Makes a request to the DEV API to retrieve a specific page of followers for the user.
 */
const getPageOfFollowers = async (page: number) => {
  // Make a request to the DEV API to retrieve a specific page of followers
  const perPageFollowers = await fetch(
    `https://dev.to/api/followers/users?per_page=${PER_PAGE}&page=${page}`,
    {
      headers: {
        api_key: DEV_API!,
      },
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));

  return perPageFollowers.length;
};


/**
 * Makes multiple requests to the DEV API to retrieve all of the user's followers.
 */
export const allFollowers = async () => {
  let numReturned = PER_PAGE;
  let page = 1;
  var totalFollowers = 0;

  // Continue making requests to the DEV API until all followers have been retrieved
  while (numReturned === PER_PAGE) {
    const followers = await getPageOfFollowers(page);
    totalFollowers += followers;
    numReturned = followers;
    page++;
  }
  return totalFollowers;
};

/**
 * Makes a request to the DEV API to retrieve a specific page of posts for the user.
 */
const getPageOfPosts = async (page: number) => {
  // Make a request to the DEV API to retrieve a specific page of posts
  const perPagePosts = await fetch(
    `https://dev.to/api/articles/me?per_page=${PER_PAGE}&page=${page}`,
    {
      headers: {
        api_key: DEV_API!,
      },
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));
  return perPagePosts;
};

/**
 * Makes multiple requests to the DEV API to retrieve all of the user's posts.
 */
export const allPosts = async () => {
  let numReturned = PER_PAGE;
  let page = 1;
  var totalPosts = [];

  // Continue making requests to the DEV API until all posts have been retrieved
  while (numReturned === PER_PAGE) {
    const posts = await getPageOfPosts(page);
    totalPosts.push(...posts);
    numReturned = posts.length;
    page++;
  }
  return totalPosts;
};
