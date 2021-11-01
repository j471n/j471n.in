import Link from "next/link";

export default function SocialIcon({ Icon, title, url }) {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <Icon className="icon" title={title} />
    </Link>
  );
}
