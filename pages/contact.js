import Image from "next/image";
import React, { useState } from "react";
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
import SocialIcon from "../components/SocialIcon";
import { getSocialMedia } from "../lib/dataFetch";
import Metadata from "../components/MetaData";
import { motion, useAnimation } from "framer-motion";
import { popUp, popUpFromBottomForText } from "../content/FramerMotionVariants";
import { useInView } from "react-intersection-observer";
import AnimatedText from "../components/FramerMotion/AnimatedText";

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
  const [ref, inView] = useInView();
  const controls = useAnimation();

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
    <div className="min-h-screen dark:bg-darkSecondary">
      <Metadata title="Contact 🤙" />

      {/* Get in touch top section */}
      <section className="w-full-width text-center pt-6 dark:bg-darkSecondary dark:text-white">
        <h1 className="font-bold text-4xl">Get in touch</h1>

        <AnimatedText
          variants={popUpFromBottomForText}
          className="px-4 py-2 font-medium dark:text-gray-300"
        >
          Have a little something, something you wanna talk about? Please feel
          free to get in touch anytime, whether for work or to just Hi 🙋‍♂️.
        </AnimatedText>
      </section>

      {/* Wrapper Container */}
      <section className="flex flex-col lg:flex-row w-full mx-auto px-5 dark:bg-darkSecondary dark:text-white lg:pb-10">
        {/* Left Contact form section */}
        <div className="w-full mx-auto mt-10">
          <h2 className="text-2xl font-bold w-full text-center my-2">
            Connect with me
          </h2>

          <motion.form
            ref={ref}
            initial="hidden"
            animate={inView && "visible"}
            variants={popUp}
            className="w-full flex flex-col items-center max-w-sm mx-auto dark:text-gray-300"
            onSubmit={sendEmail}
          >
            <input
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
            <input
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
            <input
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
            <textarea
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
            ></textarea>
            <button
              className="w-full max-w-sm p-3 border-none rounded-md bg-purple-400 dark:text-darkPrimary font-semibold mt-4 cursor-pointer transform duration-150 active:scale-95 disabled:opacity-50 disabled:transform-none disabled:cursor-wait"
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
            </button>
          </motion.form>
        </div>
        {/* Right Other contact methods */}
        <div className="w-full mx-auto mt-10 lg:border-l-4 lg:dark:border-zinc-400 flex flex-col justify-center items-center">
          <h2 className="text-lg sm:text-2xl font-bold my-2">
            Connect with me on Social Media
          </h2>

          {/* Social Media Container */}
          <motion.div className="flex flex-wrap gap-2 sm:gap-4 items-center py-4 dark:text-gray-100">
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
          </motion.div>
          {/* Support Me */}
          <div className="pb-24 lg:pb-0">
            <h2 className="text-lg sm:text-2xl font-bold my-2">
              Support me 💪
            </h2>

            <div className="flex items-center justify-center space-x-4 my-6">
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
            </div>
          </div>
        </div>
      </section>
      <ToastContainer theme="dark" />
    </div>
  );
}

export async function getStaticProps() {
  const socialMedia = getSocialMedia();
  return {
    props: {
      socialMedia,
    },
  };
}
