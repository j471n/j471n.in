import TopNavbar from "../components/TopNavbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <>
      <TopNavbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
