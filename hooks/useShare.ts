import { useEffect, useState } from "react";
function useShare() {
  // state for share supports
  const [isShareSupported, setIsShareSupported] = useState(false);

  // checking if that exist or not
  useEffect(() => {
    setIsShareSupported(() => ("share" in navigator ? true : false));
  }, []);

  return { isShareSupported };
}

export default useShare;
