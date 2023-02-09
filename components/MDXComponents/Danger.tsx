type Props = { title?: string; text: string };

export default function Danger({ title, text }: Props) {
  return (
    <div className="w-full p-6 my-4 bg-red-100 border-l-4 border-red-700 dark:border-red-500 dark:bg-red-700/30">
      <div className="flex items-center gap-2 mb-2 text-2xl font-medium leading-tight text-red-700 dark:text-red-500">
        <svg
          aria-hidden="true"
          focusable="false"
          data-icon="times-circle"
          className="w-4 h-4 mr-2 fill-current"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
          ></path>
        </svg>
        {title || "Danger"}
      </div>
      <p className="mt-4 text-red-700/80 dark:text-red-400/50">{text}</p>
    </div>
  );
}
