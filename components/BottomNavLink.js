import Link from "next/link";

export default function BottomNavLink({ Icon, info, href }) {
  return (
    <Link href={href}>
      <div
        className={`relative flex flex-col transition-all duration-300 ${
          info.active ? "dark:text-purple-400" : "dark:text-gray-400"
        } justify-center items-center ${
          info.active && "text-purple-600 w-auto animate-wiggle"
        }`}
      >
        <Icon className="bottom_nav_icon" />
        <p className="text-[10px] font-semibold text-center uppercase">
          {info.title}
        </p>
      </div>
    </Link>
  );
}
