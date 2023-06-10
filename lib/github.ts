import {
  IGitHubProfileResponse,
  IGitHubRepositoriesAPIResponse,
} from "./interface";
import { GithubRepo } from "./types";

const headers = new Headers({
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
});

// its for /api/stats/github
export async function fetchGithub(): Promise<IGitHubProfileResponse> {
  const requestOptions: RequestInit = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(
      "https://api.github.com/users/j471n",
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Error fetching GitHub data: " + response.statusText);
    }
    const data = await response.json(); // Await the JSON promise
    return data as IGitHubProfileResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* Retrieves the number of stars and forks for the user's repositories on GitHub. */
export async function getGithubStarsAndForks() {
  try {
    // Fetch user's repositories from the GitHub API
    const res = await fetch(
      "https://api.github.com/users/j471n/repos?per_page=100",
      { headers }
    );
    const userRepos: IGitHubRepositoriesAPIResponse[] = await res.json();

    // filter those repos that are not forked
    const mineRepos: GithubRepo[] = userRepos.filter(
      (repo: GithubRepo) => !repo.fork
    );

    // Calculate the total number of stars for the user's repositories
    const githubStars = mineRepos.reduce(
      (accumulator: number, repository: GithubRepo) => {
        return accumulator + repository["stargazers_count"];
      },
      0
    );

    // Calculate the total number of forks for the user's repositories
    const forks = mineRepos.reduce(
      (accumulator: number, repository: GithubRepo) => {
        return accumulator + repository["forks_count"];
      },
      0
    );

    return { githubStars, forks };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
