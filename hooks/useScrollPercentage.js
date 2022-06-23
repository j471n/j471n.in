import { useEffect, useState, useCallback } from "react";
export default function useScrollPercentage() {
  // fifteen
  const [scrollPercentage, setScrollPercentage] = useState(0);
  function getScrollPercent() {
    var h = document.documentElement,
      b = document.body,
      st = "scrollTop",
      sh = "scrollHeight";
    return parseInt(
      ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
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
