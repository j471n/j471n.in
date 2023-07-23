import { ITMDBData } from "./interface";

const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  },
};

async function fetchData(url: string): Promise<ITMDBData[]> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error while fetching TMDB data: " + response.statusText);
    }
    const data = await response.json();
    return (data?.results ?? data?.items) as ITMDBData[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Fetch TMDB data from multiple endpoints and combine the results.
 */
export async function fetchTMDBData(): Promise<ITMDBData[]> {
  try {
    const accountId = process.env.TMDB_ACCOUNT_ID;

    // Call all three APIs concurrently using Promise.all
    const [recentRatedMovies, recentRatedTvShows, watchingData] =
      await Promise.all([
        fetchData(
          `https://api.themoviedb.org/3/account/${accountId}/rated/movies?sort_by=created_at.desc`
        ),
        fetchData(
          `https://api.themoviedb.org/3/account/${accountId}/rated/tv?sort_by=created_at.desc`
        ),
        fetchData(`https://api.themoviedb.org/3/list/8261150`),
      ]);

    // Combine the results from the APIs
    const combinedData = [...recentRatedMovies, ...recentRatedTvShows];

    // Sort the combined data based on release date for movies and first air date for TV shows
    combinedData.sort((a, b) => {
      if ("release_date" in a && "release_date" in b) {
        return (
          new Date(b?.release_date as string).getTime() -
          new Date(a?.release_date as string).getTime()
        );
      } else if ("first_air_date" in a && "first_air_date" in b) {
        return (
          new Date(b?.first_air_date as string).getTime() -
          new Date(a?.first_air_date as string).getTime()
        );
      } else {
        return 0;
      }
    });

    // Store only 5 elements in the array
    const sortedAndLimitedData = combinedData.slice(0, 5);

    return [...watchingData.reverse(), ...sortedAndLimitedData];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
