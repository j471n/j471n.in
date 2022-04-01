import { popUpFromBottomForText } from "../../content/FramerMotionVariants";
import AnimatedHeading from "../FramerMotion/AnimatedHeading";
import AnimatedText from "../FramerMotion/AnimatedText";
import { motion } from "framer-motion";
import AnimatedDiv from "../FramerMotion/AnimatedDiv";

export default function QuestionAndAnswer({ question, answer }) {
  if (!question || !answer) return null;
  return (
    <div>
      <AnimatedDiv
        variants={popUpFromBottomForText}
        infinity={true}
        className="inline-block p-2 sm:p-3 text-white bg-purple-700 rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </AnimatedDiv>

      <div>
        <AnimatedHeading
          variants={popUpFromBottomForText}
          infinity={true}
          className="text-base sm:text-lg font-semibold text-gray-600 dark:text-slate-200"
        >
          {question}
        </AnimatedHeading>

        <AnimatedText
          variants={popUpFromBottomForText}
          infinity={true}
          className="mt-2 text-sm text-gray-400 dark:text-slate-400"
        >
          {answer}
        </AnimatedText>
      </div>
    </div>
  );
}
