import Link from "next/link";
import { motion } from "framer-motion";

const bottomNavVariant = {
  hidden: { y: 50 },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
    },
  },
};

export default function BottomNavLink({ Icon, active, href, title }) {
  return (
    <Link href={href} passHref>
      <div
        className={`relative flex flex-col flex-grow transition-all  ${
          active ? "dark:text-purple-400" : "dark:text-gray-400"
        } justify-center items-center ${active && "text-purple-600 w-auto"}`}
      >
        <motion.span
          initial="hidden"
          animate="visible"
          variants={bottomNavVariant}
          className="flex flex-col justify-center items-center mt-[3px]"
        >
          <Icon className="bottom_nav_icon" />
          <p className="text-[10px] font-semibold text-center uppercase">
            {title}
          </p>
        </motion.span>
      </div>
    </Link>
  );
}
