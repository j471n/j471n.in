import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineLoading,
} from "react-icons/ai";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";
import { FaDev, FaPaypal } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { SiCodepen, SiBuymeacoffee } from "react-icons/si";
import SocialIcon from "../SocialIcon";
import Metadata from "../MetaData";
import { motion } from "framer-motion";
import {
  fromBottomVariant,
  fromLeftVariant,
  fromRightVariant,
  fromTopVariant,
  headingFromLeft,
  inputSlideAnimation,
  popUpFromBottomForText,
} from "../../content/FramerMotionVariants";
import AnimatedText from "../FramerMotion/AnimatedText";
import AnimatedHeading from "../FramerMotion/AnimatedHeading";
import AnimatedInput from "../FramerMotion/AnimatedInput";
import AnimatedTextArea from "../FramerMotion/AnimatedTextArea";
import AnimatedButton from "../FramerMotion/AnimatedButton";
import useDarkMode from "../../hooks/useDarkmode";
import AnimatedDiv from "../FramerMotion/AnimatedDiv";

// initial State of the form
const initialFormState = {
  to_name: "Jatin Sharma",
  from_name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact({ socialMedia }) {
  const [emailInfo, setEmailInfo] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const { darkMode } = useDarkMode();

  function sendEmail(e) {
    e.preventDefault();

    setLoading(true);
    emailjs
      .send(
        process.env.NEXT_PUBLIC_YOUR_SERVICE_ID,
        process.env.NEXT_PUBLIC_YOUR_TEMPLATE_ID,
        emailInfo,
        process.env.NEXT_PUBLIC_YOUR_USER_ID
      )
      .then((res) => {
        console.log("Email Sent Successfully");
        setLoading(false);
        setEmailInfo(initialFormState);
        toast.success("Message Sent ✌");
      })
      .catch((err) => {
        console.log(err.text);
        setLoading(false);
        toast.error("😢 " + err.text);
      });
  }

  return (
    <div className="dark:bg-darkPrimary">
      {/* Get in touch top section */}
      <section className="w-full-width text-center pt-6 dark:bg-darkPrimary dark:text-white">
        <AnimatedHeading
          variants={popUpFromBottomForText}
          className="font-bold text-4xl"
          infinity={true}
        >
          Get in touch
        </AnimatedHeading>

        <AnimatedText
          variants={popUpFromBottomForText}
          infinity={true}
          className="px-4 py-2 font-medium text-slate-400"
        >
          Have a little something, something you wanna talk about? Please feel
          free to get in touch anytime, whether for work or to just Hi 🙋‍♂️.
        </AnimatedText>
      </section>

      {/* Wrapper Container */}
      <section className="flex flex-col lg:flex-row w-full mx-auto px-5 dark:bg-darkPrimary dark:text-white lg:pb-10">
        {/* Left Contact form section */}
        <div className="w-full mx-auto mt-10">
          <AnimatedHeading
            variants={popUpFromBottomForText}
            infinity={true}
            className="text-2xl font-bold w-full text-center my-2"
          >
            Connect with me
          </AnimatedHeading>

          <form
            className="w-full flex flex-col items-center max-w-sm mx-auto dark:text-gray-300"
            onSubmit={sendEmail}
          >
            <AnimatedInput
              variants={inputSlideAnimation}
              infinity={true}
              className="contact_field"
              value={emailInfo.from_name}
              type="text"
              name="from_name"
              placeholder="Name"
              required
              onChange={(e) =>
                setEmailInfo({
                  ...emailInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <AnimatedInput
              variants={inputSlideAnimation}
              infinity={true}
              className="contact_field"
              value={emailInfo.email}
              type="email"
              name="email"
              placeholder="example@gmail.com"
              required
              onChange={(e) =>
                setEmailInfo({
                  ...emailInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <AnimatedInput
              variants={inputSlideAnimation}
              infinity={true}
              className="contact_field"
              value={emailInfo.subject}
              type="text"
              name="subject"
              placeholder="Subject"
              required
              onChange={(e) =>
                setEmailInfo({
                  ...emailInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <AnimatedTextArea
              variants={inputSlideAnimation}
              infinity={true}
              className="contact_field min-h-[100px] resize-y"
              name="message"
              value={emailInfo.message}
              placeholder="Message"
              required
              onChange={(e) =>
                setEmailInfo({
                  ...emailInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <AnimatedButton
              variants={inputSlideAnimation}
              infinity={true}
              className="w-full max-w-sm p-3 border-none rounded-md bg-purple-700 text-white font-semibold mt-4 cursor-pointer transform duration-150 active:scale-95 disabled:opacity-50 disabled:transform-none disabled:cursor-wait"
              type="submit"
              disabled={loading}
            >
              <div className="relative w-full flex items-center justify-center">
                <p
                  className={
                    loading ? "inline-flex animate-spin mr-3" : "hidden"
                  }
                >
                  <AiOutlineLoading className="font-bold text-2xl" />
                </p>
                <p>{loading ? "Sending..." : "Send"}</p>
              </div>
            </AnimatedButton>
          </form>
        </div>
        {/* Right Other contact methods */}
        <div className="w-full mx-auto mt-10 lg:border-l-4 lg:dark:border-zinc-400 flex flex-col justify-center items-center">
          <AnimatedHeading
            variants={popUpFromBottomForText}
            infinity={true}
            className="text-lg sm:text-2xl font-bold my-2"
          >
            Connect with me on Social Media
          </AnimatedHeading>

          {/* Social Media Container */}
          <AnimatedDiv
            variants={fromRightVariant}
            infinity={true}
            className="flex flex-wrap gap-2 sm:gap-4 items-center py-4 dark:text-gray-100 select-none"
          >
            <SocialIcon
              Icon={AiOutlineInstagram}
              title="Instagram"
              url={socialMedia?.instagram}
            />
            <SocialIcon
              Icon={AiOutlineTwitter}
              title="Twitter"
              url={socialMedia.twitter}
            />
            <SocialIcon
              Icon={BsFacebook}
              title="Facebook"
              url={socialMedia.facebook}
            />
            <SocialIcon
              Icon={BsGithub}
              title="Github"
              url={socialMedia.github}
            />
            <SocialIcon
              Icon={BsLinkedin}
              title="LinkedIn"
              url={socialMedia.linkedIn}
            />
            <SocialIcon
              Icon={HiMail}
              title="Instagram"
              url={socialMedia.mailto}
            />
            <SocialIcon
              Icon={SiCodepen}
              title="Codepen"
              url={socialMedia.codepen}
            />
            <SocialIcon
              Icon={FaDev}
              title="Instagram"
              url={socialMedia.devTo}
            />
          </AnimatedDiv>
          {/* Support Me */}
          <div className="pb-24 lg:pb-0">
            <AnimatedHeading
              variants={popUpFromBottomForText}
              infinity={true}
              className="text-lg sm:text-2xl font-bold my-2"
            >
              Support me 💪
            </AnimatedHeading>

            <AnimatedDiv
              variants={fromRightVariant}
              infinity={true}
              className="flex items-center justify-center space-x-4 my-6"
            >
              {/* buy me a coffee */}

              <SocialIcon
                Icon={SiBuymeacoffee}
                title="Buy me a coffee"
                url="https://www.buymeacoffee.com/j471n"
              />

              {/* PayPal Link */}
              <SocialIcon
                Icon={FaPaypal}
                title="PayPal"
                url="https://www.paypal.com/paypalme/j47in"
              />
            </AnimatedDiv>
          </div>
        </div>
      </section>
      <ToastContainer theme={darkMode ? "dark" : "colored"} />
    </div>
  );
}

// export async function getStaticProps() {
//   const socialMedia = getSocialMedia();
//   return {
//     props: {
//       socialMedia,
//     },
//   };
// }
