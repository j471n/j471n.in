import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDarkMode } from "@context/darkModeContext";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { FormInput } from "@lib/types";
import { FiUser, FiMail, FiMessageSquare, FiSend } from "react-icons/fi";

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
          render: "Message sent successfully! 🎉",
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

  return (
    <>
      <motion.form
        ref={formRef}
        initial="hidden"
        animate="visible"
        className="space-y-6"
        onSubmit={sendEmail}
      >
        <div className="p-8 rounded-2xl bg-white dark:bg-darkSecondary border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="space-y-5">
            {/* Name Fields */}
            <div className="grid sm:grid-cols-2 gap-5">
              {/* First Name */}
              <motion.div variants={inputVariants}>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FiUser
                      className={`w-5 h-5 transition-colors ${
                        focusedField === "first_name"
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-400 dark:text-gray-600"
                      }`}
                    />
                  </div>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    onFocus={() => setFocusedField("first_name")}
                    onBlur={() => setFocusedField(null)}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-darkPrimary border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all"
                    placeholder="John"
                    required
                  />
                </div>
              </motion.div>

              {/* Last Name */}
              <motion.div variants={inputVariants}>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FiUser
                      className={`w-5 h-5 transition-colors ${
                        focusedField === "last_name"
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-400 dark:text-gray-600"
                      }`}
                    />
                  </div>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    onFocus={() => setFocusedField("last_name")}
                    onBlur={() => setFocusedField(null)}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-darkPrimary border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all"
                    placeholder="Doe"
                    required
                  />
                </div>
              </motion.div>
            </div>

            {/* Email */}
            <motion.div variants={inputVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiMail
                    className={`w-5 h-5 transition-colors ${
                      focusedField === "email"
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400 dark:text-gray-600"
                    }`}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-darkPrimary border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
            </motion.div>

            {/* Subject */}
            <motion.div variants={inputVariants}>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Subject
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiMessageSquare
                    className={`w-5 h-5 transition-colors ${
                      focusedField === "subject"
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400 dark:text-gray-600"
                    }`}
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-darkPrimary border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all"
                  placeholder="Project Discussion"
                  required
                />
              </div>
            </motion.div>

            {/* Message */}
            <motion.div variants={inputVariants}>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className="block w-full px-4 py-3 bg-gray-50 dark:bg-darkPrimary border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all resize-none"
                placeholder="Tell me about your project or idea..."
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={inputVariants}>
              <button
                ref={sendButtonRef}
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-6 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold text-base hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
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
                          className="animate-spin h-5 w-5"
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
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
                        <FiSend className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>

                {/* Hover Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Privacy Note */}
        <motion.p
          variants={inputVariants}
          className="text-sm text-center text-gray-500 dark:text-gray-500"
        >
          Your information is safe and will never be shared with third parties.
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
