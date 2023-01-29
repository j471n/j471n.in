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
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        d="M16 0V380.671L258.5 495.5L496 385.055V0M57.5 11.6905H444.526V144.67H67V66.5"
        stroke="currentColor"
        strokeWidth="21.9265"
      />
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        d="M57.5 348.5L260.486 443.645L445 362.5V286.5H67V195.876H456"
        stroke="currentColor"
        strokeWidth="21.9265"
      />
    </svg>
  );
}
