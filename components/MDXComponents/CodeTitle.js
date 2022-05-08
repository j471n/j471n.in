import { BsFileEarmarkCodeFill } from "react-icons/bs";
export default function CodeTitle({ title }) {
  return (
    <div className="bg-[#1f2937] rounded-tl-md rounded-tr-md p-3 border-b text-gray-200 flex items-center justify-between border font-code border-gray-50/50 !mt-4 overflow-x-scroll sm:overflow-auto">
      <div className="flex items-center gap-2">
        <BsFileEarmarkCodeFill className="flex items-center w-4 h-4" />
        <p className="!my-0 font-[600] text-sm">{title}</p>
      </div>
    </div>
  );
}
