import { BsThreeDots } from "react-icons/bs";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,

  // icons for sharing
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

import useShare from "../hooks/useShare";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiCopy } from "react-icons/fi";

export default function ShareOnSocialMedia({
  className,
  title,
  url,
  summary,
  cover_image,
}) {
  const { isShareSupported } = useShare();

  async function handleShare() {
    const image = await fetch(cover_image || "");
    const blob = await image.blob();
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });
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
  function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      toast.error(
        "Sorry, Your device doesn't supports This feature. Please Change your device ✌️ "
      );
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
        toast.success("Copied Successfully 🙌");
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
        <div className="bg-black text-white w-[30px] h-[30px] grid place-items-center cursor-pointer rounded-full clickable_button">
          <FiCopy
            className=""
            onClick={() => copyTextToClipboard(url)}
          ></FiCopy>
        </div>
        {isShareSupported && (
          <BsThreeDots
            className="bg-gray-400 dark:bg-zinc-500 text-white cursor-pointer text-3xl rounded-full p-1 clickable_button"
            onClick={handleShare}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
}
