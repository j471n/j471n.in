import BackToTop from "react-back-to-top-button";
import { IoIosArrowUp } from "react-icons/io";

export default function ScrollToTopButton() {
  return (
    <BackToTop
      showOnScrollUp
      showAt={100}
      speed={1500}
      easing="easeInOutQuint"
      style={{
        position: "fixed",
        bottom: "10%",
        zIndex: "1000",
        margin: "20px",
      }}
    >
      <IoIosArrowUp className="bg-black dark:bg-gray-200 dark:text-darkPrimary text-white rounded-md shadow-lg text-[50px] md:mr-10" />
    </BackToTop>
  );
}
