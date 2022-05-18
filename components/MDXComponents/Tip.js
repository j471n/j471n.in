export default function Tip({ id, children }) {
  return (
    <div className="relative w-full px-5 pt-4 flex gap-2 items-center bg-yellow-100 dark:bg-neutral-800 rounded-md my-5">
      <div className="font-barlow font-bold uppercase px-4 py-0 rounded-tl-md rounded-br-md absolute top-0 left-0 bg-yellow-400 dark:bg-yellow-500 text-black">
        Tip {id && `#${id}`}
      </div>
      {children}
    </div>
  );
}
