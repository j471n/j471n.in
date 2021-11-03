import { useEffect, useState } from "react";
function useShare() {
  // state for share supports
  const [isShareSupported, setIsShareSupported] = useState(null);

  // checking if that exist or not
  useEffect(() => {
    setIsShareSupported(() => (window.navigator.share ? true : false));
  }, []);

  return { isShareSupported };
}

export default useShare;
