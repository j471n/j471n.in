const PER_PAGE = 1000;
const DEV_API = process.env.NEXT_PUBLIC_BLOGS_API;

const getPageOfFollowers = async (page) => {
  const perPageFollowers = await fetch(
    `https://dev.to/api/followers/users?per_page=${PER_PAGE}&page=${page}`,
    {
      headers: {
        api_key: DEV_API,
      },
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));

  return perPageFollowers.length;
};

export const allFollowers = async () => {
  let numReturned = PER_PAGE;
  let page = 1;
  var totalFollowers = 0;

  while (numReturned === PER_PAGE) {
    const followers = await getPageOfFollowers(page);
    totalFollowers += followers;
    numReturned = followers;
    page++;
  }
  return totalFollowers;
};

const getPageOfPosts = async (page) => {
  const perPagePosts = await fetch(
    `https://dev.to/api/articles/me?per_page=${PER_PAGE}&page=${page}`,
    {
      headers: {
        api_key: DEV_API,
      },
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));

  return perPagePosts;
};

export const allPosts = async () => {
  let numReturned = PER_PAGE;
  let page = 1;
  var totalPosts = [];

  while (numReturned === PER_PAGE) {
    const posts = await getPageOfPosts(page);
    totalPosts.push(...posts);
    numReturned = posts.length;
    page++;
  }
  return totalPosts;
};
