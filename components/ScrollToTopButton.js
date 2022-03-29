import { IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  function scrollEvent() {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

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
          className="fixed bottom-[10%] sm:bottom-[7%] right-0 m-5 sm:m-0 z-50"
        >
          <IoIosArrowUp className="bg-black dark:bg-gray-200 dark:text-darkPrimary text-white rounded-md shadow-lg text-[50px] md:mr-10" />
        </button>
      )}
    </>
  );
}
