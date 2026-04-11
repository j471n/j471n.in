import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDarkMode } from "@context/darkModeContext";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { FormInput } from "@lib/types";
import siteConfig from "@content/siteConfig";
import { FiSend } from "react-icons/fi";

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Form() {
  const { isDarkMode } = useDarkMode();
  const sendButtonRef = useRef<HTMLButtonElement>(null!);
  const formRef = useRef<HTMLFormElement>(null!);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { contact } = siteConfig;

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
      to_name: siteConfig.person.name,
      first_name: target.first_name.value.trim(),
      last_name: target.last_name.value.trim(),
      email: target.email.value.trim(),
      subject: target.subject.value.trim(),
      message: target.message.value.trim(),
    };

    if (!validateForm(emailData) && !toast.isActive(FailToastId))
      return toast.error("Please fill in all required fields", {
        toastId: FailToastId,
      });

    setIsSubmitting(true);
    sendButtonRef.current.setAttribute("disabled", "true");

    const toastId = toast.loading("Sending your message...");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_YOUR_SERVICE_ID!,
        process.env.NEXT_PUBLIC_YOUR_TEMPLATE_ID!,
        emailData!,
        process.env.NEXT_PUBLIC_YOUR_USER_ID,
      )
      .then(() => {
        formRef.current.reset();
        toast.update(toastId, {
          render: "Message sent successfully!",
          type: "success",
          isLoading: false,
          autoClose: 4000,
        });
        setIsSubmitting(false);
        sendButtonRef.current.removeAttribute("disabled");
      })
      .catch(() => {
        toast.update(toastId, {
          render: "Failed to send message. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
        setIsSubmitting(false);
        sendButtonRef.current.removeAttribute("disabled");
      });
  }

  function validateForm(data: FormInput): boolean {
    for (const key in data) {
      if (data[key as keyof FormInput] === "") return false;
    }
    return true;
  }

  /* Shared field class — borderless top/sides, only bottom rule */
  const fieldCls = (name: string) =>
    `block w-full bg-transparent border-0 border-b py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none transition-colors duration-200 ${
      focusedField === name
        ? "border-gray-900 dark:border-white"
        : "border-gray-300 dark:border-gray-700"
    }`;

  return (
    <>
      <motion.form
        ref={formRef}
        initial="hidden"
        animate="visible"
        className="space-y-0"
        onSubmit={sendEmail}
      >
        {/* Name row */}
        <div className="grid sm:grid-cols-2 gap-x-10">
          {/* First Name */}
          <motion.div variants={inputVariants} className="py-2">
            <label
              htmlFor="first_name"
              className="block font-mono text-[9px] tracking-[0.4em] uppercase text-gray-500 dark:text-gray-500 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              onFocus={() => setFocusedField("first_name")}
              onBlur={() => setFocusedField(null)}
              className={fieldCls("first_name")}
              placeholder="John"
              required
            />
          </motion.div>

          {/* Last Name */}
          <motion.div variants={inputVariants} className="py-2">
            <label
              htmlFor="last_name"
              className="block font-mono text-[9px] tracking-[0.4em] uppercase text-gray-500 dark:text-gray-500 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              onFocus={() => setFocusedField("last_name")}
              onBlur={() => setFocusedField(null)}
              className={fieldCls("last_name")}
              placeholder="Doe"
              required
            />
          </motion.div>
        </div>

        {/* Email */}
        <motion.div variants={inputVariants} className="py-2">
          <label
            htmlFor="email"
            className="block font-mono text-[9px] tracking-[0.4em] uppercase text-gray-500 dark:text-gray-500 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            className={fieldCls("email")}
            placeholder="john.doe@example.com"
            required
          />
        </motion.div>

        {/* Subject */}
        <motion.div variants={inputVariants} className="py-2">
          <label
            htmlFor="subject"
            className="block font-mono text-[9px] tracking-[0.4em] uppercase text-gray-500 dark:text-gray-500 mb-1"
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            onFocus={() => setFocusedField("subject")}
            onBlur={() => setFocusedField(null)}
            className={fieldCls("subject")}
            placeholder="Project Discussion"
            required
          />
        </motion.div>

        {/* Message */}
        <motion.div variants={inputVariants} className="py-2">
          <label
            htmlFor="message"
            className="block font-mono text-[9px] tracking-[0.4em] uppercase text-gray-500 dark:text-gray-500 mb-1"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            className={`${fieldCls("message")} resize-none`}
            placeholder="Tell me about your project or idea..."
            required
          />
        </motion.div>

        {/* Submit */}
        <motion.div variants={inputVariants} className="pt-8">
          <button
            ref={sendButtonRef}
            type="submit"
            disabled={isSubmitting}
            className="group relative inline-flex items-center gap-3 px-7 py-3 border border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold text-sm tracking-wide overflow-hidden hover:text-white dark:hover:text-gray-900 focus:outline-none transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {/* fill layer */}
            <span className="absolute inset-0 bg-gray-900 dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            <span className="relative z-10 flex items-center gap-2">
              <AnimatePresence>
                {isSubmitting ? (
                  <motion.span
                    key="submitting"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </motion.span>
                ) : (
                  <motion.span
                    key="send"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    Send Message
                    <FiSend className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </button>
        </motion.div>

        {/* Privacy note */}
        <motion.p
          variants={inputVariants}
          className="pt-5 font-mono text-[9px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-600"
        >
          {contact.privacyNote}
        </motion.p>
      </motion.form>

      <ToastContainer
        theme={isDarkMode ? "dark" : "light"}
        position="bottom-right"
        style={{ zIndex: 1000 }}
        toastClassName="!rounded-xl !shadow-2xl"
      />
    </>
  );
}
