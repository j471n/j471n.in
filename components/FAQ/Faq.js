import { HomeHeading } from "../../pages";
import QuestionAndAnswer from "./QuestionAndAnswer";

function FAQ({ faqs = [] }) {
  return (
    <section className="mx-5">
      <div className="py-8 mx-auto">
        <HomeHeading title="Frequently asked questions" />

        <div className="grid grid-cols-1 gap-5 mt-8 lg:mt-16 sm:grid-cols-2">
          {faqs.map((faq) => {
            if (!faq.question && !faq.answer) return null;
            return (
              <QuestionAndAnswer
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
