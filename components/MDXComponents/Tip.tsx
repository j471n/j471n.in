export default function Tip({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center w-full gap-2 px-5 pt-4 my-5 bg-yellow-100 rounded-md dark:bg-neutral-800">
      <div className="absolute top-0 left-0 px-4 py-0 font-bold text-black uppercase bg-yellow-400 font-barlow rounded-tl-md rounded-br-md dark:bg-yellow-500">
        Tip {id && `#${id}`}
      </div>
      {children}
    </div>
  );
}
