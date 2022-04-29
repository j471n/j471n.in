import { motion } from "framer-motion";
import Link from "next/link";

export default function SocialIcon({ Icon, title, url }) {
  return (
    <Link href={url} passHref>
      <motion.a
        // initial="hidden"
        // whileInView="visible"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        aria-label={title}
      >
        <Icon className="icon" title={title} />
      </motion.a>
    </Link>
  );
}
