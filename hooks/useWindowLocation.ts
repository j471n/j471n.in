import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type URL = string;

export default function useWindowLocation() {
  const [currentURL, setCurrentURL] = useState<URL>("");
  const router = useRouter();

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, [router.asPath]);

  return { currentURL };
}
