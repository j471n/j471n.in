import { motion } from "framer-motion";

export default function Logo({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={512}
      height={512}
      viewBox="0 0 512 512"
      fill="none"
      className={className}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        d="M18 0V380.671L260.5 495.5L498 385.055V0M67 17.5H431V126H85V81"
        stroke="currentColor"
        strokeWidth="35"
      />
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        d="M67.5 327.5L258 416L431.5 341.5V264H84.5V183.5H449"
        stroke="currentColor"
        strokeWidth="35"
      />
    </svg>
  );
}
