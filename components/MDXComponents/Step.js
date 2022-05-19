export default function Step({ id, children }) {
  return (
    <div className="flex items-center gap-3 flex-">
      <div className="flex items-center justify-center   bg-gray-300  font-bold dark:border-gray-800 rounded-full p-5 w-10 h-10 g-gray-300 ring dark:bg-darkSecondary text-black dark:text-white ">
        {id}
      </div>
      <div className="text-lg tracking-tight font-semibold text-black dark:text-white flex-grow-0 w-fit">
        {children}
      </div>
    </div>
  );
}
