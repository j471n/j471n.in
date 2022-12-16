import { IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import useScrollPercentage from "@hooks/useScrollPercentage";

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);
  const scrollPercentage = useScrollPercentage();

  useEffect(() => {
    if (scrollPercentage < 95 && scrollPercentage > 10) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [scrollPercentage]);

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
          className="fixed bottom-20 right-8 md:bottom-[50px] md:right-[20px]  z-40 print:hidden"
        >
          <IoIosArrowUp className="bg-black dark:bg-gray-200 dark:text-darkPrimary text-white rounded-lg shadow-lg text-[45px] md:mr-10" />
        </button>
      )}
    </>
  );
}
