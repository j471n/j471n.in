import QuestionAndAnswer from "./QuestionAndAnswer";

function FAQ({ faqs = [] }) {
  return (
    <section class="bg-white dark:bg-darkPrimary">
      <div class="px-8 md:px-36 py-8 mx-auto">
        <h1 class="text-2xl font-bold text-center sm:text-left lg:text-center text-gray-800 lg:text-4xl dark:text-white">
          Frequently asked questions
        </h1>

        <div class="grid grid-cols-1 gap-8 mt-8 lg:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {faqs.map((faq) => {
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
