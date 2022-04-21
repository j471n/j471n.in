export default function TopContainer({ className, children }) {
  return (
    <div
      className={`relative w-screen h-screen flex flex-col-reverse gap-10 md:gap-0 md:flex-row justify-center bg-gradient-to-b from-gray-400 dark:from-[#444] dark:to-darkPrimary to-white ${className}`}
    >
      {children}
    </div>
  );
}
