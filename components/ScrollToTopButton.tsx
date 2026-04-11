import { IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollPercentage from "@hooks/useScrollPercentage";

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);
  const scrollPercentage = useScrollPercentage();

  useEffect(() => {
    setShowButton(scrollPercentage > 10 && scrollPercentage < 95);
  }, [scrollPercentage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-20 right-6 z-40 w-9 h-9 flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-80 transition-opacity print:hidden"
        >
          <IoIosArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
