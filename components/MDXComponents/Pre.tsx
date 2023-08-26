import { ReactNode, useRef, useState } from "react";

const Pre = ({ children }: { children?: ReactNode }) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    if (textInput.current !== null) {
      setCopied(true);
      navigator.clipboard.writeText(textInput.current.textContent!);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="relative mb-3 -mt-[14px]" ref={textInput}>
      <button
        aria-label="Copy code"
        type="button"
        className={`!z-40 absolute right-2 top-5 h-8 w-8 rounded border-2 bg-transparent p-1  ${
          copied
            ? "border-green-400 focus:border-green-400 focus:outline-none"
            : "border-darkSecondary dark:border-gray-200/60 "
        }`}
        onClick={onCopy}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          className={
            copied
              ? "text-green-400"
              : "text-darkSecondary dark:text-gray-200/60"
          }
        >
          {copied ? (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </>
          ) : (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </>
          )}
        </svg>
      </button>

      <pre className="blog-pre !my-0 !rounded-md  !w-full !p-0 !py-3 !pt-6 border border-black dark:border-gray-200/60">
        {children}
      </pre>
    </div>
  );
};

export default Pre;
