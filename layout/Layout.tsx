import React, { useState } from "react";

import Footer from "../components/Footer";
import QRCodeContainer from "@components/QRCodeContainer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import SnowfallCanvas from "@components/SnowfallCanvas";
import TopNavbar from "../components/TopNavbar";
import { useDarkMode } from "@context/darkModeContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useDarkMode();
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      {(new Date().getMonth() >= 11 || new Date().getMonth() <= 1) &&
        isDarkMode && <SnowfallCanvas />}

      <TopNavbar />
      <main>{children}</main>
      <Footer setShowQR={setShowQR} showQR={showQR} />
      <ScrollToTopButton />
      <QRCodeContainer showQR={showQR} setShowQR={setShowQR} />
    </>
  );
}
