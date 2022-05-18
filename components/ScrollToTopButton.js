import { IoIosArrowUp } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

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
    if (window.pageYOffset > 300 && getScrollPercent() < 95) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [scrollEvent]);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll To Top"
          className="fixed bottom-8 right-8 md:bottom-[20px] md:right-[20px]  z-40 print:hidden"
        >
          <IoIosArrowUp className="bg-black dark:bg-gray-200 dark:text-darkPrimary text-white rounded-md shadow-lg text-[50px] md:mr-10" />
        </button>
      )}
    </>
  );
}
