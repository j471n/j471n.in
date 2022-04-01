import { headingFromLeft } from "../../content/FramerMotionVariants";
import AnimatedHeading from "../FramerMotion/AnimatedHeading";
import QuestionAndAnswer from "./QuestionAndAnswer";

function FAQ({ faqs = [] }) {
  return (
    <section className="bg-white dark:bg-darkPrimary">
      <div className="px-8 md:px-36 py-8 mx-auto">
        <AnimatedHeading
          variants={headingFromLeft}
          className="text-2xl font-bold text-center sm:text-left lg:text-center text-gray-800 lg:text-4xl dark:text-white"
        >
          Frequently asked questions
        </AnimatedHeading>

        <div className="grid grid-cols-1 gap-8 mt-8 lg:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {faqs.map((faq, index) => {
            return (
              <>
                {faq.question && faq.answer && (
                  <QuestionAndAnswer
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                )}
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
