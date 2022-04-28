import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }) {
  const router = useRouter();

  const pageTransition = {
    hidden: {
      opacity: 0,
      x: 500,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -500,
    },
  };

  return (
    <>
      <TopNavbar />
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.main
          key={router.route}
          variants={pageTransition}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "linear" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ScrollToTopButton />
      <BottomNavbar />
    </>
  );
}
