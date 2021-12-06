import Link from "next/link";

export default function BottomNavLink({ Icon, info, href }) {
  return (
    <Link href={href}>
      <div
        className={`relative flex flex-col ${
          info.active ? "dark:text-purple-400" : "dark:text-gray-400"
        } justify-center items-center ${
          info.active && "text-purple-600 w-auto animate-wiggle"
        }`}
      >
        <Icon
          className={`bottom_nav_icon ${
            info.active && " transform duration-150"
          }`}
        />
        <p className="text-[10px] left-0 right-0  font-semibold text-center -bottom-1 uppercase">
          {info.title}
        </p>
      </div>
    </Link>
  );
}
