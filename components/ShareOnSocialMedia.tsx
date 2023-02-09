import { BsThreeDots } from "react-icons/bs";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import useShare from "../hooks/useShare";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiCopy, FiLinkedin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { GrFacebookOption, GrTwitter } from "react-icons/gr";

type Props = {
  className: string;
  title: string;
  url: string;
  summary: string;
  cover_image: string;
  children: React.ReactNode;
};

export default function ShareOnSocialMedia({
  className,
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
        .share({
          title: title,
          text: summary,
          url: url,
          files: [file],
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    }
  }

  // copy to clipboard functions
  function copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
      toast.error(
        "Sorry, Your device doesn't supports This feature. Please Change your device ✌️ "
      );
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        toast.success("Link Copied Successfully 🙌");
      },
      function (err) {
        console.error(err);
        toast.success(
          "Something Went wrong I don't know what 🤔 use other methods"
        );
      }
    );
  }

  return (
    <>
      <div className={`${className} transform sm:scale-150 my-5`}>
        <FacebookShareButton quote={title} url={url}>
          <div className="p-2 text-white bg-gray-700 rounded-full">
            <GrFacebookOption className="w-4 h-4" />
          </div>
        </FacebookShareButton>
        <TwitterShareButton title={title} url={url} related={["@j471n_"]}>
          <div className="p-2 text-white bg-gray-700 rounded-full">
            <GrTwitter className="w-4 h-4" />
          </div>
        </TwitterShareButton>
        <LinkedinShareButton
          title={title}
          summary={summary}
          url={url}
          source={url}
        >
          <div className="p-2 text-white bg-gray-700 rounded-full">
            <FiLinkedin className="w-4 h-4 " />
          </div>
        </LinkedinShareButton>
        <WhatsappShareButton title={title} url={url}>
          <div className="bg-gray-700 text-white p-1.5 rounded-full">
            <FaWhatsapp className="w-5 h-5 " />
          </div>
        </WhatsappShareButton>
        <div className="p-2 text-white bg-gray-700 rounded-full cursor-pointer">
          <FiCopy
            className="w-4 h-4 "
            onClick={() => copyTextToClipboard(url)}
          />
        </div>

        {/* children of components */}
        {children}

        {isShareSupported && (
          <div
            className="p-2 text-white bg-gray-700 rounded-full cursor-pointer"
            onClick={handleShare}
          >
            <BsThreeDots className="w-4 h-4" />
          </div>
        )}
      </div>
    </>
  );
}
