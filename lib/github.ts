import {
  IContributionDay,
  IGitHubProfileResponse,
  IGitHubRepositoriesAPIResponse,
  IUserContributionDetails,
  IWeek,
} from "./interface";

import { GithubRepo } from "./types";
import moment from "moment";

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

export async function getGithubContribution() {
  const now = moment();
  const from = moment(now).subtract(30, "days").utc().toISOString();
  // also include the next day in case our server is behind in time with respect to GitHub
  const to = moment(now).add(1, "days").utc().toISOString();
  const q = {
    query: `
              query userInfo($LOGIN: String!, $FROM: DateTime!, $TO: DateTime!) {
                user(login: $LOGIN) {
                  name
                  contributionsCollection(from: $FROM, to: $TO) {
                    contributionCalendar {
                      weeks {
                        contributionDays {
                          contributionCount
                          date
                        }
                      }
                    }
                  }
                }
              }
            `,
    variables: {
      LOGIN: "j471n",
      FROM: from,
      TO: to,
    },
  };

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(q),
    headers,
  });
  const apiResponse = await response.json();

  console.log("API response: ", apiResponse);

  const userData: IUserContributionDetails = {
    contributions: [],
    name: apiResponse.data.user.name,
  };

  const weeks =
    apiResponse.data.user.contributionsCollection.contributionCalendar.weeks;
  // get day-contribution data
  weeks.map((week: IWeek) =>
    week.contributionDays.map((contributionDay: IContributionDay) => {
      // contributionDay.date = moment(
      //   contributionDay.date,
      //   moment.ISO_8601
      // ).toLocaleString();
      contributionDay.shortDate = moment(contributionDay.date, moment.ISO_8601)
        .date()
        .toString();
      userData.contributions.push(contributionDay);
    })
  );
  return userData;
}
