import MetaData from "@components/MetaData";
import PageTop from "@components/PageTop";
import utilities from "@content/utilitiesData";
import Link from "next/link";
import AnimatedText from "@components/FramerMotion/AnimatedText";
import {
  FadeContainer,
  opacityVariant,
  popUp,
  popUpFromBottomForText,
} from "@content/FramerMotionVariants";
import { motion } from "framer-motion";
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";
import pageMeta from "@content/meta";
import { UtilityType } from "@lib/types";

export default function Utilities() {
  return (
    <>
      <MetaData
        title={pageMeta.utilities.title}
        description={utilities.description}
        previewImage={pageMeta.utilities.image}
        keywords={pageMeta.utilities.keywords}
      />

      <section className="pageTop font-inter">
        <PageTop pageTitle={utilities.title}>{utilities.description}</PageTop>

        <div className="flex flex-col gap-14">
          {utilities.data.map((utility, index) => (
            <UtilitySection key={index} utility={utility} />
          ))}
        </div>

        <AnimatedText variants={opacityVariant} className="mt-12 -mb-10">
          Last Update on{" "}
          <span className="font-semibold">{utilities.lastUpdate}</span>
        </AnimatedText>
      </section>
    </>
  );
}

function UtilitySection({ utility }: { utility: UtilityType }) {
  return (
    <AnimatedDiv
      variants={FadeContainer}
      className="!w-full  selection:bg-blue-300 dark:selection:bg-blue-900 dark:selection:text-gray-400 dark:text-neutral-200 font-medium"
    >
      <motion.h2
        variants={popUpFromBottomForText}
        className="mb-4 text-2xl font-bold sm:text-3xl font-barlow"
      >
        {utility.title}
      </motion.h2>

      <AnimatedDiv
        variants={FadeContainer}
        className="grid grid-cols-3 gap-3 mt-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
      >
        {utility.data.map((item) => {
          const Icon = item.Icon;
          return (
            <motion.div key={item.name} variants={popUp}>
              <Link
                title={item.name + " - " + item.description}
                rel="noopener noreferrer"
                target="_blank"
                href={item.link}
                className="relative flex flex-col gap-3 items-center justify-center bg-white dark:bg-darkSecondary shadow dark:shadow-md p-8  border border-transparent hover:border-gray-400 dark:hover:border-neutral-600 rounded-md transition-all lg:hover:!scale-125 active:!scale-90 hover:z-10 hover:shadow-lg hover:origin-center text-gray-700 hover:text-black dark:text-gray-300/80 dark:hover:text-white"
              >
                {/* @ts-ignore */}
                <Icon className="utilities-svg" />
                <p className="absolute bottom-3 text-[10px] select-none">
                  {item.name}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </AnimatedDiv>
    </AnimatedDiv>
  );
}
