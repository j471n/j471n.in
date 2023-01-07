/**
 * Makes a request to the specified URL and returns the response as JSON.
 */
export default async function fetcher(url: string) {
  return fetch(url).then((r) => r.json());
}
