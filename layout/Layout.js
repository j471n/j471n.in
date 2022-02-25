import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Footer from "../components/Footer";
export default function Layout({ children }) {
  return (
    <>
      <TopNavbar />
      <main
        className="bg-white dark:bg-darkPrimary"
        style={{ paddingTop: "68px" }}
      >
        {children}
      </main>
      <ScrollToTopButton />
      <Footer />
      <BottomNavbar />
    </>
  );
}
