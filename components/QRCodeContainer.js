import QRCode from "react-qr-code";
import useWindowLocation from "@hooks/useWindowLocation";
import { CgClose } from "react-icons/cg";
import { AnimatePresence, motion } from "framer-motion";
import { useDarkMode } from "@context/darkModeContext";

export default function QRCodeContainer({ showQR, setShowQR }) {
  const { currentURL } = useWindowLocation();
  const { isDarkMode } = useDarkMode();
  return (
    <>
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            variants={{
              hidden: { y: "100vh", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
              },
            }}
            transition={{
              type: "spring",
              bounce: 0.15,
            }}
            className="bg-white dark:bg-darkSecondary fixed inset-0  grid place-items-center lock_scroll"
            style={{ zIndex: 100 }}
          >
            <div className="absolute right-5 top-5 text-black dark:text-white">
              <button className="outline-none" onClick={() => setShowQR(false)}>
                <CgClose className="w-8 h-8" />
              </button>
            </div>
            <div className="text-black dark:text-white">
              <h1 className="font-semibold text-xl mb-2">Share this page</h1>
              <QRCode
                value={currentURL}
                bgColor={isDarkMode ? "#25282a" : "white"}
                fgColor={isDarkMode ? "white" : "#25282a"}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
