import { BsFileEarmarkCodeFill } from "react-icons/bs";

export default function CodeTitle({ title }) {
  return (
    <div className="bg-[#1f2937] rounded-tl-md rounded-tr-md p-3 text-gray-200 flex items-center justify-between  font-code !mt-4 overflow-x-scroll xs:overflow-auto border border-b border-transparent border-b-gray-50/50 dark:border-gray-50/50">
      <div className="flex items-center gap-2">
        <BsFileEarmarkCodeFill className="flex items-center w-4 h-4" />
        <p className="!my-0 font-[600] text-sm">{title}</p>
      </div>
    </div>
  );
}
