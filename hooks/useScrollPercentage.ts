import { useEffect, useState, useCallback } from "react";
export default function useScrollPercentage() {
  // fifteen
  const [scrollPercentage, setScrollPercentage] = useState(0);
  function getScrollPercent(): number {
    var h = document.documentElement;
    var b = document.body;

    return (
      ((h.scrollTop || b.scrollTop) /
        ((h.scrollHeight || b.scrollHeight) - h.clientHeight)) *
      100
    );
  }

  const scrollEvent = useCallback(() => {
    setScrollPercentage(getScrollPercent());
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [scrollEvent]);

  return scrollPercentage;
}
