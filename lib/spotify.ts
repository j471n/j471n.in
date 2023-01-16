import { SpotifyAccessToken } from "./types";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

/**
 * Makes a request to the Spotify API to obtain a new access token using a refresh token.
 */
const getAccessToken = async (): Promise<SpotifyAccessToken> => {
  // Make a POST request to the Spotify API to request a new access token
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      // Set the Authorization header with the client ID and client secret encoded in base64
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    // Set the body of the request to include the refresh token and grant type
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token!,
    }),
  });

  // Return the JSON response from the API
  return response.json();
};

/**
 * Makes a request to the Spotify API to retrieve the user's top tracks.
 */
export const topTracks = async (): Promise<Response> => {
  // Obtain an access token
  const { access_token }: { access_token: string } = await getAccessToken();

  // Make a request to the Spotify API to retrieve the user's top tracks in last 4 weeks
  return fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term",
    {
      headers: {
        // Set the Authorization header with the access token
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

/**
 * Makes a request to the Spotify API to retrieve the user's top artists.
 */
export const topArtists = async () => {
  // Obtain an access token
  const { access_token } = await getAccessToken();

  // Make a request to the Spotify API to retrieve the user's top artists in last 4 weeks
  return fetch(
    "https://api.spotify.com/v1/me/top/artists?limit=5&time_range=short_term",
    {
      headers: {
        // Set the Authorization header with the access token
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

/**
 * Makes a request to the Spotify API to retrieve the currently playing song for the user.
 */
export const currentlyPlayingSong = async () => {
  // Obtain an access token
  const { access_token } = await getAccessToken();

  // Make a request to the Spotify API to retrieve the currently playing song for the user 
  return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      // Set the Authorization header with the access token
      Authorization: `Bearer ${access_token}`,
    },
  });
};
