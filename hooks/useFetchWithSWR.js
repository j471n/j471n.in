import useSWR from "swr";

// fetcher to fetch the data
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useFetchWithSWR(url) {
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

