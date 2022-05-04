const tempData = {
  login: "j471n",
  id: 55713505,
  node_id: "MDQ6VXNlcjU1NzEzNTA1",
  avatar_url: "https://avatars.githubusercontent.com/u/55713505?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/j471n",
  html_url: "https://github.com/j471n",
  followers_url: "https://api.github.com/users/j471n/followers",
  following_url: "https://api.github.com/users/j471n/following{/other_user}",
  gists_url: "https://api.github.com/users/j471n/gists{/gist_id}",
  starred_url: "https://api.github.com/users/j471n/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/j471n/subscriptions",
  organizations_url: "https://api.github.com/users/j471n/orgs",
  repos_url: "https://api.github.com/users/j471n/repos",
  events_url: "https://api.github.com/users/j471n/events{/privacy}",
  received_events_url: "https://api.github.com/users/j471n/received_events",
  type: "User",
  site_admin: false,
  name: "Jatin Sharma",
  company: null,
  blog: "http://bit.ly/3Jzd35A",
  location: "India",
  email: null,
  hireable: true,
  bio: "React Developer | Python | C++ |\r\n",
  twitter_username: null,
  public_repos: 39,
  public_gists: 9,
  followers: 4,
  following: 1,
  created_at: "2019-09-23T18:37:14Z",
  updated_at: "2022-03-25T16:08:21Z",
};

// its for /api/stats/github
export async function fetchGithub() {
  const fake = true;
  if (fake) return tempData;
  return fetch("https://api.github.com/users/j471n").then((res) => res.json());
}

// its for getting temporary old data
export function getOldStats() {
  return tempData;
}
