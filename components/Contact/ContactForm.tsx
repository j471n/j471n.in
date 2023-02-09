import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDarkMode } from "@context/darkModeContext";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  FadeContainer,
  mobileNavItemSideways,
} from "@content/FramerMotionVariants";
import Ripples from "react-ripples";
import { useRef } from "react";
import { FormInput } from "@lib/types";

export default function Form() {
  const { isDarkMode } = useDarkMode();
  const sendButtonRef = useRef<HTMLButtonElement>(null!);
  const formRef = useRef<HTMLFormElement>(null!);

  const FailToastId: string = "failed";

  function sendEmail(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      first_name: { value: string };
      last_name: { value: string };
      email: { value: string };
      subject: { value: string };
      message: { value: string };
    };

    const emailData = {
      to_name: "Jatin Sharma",
      first_name: target.first_name.value.trim(),
      last_name: target.last_name.value.trim(),
      email: target.email.value.trim(),
      subject: target.subject.value.trim(),
      message: target.message.value.trim(),
    };

    if (!validateForm(emailData) && !toast.isActive(FailToastId))
      return toast.error("Looks like you have not filled the form", {
        toastId: FailToastId,
      });

    // Making submit button disable
    sendButtonRef.current.setAttribute("disabled", "true");

    // Creating a loading toast
    const toastId = toast.loading("Processing ⌛");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_YOUR_SERVICE_ID!,
        process.env.NEXT_PUBLIC_YOUR_TEMPLATE_ID!,
        emailData!,
        process.env.NEXT_PUBLIC_YOUR_USER_ID
      )
      .then(() => {
        formRef.current.reset();
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

  function validateForm(data: FormInput): boolean {
    for (const key in data) {
      if (data[key as keyof FormInput] === "") return false;
    }
    return true;
  }

  return (
    <>
      <motion.form
        ref={formRef}
        initial="hidden"
        whileInView="visible"
        variants={FadeContainer}
        viewport={{ once: true }}
        className="flex flex-col items-center w-full max-w-xl mx-auto my-10 dark:text-gray-300"
        onSubmit={sendEmail}
      >
        {/* First Name And Last Name */}
        <div className="grid w-full grid-cols-2 gap-6">
          <motion.div
            variants={mobileNavItemSideways}
            className="relative z-0 w-full mb-6 group"
          >
            <input
              type="text"
              name="first_name"
              id="floating_first_name"
              className="block w-full px-0 py-2 mt-2 text-sm bg-transparent border-0 border-b-2 appearance-none text-white-900 border-slate-500 dark:text-white dark:border-gray-400 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              className="block w-full px-0 py-2 mt-2 text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-slate-500 dark:text-white dark:border-gray-400 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            className="block w-full px-0 py-2 mt-2 text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-slate-500 dark:text-white dark:border-gray-400 focus:outline-none focus:ring-0 focus:dark:border-white focus:border-black peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            className="block w-full px-0 py-2 mt-2 text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-slate-500 dark:text-white dark:border-gray-400 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_subject"
            className="peer-focus:font-medium absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            className="block py-2 mt-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-500 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-white focus:outline-none focus:ring-0  peer min-h-[100px] resize-y focus:border-black"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_message"
            className="peer-focus:font-medium absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Message
          </label>
        </motion.div>

        <motion.div
          variants={mobileNavItemSideways}
          className="w-full overflow-hidden rounded-lg shadow-lg sm:max-w-sm"
        >
          <Ripples
            className="flex justify-center w-full"
            color="rgba(225, 225,225,0.2)"
          >
            <button
              ref={sendButtonRef}
              type="submit"
              className="relative w-full px-4 py-3 overflow-hidden text-sm font-medium text-center text-white transition duration-300 rounded-lg outline-none bg-neutral-800 dark:bg-darkSecondary active:scale-95 disabled:opacity-50 disabled:active:scale-100"
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
