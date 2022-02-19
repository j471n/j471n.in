import { FiArrowRightCircle } from "react-icons/fi";

export default function ExploreMoreButton({ link }) {
  return (
    <div className="flex flex-col group items-center self-center relative snap-center">
      <div
        className="flex ring hover:ring-purple-300 rounded-full m-3 cursor-pointer clickable_button relative"
        onClick={() => window.open(link, "_self")}
      >
        <FiArrowRightCircle className="text-5xl text-purple-600" />
      </div>
      <p className="hidden -bottom-2 absolute text-center group-hover:inline-flex text-[10px] font-semibold select-none">
        Explore More
      </p>
    </div>
  );
}
