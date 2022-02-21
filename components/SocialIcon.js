// import Link from "next/link";

export default function SocialIcon({ Icon, title, url }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Icon className="icon" title={title} />
    </a>
  );
}
