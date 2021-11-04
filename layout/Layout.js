import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function Layout({ children }) {
  return (
    <>
      <TopNavbar />
      <main>{children}</main>
      <ScrollToTopButton />
      <BottomNavbar />
    </>
  );
}
