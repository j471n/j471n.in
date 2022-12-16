import React, { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDarkMode } from "../../context/darkModeContext";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  FadeContainer,
  mobileNavItemSideways,
} from "../../content/FramerMotionVariants";
import Ripples from "react-ripples";
import { useRef } from "react";
import { FormInput } from "@lib/types";

// initial State of the form
const initialFormState: FormInput = {
  to_name: "Jatin Sharma",
  first_name: "",
  last_name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Form() {
  const [emailInfo, setEmailInfo] = useState(initialFormState);
  const { isDarkMode } = useDarkMode();
  const sendButtonRef = useRef<HTMLButtonElement>(null!);

  function sendEmail(e: FormEvent) {
    e.preventDefault();
    // Making submit button disable
    sendButtonRef.current.setAttribute("disabled", "true");

    // Creating a toast
    const toastId = toast.loading("Processing ⌛");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_YOUR_SERVICE_ID!,
        process.env.NEXT_PUBLIC_YOUR_TEMPLATE_ID!,
        emailInfo,
        process.env.NEXT_PUBLIC_YOUR_USER_ID
      )
      .then((res) => {
        setEmailInfo(initialFormState);
        toast.update(toastId, {
          render: "Message Sent ✌",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        sendButtonRef.current.removeAttribute("disabled");
      })
      .catch((err) => {
        toast.update(toastId, {
          render: "😢 " + err.text,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        sendButtonRef.current.removeAttribute("disabled");
      });
  }

  function validateForm() {
    for (const key in emailInfo) {
      if (emailInfo[key as keyof FormInput] === "") return false;
    }
    return true;
  }

  function submitFormOnEnter(event: React.KeyboardEvent) {
    event;
    if (
      (event.code === "ControlLeft" || event.code === "ControlRight") &&
      event.ctrlKey
    ) {
      if (validateForm()) {
        return sendEmail(event);
      }
      toast.error("Looks like you have not filled the form");
    }
  }

  return (
    <>
      <motion.form
        initial="hidden"
        whileInView="visible"
        variants={FadeContainer}
        viewport={{ once: true }}
        className="w-full flex flex-col items-center max-w-xl mx-auto my-10 dark:text-gray-300"
        onSubmit={sendEmail}
        onKeyDown={submitFormOnEnter}
      >
        {/* First Name And Last Name */}
        <div className="w-full grid grid-cols-2 gap-6">
          <motion.div
            variants={mobileNavItemSideways}
            className="relative z-0 w-full mb-6 group"
          >
            <input
              type="text"
              name="first_name"
              id="floating_first_name"
              className="block py-2 mt-2 px-0 w-full text-sm text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
              value={emailInfo.first_name}
              onChange={(e) =>
                setEmailInfo({
                  ...emailInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-slate-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </motion.div>
          <motion.div
            variants={mobileNavItemSideways}
            className="relative z-0 w-full mb-6 group"
          >
            <input
              type="text"
              name="last_name"
              id="floating_last_name"
              className="block py-2 mt-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
              value={emailInfo.last_name}
              onChange={(e) =>
                setEmailInfo({
                  ...emailInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-slate-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </motion.div>
        </div>
        <motion.div
          variants={mobileNavItemSideways}
          className="relative z-0 w-full mb-6 group"
        >
          <input
            type="email"
            name="email"
            id="floating_email"
            className="block py-2 mt-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:dark:border-white focus:border-black peer"
            placeholder=" "
            required
            value={emailInfo.email}
            onChange={(e) =>
              setEmailInfo({
                ...emailInfo,
                [e.target.name]: e.target.value,
              })
            }
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-slate-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </motion.div>
        <motion.div
          variants={mobileNavItemSideways}
          className="relative z-0 w-full mb-6 group"
        >
          <input
            type="subject"
            name="subject"
            id="floating_subject"
            className="block py-2 mt-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            required
            value={emailInfo.subject}
            onChange={(e) =>
              setEmailInfo({
                ...emailInfo,
                [e.target.name]: e.target.value,
              })
            }
          />
          <label
            htmlFor="floating_subject"
            className="peer-focus:font-medium absolute text-sm text-slate-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Subject
          </label>
        </motion.div>
        <motion.div
          variants={mobileNavItemSideways}
          className="relative z-0 w-full mb-6 group"
        >
          <textarea
            name="message"
            id="floating_message"
            className="block py-2 mt-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0  peer min-h-[100px] resize-y focus:border-black"
            placeholder=" "
            required
            value={emailInfo.message}
            onChange={(e) =>
              setEmailInfo({
                ...emailInfo,
                [e.target.name]: e.target.value,
              })
            }
          />
          <label
            htmlFor="floating_message"
            className="peer-focus:font-medium absolute text-sm text-slate-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Message
          </label>
        </motion.div>

        <motion.div
          variants={mobileNavItemSideways}
          className="w-full sm:max-w-sm rounded-lg overflow-hidden "
        >
          <Ripples
            className="flex w-full justify-center"
            color="rgba(225, 225,225,0.2)"
          >
            <button
              ref={sendButtonRef}
              type="submit"
              className="text-white bg-neutral-800  dark:bg-darkSecondary font-medium rounded-lg text-sm w-full px-4 py-3 text-center relative overflow-hidden transition duration-300 outline-none active:scale-95 disabled:opacity-50 disabled:active:scale-100"
            >
              Send
            </button>
          </Ripples>
        </motion.div>
      </motion.form>
      <ToastContainer
        theme={isDarkMode ? "dark" : "light"}
        style={{ zIndex: 1000 }}
      />
    </>
  );
}