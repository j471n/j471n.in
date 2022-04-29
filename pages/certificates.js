import AnimatedHeading from "../components/FramerMotion/AnimatedHeading";
import AnimatedText from "../components/FramerMotion/AnimatedText";
import MetaData from "../components/MetaData";
import {
  fromLeftVariant,
  opacityVariant,
  popUpFromBottomForText,
} from "../content/FramerMotionVariants";
import certificatesData from "../content/certificatesData";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedDiv from "../components/FramerMotion/AnimatedDiv";

export default function Certificates() {
  return (
    <>
      <MetaData title="Certificates" />

      <section className="mt-[52px] md:t-[72px] max-w-4xl 2xl:max-w-5xl 3xl:max-w-7xl relative mx-auto mb-20">
        <div className="w-full flex flex-col px-5 py-5 gap-3 select-none mt-20 mb-10">
          <AnimatedHeading
            variants={fromLeftVariant}
            className="text-4xl  md:text-5xl font-bold text-neutral-900 dark:text-neutral-200"
          >
            Certifications
          </AnimatedHeading>
          <AnimatedText
            variants={opacityVariant}
            className="font-medium text-lg text-gray-400"
          >
            I've participated in many contests, courses and test and get
            certified in many skills. You can find the certification below.
          </AnimatedText>
        </div>

        <div className="flex flex-col gap-2 font-inter px-5">
          {certificatesData.map((cer, index) => {
            return (
              <AnimatedDiv
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 lg:hover:bg-neutral-100 dark:lg:hover:bg-darkSecondary p-2 rounded-lg"
                variants={popUpFromBottomForText}
                key={index}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <Image
                      width={40}
                      height={40}
                      src={cer.issuedBy.orgLogo}
                      alt={cer.issuedBy.orgName}
                      quality={50}
                      objectFit="contain"
                      layout="fixed"
                      placeholder="blur"
                      blurDataURL={cer.issuedBy.orgLogo}
                    />
                  </div>
                  <div className="flex flex-col ">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg text-neutral-900 dark:text-neutral-200">
                      {cer.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {cer.issuedBy.orgName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5 text-sm justify-between">
                  <p className="text-gray-500 text-sm">{cer.issuedDate}</p>
                  <Link href={cer.urls.pdfURL} passHref>
                    <motion.a
                      href={cer.urls.pdfURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1 rounded-md bg-neutral-300 transform duration-200 font-medium  active:scale-90"
                    >
                      View
                    </motion.a>
                  </Link>
                </div>
              </AnimatedDiv>
            );
          })}
        </div>
      </section>
    </>
  );
}
