import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";

export default function Layout({ children }) {
  return (
    <>
      <TopNavbar />
      <main>{children}</main>
      <BottomNavbar />
    </>
  );
}
