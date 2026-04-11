import "react-toastify/dist/ReactToastify.css";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FiCopy, FiLinkedin } from "react-icons/fi";
import { GrFacebookOption, GrTwitter } from "react-icons/gr";

import { BsThreeDots } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import useShare from "../hooks/useShare";

type Props = {
  className?: string;
  title: string;
  url: string;
  summary: string;
  cover_image: string;
  children?: React.ReactNode;
};

export default function ShareOnSocialMedia({
  title,
  url,
  summary,
  cover_image,
  children,
}: Props) {
  const { isShareSupported } = useShare();

  async function handleShare() {
    const blob = await fetch(cover_image).then((res) => res.blob());
    const file = new File([blob], "image.png", { type: "image/png" });
    if (window.navigator.share) {
      window.navigator
        .share({ title, text: summary, url, files: [file] })
        .catch(console.error);
    }
  }

  function copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
      toast.error("Clipboard not supported on this device.");
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => toast.success("Link copied!"),
      () => toast.error("Failed to copy link."),
    );
  }

  const btnClass =
    "flex items-center gap-1.5 font-mono text-[10px] tracking-[0.3em] uppercase text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-2 border-r border-gray-200 dark:border-gray-800 last:border-r-0";

  return (
    <div className="not-prose flex flex-wrap border border-gray-200 dark:border-gray-800">
      <FacebookShareButton quote={title} url={url} className="contents">
        <span className={btnClass}>
          <GrFacebookOption className="w-3.5 h-3.5" />
          Facebook
        </span>
      </FacebookShareButton>

      <TwitterShareButton
        title={title}
        url={url}
        related={["@j471n_"]}
        className="contents"
      >
        <span className={btnClass}>
          <GrTwitter className="w-3.5 h-3.5" />
          Twitter
        </span>
      </TwitterShareButton>

      <LinkedinShareButton
        title={title}
        summary={summary}
        url={url}
        source={url}
        className="contents"
      >
        <span className={btnClass}>
          <FiLinkedin className="w-3.5 h-3.5" />
          LinkedIn
        </span>
      </LinkedinShareButton>

      <WhatsappShareButton title={title} url={url} className="contents">
        <span className={btnClass}>
          <FaWhatsapp className="w-3.5 h-3.5" />
          WhatsApp
        </span>
      </WhatsappShareButton>

      <button onClick={() => copyTextToClipboard(url)} className={btnClass}>
        <FiCopy className="w-3.5 h-3.5" />
        Copy link
      </button>

      {isShareSupported && (
        <button onClick={handleShare} className={btnClass}>
          <BsThreeDots className="w-3.5 h-3.5" />
          More
        </button>
      )}

      {children}
    </div>
  );
}
