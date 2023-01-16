import {
  fromLeftVariant,
  opacityVariant,
} from "../content/FramerMotionVariants";
import AnimatedHeading from "./FramerMotion/AnimatedHeading";
import AnimatedText from "./FramerMotion/AnimatedText";

export default function PageTop({
  pageTitle,
  headingClass,
  containerClass,
  children,
}: {
  pageTitle: string;
  headingClass?: string;
  containerClass?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`w-full flex flex-col gap-3 py-5 select-none mb-10 ${containerClass}`}
    >
      <AnimatedHeading
        variants={fromLeftVariant}
        className={`text-4xl  md:text-5xl font-bold text-neutral-900 dark:text-neutral-200 ${headingClass}`}
      >
        {pageTitle}
      </AnimatedHeading>
      <AnimatedText
        variants={opacityVariant}
        className="text-lg text-gray-600 dark:text-gray-400"
      >
        {children}
      </AnimatedText>
    </div>
  );
}
