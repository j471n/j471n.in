import {
  buttonsLinearVariant,
  fromRightVariant,
  smallTextFromBottom,
} from "../../content/FramerMotionVariants";
import AnimatedButton from "../FramerMotion/AnimatedButton";
import AnimatedDiv from "../FramerMotion/AnimatedDiv";
import AnimatedHeading from "../FramerMotion/AnimatedHeading";
import TopContainer from "./TopContainer";
import Image from "next/image";

export default function PageCover({
  pageTitle,
  buttonText,
  imgSrc,
  titleClass,
  buttonClass,
  imgClass,
  containerClass,
}) {
  return (
    <TopContainer className={containerClass}>
      <div className="w-full md:w-1/2 grid place-items-center">
        <div className="text-center md:text-left my-7 md:my-0">
          <AnimatedHeading
            variants={smallTextFromBottom}
            infinity={true}
            className={`capitalize font-bold text-3xl sm:text-4xl lg:text-6xl 3xl:text-8xl font-inter ${titleClass}`}
          >
            {pageTitle}
          </AnimatedHeading>

          {buttonText && (
            <div className="flex gap-4 mt-4 md:mt-4 justify-center md:justify-start text-xs sm:text-base">
              <AnimatedButton
                variants={buttonsLinearVariant}
                infinity={true}
                className={`px-2 py-1 transition-all font-medium relative hover:text-white z-10 before:-z-10 before:absolute before:inset-0 before:w-0.5 before:transition-all before:hover:w-full  select-none text-xs sm:text-base text-gray-800 dark:text-gray-200 ${buttonClass}`}
                onClick={() => (window.location.href = "#view")}
              >
                <span> {buttonText}</span>
              </AnimatedButton>
            </div>
          )}
        </div>
      </div>

      <AnimatedDiv
        variants={fromRightVariant}
        infinity={true}
        className="relative grid place-items-center place-self-center xs:w-3/5 md:w-1/2 lg:!w-1/3"
      >
        <Image
          className={imgClass}
          src={imgSrc}
          width={1300}
          height={1000}
          alt={pageTitle}
          priority={true}
        ></Image>
      </AnimatedDiv>
    </TopContainer>
  );
}
