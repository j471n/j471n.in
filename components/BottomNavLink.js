import Link from "next/link";

export default function BottomNavLink({ Icon, active, href, title }) {
  return (
    <Link href={href}>
      <div
        className={`relative flex flex-col flex-grow transition-all duration-300 ${
          active ? "dark:text-purple-400" : "dark:text-gray-400"
        } justify-center items-center ${active && "text-purple-600 w-auto"}`}
      >
        <Icon className="bottom_nav_icon" />
        <p className="text-[10px] font-semibold text-center uppercase">
          {title}
        </p>
      </div>
    </Link>
  );
}
