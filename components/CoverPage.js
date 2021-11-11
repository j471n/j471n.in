import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function CoverPage({
  title,
  mainHeading,
  className,
  childrenClass,
}) {
  const typingSpan = useRef(null);
  useEffect(() => {
    var options = {
      strings: [mainHeading],
      typeSpeed: 50,
      backSpeed: 50,

      loop: true,
    };
    new Typed(typingSpan.current, options);
  }, []);

  return (
    <div
      className={`${className} h-[90vh] md:h-screen lg:h-[110vh] 2xl:h-[120vh] min-w-screen bg-gradient-to-r to-[#5ae7e2] from-[#7c3aed] relative border-none `}
    >
      <div
        className={`text-[50px] ml-4 sm:ml-0 -mt-30 md:-mt-60 font-black ${childrenClass}`}
      >
        <p className="text-white">{title}</p>
        <span className="text-black font-[20px]" ref={typingSpan} />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute -bottom-1 text-white"
      >
        <path
          fill="currentColor"
          fill-opacity="1"
          d="M0,160L16,149.3C32,139,64,117,96,96C128,75,160,53,192,69.3C224,85,256,139,288,181.3C320,224,352,256,384,240C416,224,448,160,480,160C512,160,544,224,576,213.3C608,203,640,117,672,85.3C704,53,736,75,768,90.7C800,107,832,117,864,106.7C896,96,928,64,960,85.3C992,107,1024,181,1056,224C1088,267,1120,277,1152,250.7C1184,224,1216,160,1248,112C1280,64,1312,32,1344,32C1376,32,1408,64,1424,80L1440,96L1440,320L1424,320C1408,320,1376,320,1344,320C1312,320,1280,320,1248,320C1216,320,1184,320,1152,320C1120,320,1088,320,1056,320C1024,320,992,320,960,320C928,320,896,320,864,320C832,320,800,320,768,320C736,320,704,320,672,320C640,320,608,320,576,320C544,320,512,320,480,320C448,320,416,320,384,320C352,320,320,320,288,320C256,320,224,320,192,320C160,320,128,320,96,320C64,320,32,320,16,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
