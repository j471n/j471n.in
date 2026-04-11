import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import {
  FiMail,
  FiMessageSquare,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Contact() {
  return (
    <div
      id="contact"
      className="relative py-16 sm:py-24 lg:py-32 bg-white dark:bg-darkPrimary overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-100 dark:bg-darkSecondary rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-100 dark:bg-darkSecondary rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-darkSecondary text-sm font-medium text-gray-700 dark:text-gray-300 mb-6"
            >
              <FiMessageSquare className="w-4 h-4" />
              <span>Let's Work Together</span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-6"
            >
              Get in Touch
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              Have a project in mind or just want to chat? I'm always open to
              discussing new opportunities, creative ideas, or partnerships.
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form - Takes 2 columns on desktop */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 order-2 lg:order-1"
            >
              <ContactForm />
            </motion.div>

            {/* Sidebar - Info Cards - Takes 1 column on desktop */}
            <motion.div
              variants={itemVariants}
              className="space-y-6 order-1 lg:order-2"
            >
              {/* Contact Info Card */}
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-darkSecondary border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-darkPrimary">
                    <FiMail className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Email
                  </h3>
                </div>
                <a
                  href="mailto:j471n.in@gmail.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors block break-all"
                >
                  j471n.in@gmail.com
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  Response within 24 hours
                </p>
              </div>

              {/* Location & Availability */}
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-darkSecondary border border-gray-200 dark:border-gray-800">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FiMapPin className="w-5 h-5 text-gray-700 dark:text-gray-300 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Location
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Based in India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiClock className="w-5 h-5 text-gray-700 dark:text-gray-300 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Availability
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Open to new projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-darkSecondary border border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                  Connect
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/j471n"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-white dark:bg-darkPrimary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="GitHub"
                  >
                    <FiGithub className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="https://linkedin.com/in/j471n"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-white dark:bg-darkPrimary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="https://twitter.com/j471n_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-white dark:bg-darkPrimary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Twitter"
                  >
                    <FiTwitter className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </a>
                </div>
              </div>

              {/* Services List */}
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-darkSecondary border border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                  Services
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mt-1.5 flex-shrink-0"></span>
                    <span>Web Development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mt-1.5 flex-shrink-0"></span>
                    <span>Technical Consulting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mt-1.5 flex-shrink-0"></span>
                    <span>Code Review</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mt-1.5 flex-shrink-0"></span>
                    <span>Mentorship</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
