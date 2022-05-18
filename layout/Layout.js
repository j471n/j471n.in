import TopNavbar from "../components/TopNavbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Footer from "../components/Footer";
import { AnimatePresence } from "framer-motion";

export default function Layout({ children }) {
  return (
    <>
      <TopNavbar />
      <AnimatePresence initial={false}>
        <main>{children}</main>
      </AnimatePresence>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
