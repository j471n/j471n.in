import { ReactNode, useRef, useState } from "react";
import { MdCheck, MdContentCopy } from "react-icons/md";

const Pre = ({
  children,
  "data-theme": dataTheme,
}: {
  children?: ReactNode;
  "data-theme"?: string;
}) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    if (textInput.current !== null) {
      setCopied(true);
      navigator.clipboard.writeText(textInput.current.textContent!);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="relative mb-3 -mt-[14px]"
      data-theme={dataTheme}
      ref={textInput}
    >
      <button
        aria-label="Copy code"
        type="button"
        onClick={onCopy}
        className={`absolute top-2 right-2 z-10 flex items-center gap-1.5 px-2.5 py-1.5 border font-mono text-[10px] tracking-[0.3em] uppercase transition-colors ${
          copied
            ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
            : "bg-transparent border-gray-400 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 hover:border-gray-900 dark:hover:border-white"
        }`}
      >
        {copied ? (
          <MdCheck className="w-3 h-3 flex-shrink-0" />
        ) : (
          <MdContentCopy className="w-3 h-3 flex-shrink-0" />
        )}
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </button>

      <pre className="blog-pre !my-0 !w-full !p-0 !py-3 border border-gray-200 dark:border-neutral-700">
        {children}
      </pre>
    </div>
  );
};

export default Pre;
