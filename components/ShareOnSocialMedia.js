import { BsThreeDots } from "react-icons/bs";

// import { ShareSocial } from "react-share-social";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,

  // icons for sharing
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

import useShare from "../hooks/useShare";

export default function ShareOnSocialMedia({
  className,
  title,
  url,
  summary,
  body,
  subject,
  handleShare,
}) {
  const { isShareSupported } = useShare();
  return (
    <div className={className}>
      <FacebookShareButton quote={title} url={url}>
        <FacebookIcon size={30} round />
      </FacebookShareButton>
      <TwitterShareButton title={title} url={url}>
        <TwitterIcon size={30} round />
      </TwitterShareButton>
      <LinkedinShareButton
        title={title}
        summary={summary}
        url={url}
        source={url}
      >
        <LinkedinIcon size={30} round />
      </LinkedinShareButton>
      <WhatsappShareButton title={title} url={url}>
        <WhatsappIcon size={30} round />
      </WhatsappShareButton>
      <EmailShareButton subject={subject} body={body} url={url}>
        <EmailIcon size={30} round />
      </EmailShareButton>
      {isShareSupported && (
        <BsThreeDots
          className="bg-gray-100 cursor-pointer text-3xl rounded-full p-1 clickable_button"
          onClick={handleShare}
        />
      )}
    </div>
  );
}
