import certificatesData from "../../content/certificatesData";
import { popUpFromBottomForText } from "../../content/FramerMotionVariants";
import { HomeHeading } from "../../pages";
import AnimatedDiv from "../FramerMotion/AnimatedDiv";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import AnimatedText from "../FramerMotion/AnimatedText";
import AnimatedButton from "../FramerMotion/AnimatedButton";

export default function CertificationSection() {
  return (
    <section>
      <HomeHeading title="Certification 📜" />
      <div className="home-section-container no-scrollbar">
        {certificatesData.map((certificate) => {
          if (!certificate.pinned) return;
          return (
            <div
              key={certificate.id}
              className="home-content-section no-scrollbar flex flex-col  cursor-auto hover-slide-animation"
            >
              <AnimatedDiv
                variants={popUpFromBottomForText}
                className="flex items-center justify-between mb-3 text-slate-400"
              >
                <p className="font-bold capitalize text-xs sm:text-sm">
                  {certificate.issuedBy.orgName}
                </p>
                <p className="font-medium text-xs sm:text-sm">
                  {certificate.issuedDate}
                </p>
              </AnimatedDiv>
              <div className="flex items-center gap-4">
                <AnimatedDiv
                  variants={popUpFromBottomForText}
                  className="flex relative"
                >
                  <Image
                    width={40}
                    height={40}
                    src={certificate.issuedBy.orgLogo}
                    alt={certificate.issuedBy.orgName}
                    quality={50}
                    objectFit="contain"
                    layout="fixed"
                    placeholder="blur"
                    blurDataURL={certificate.issuedBy.orgLogo}
                  />
                </AnimatedDiv>
                <AnimatedText
                  variants={popUpFromBottomForText}
                  className="capitalize font-semibold text-sm md:text-base border-purple-600 text-slate-600 dark:text-slate-300"
                >
                  {certificate.title}
                </AnimatedText>
              </div>

              <AnimatedButton
                variants={popUpFromBottomForText}
                className="px-3 py-2 mt-2  bg-purple-700 !text-white text-center font-semibold outline-none w-full mx-auto flex items-center text-xs justify-center space-x-3 rounded-md auto-row"
                onClick={() => window.open(certificate.urls.pdfURL)}
              >
                <MdVerified className="text-xl text-white" />
                <p>View Certification</p>
              </AnimatedButton>
            </div>
          );
        })}
        {/* <ExploreMoreButton link="/certificates" /> */}
      </div>
    </section>
  );
}
