import QRCode from "react-qr-code";
import useWindowLocation from "@hooks/useWindowLocation";
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useDarkMode } from "@context/darkModeContext";

export default function QRCodeContainer({
  showQR,
  setShowQR,
}: {
  showQR: boolean;
  setShowQR: (value: boolean) => void;
}) {
  const { currentURL } = useWindowLocation();
  const { isDarkMode } = useDarkMode();

  function downloadQRCode() {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg!);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  }

  return (
    <AnimatePresence>
      {showQR && (
        <>
          {/* Backdrop */}
          <motion.div
            key="qr-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
            className="fixed inset-0 bg-black/50 z-[9999]"
          />

          {/* Panel */}
          <motion.div
            key="qr-panel"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="fixed inset-0 flex items-center justify-center z-[10000] pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-xs bg-white dark:bg-darkPrimary border border-gray-200 dark:border-neutral-700">
              {/* Header */}
              <div className="h-0.5 w-full bg-gray-900 dark:bg-white" />
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-neutral-700">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-400 dark:text-gray-500 block leading-none mb-1">
                    Share
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Scan QR Code
                  </span>
                </div>
                <button
                  onClick={() => setShowQR(false)}
                  aria-label="Close"
                  className="w-8 h-8 flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-900 dark:hover:border-white transition-colors"
                >
                  <MdClose className="w-4 h-4" />
                </button>
              </div>

              {/* QR code */}
              <div className="p-6 flex justify-center border-b border-gray-200 dark:border-neutral-700">
                <QRCode
                  id="QRCode"
                  value={currentURL}
                  size={180}
                  bgColor={isDarkMode ? "#1a1d1f" : "#ffffff"}
                  fgColor={isDarkMode ? "#ffffff" : "#111827"}
                />
              </div>

              {/* URL + download */}
              <div className="px-5 py-4 space-y-3">
                <p className="font-mono text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500 truncate">
                  {currentURL}
                </p>
                <button
                  onClick={downloadQRCode}
                  className="w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono text-[10px] tracking-[0.35em] uppercase hover:opacity-80 transition-opacity"
                >
                  Download PNG
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
