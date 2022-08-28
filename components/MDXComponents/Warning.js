export default function Warning({ text, title, children }) {
  return (
    <div className="border-l-4 border-yellow-700 dark:border-yellow-500 bg-yellow-100 dark:bg-yellow-900 p-6 my-4 w-full">
      <div className="text-2xl font-medium leading-tight mb-2 flex items-center gap-2 text-yellow-700 dark:text-yellow-500">
        <svg
          aria-hidden="true"
          dataicon="exclamation-triangle"
          className="w-6 h-6 mr-2 fill-current"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
          ></path>
        </svg>
        {title || "Warning"}
      </div>
      <p className="mt-4 text-yellow-700/80 dark:text-yellow-400/50">
        {text || children}
      </p>
    </div>
  );
}
