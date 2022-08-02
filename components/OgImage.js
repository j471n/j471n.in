import Image from "next/image";
import { useDarkMode } from "@context/darkModeContext";
function OgImage({ src, alt, darkSrc }) {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="relative -mt-[35%] sm:-mt-0 md:-ml-[35%] w-full sm:w-1/2 md:w-8/12 shrink-0 rounded-xl overflow-hidden shadow-2xl before:absolute before:inset-0 dark:before:bg-black/20 before:z-10">
      <Image
        title={alt}
        alt={alt}
        src={darkSrc ? (isDarkMode ? darkSrc : src) : src}
        width={1200}
        height={630}
        layout="responsive"
        placeholder="blur"
        objectFit="cover"
        blurDataURL={darkSrc ? (isDarkMode ? darkSrc : src) : src}
        quality={50}
        className="lg:group-hover:scale-110 transition-all duration-300 backdrop-blur-xl"
      />
    </div>
  );
}

export default OgImage;
