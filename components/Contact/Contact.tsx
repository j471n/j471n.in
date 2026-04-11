import React from "react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import siteConfig from "@content/siteConfig";

const infoRows = [
  { label: "Response Time", value: "< 24 hours" },
  { label: "Timezone", value: "IST · UTC +5:30" },
  { label: "Preferred", value: "Email / LinkedIn" },
  { label: "Work Type", value: "Remote / Contract" },
];

export default function Contact() {
  const { contact } = siteConfig;

  return (
    <div id="contact" className="relative py-20 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section number watermark */}
        <div
          className="absolute -right-2 top-6 font-black select-none pointer-events-none leading-none tracking-tighter bg-gradient-to-b from-gray-200 to-gray-50 dark:from-[#232628] dark:to-darkPrimary bg-clip-text text-transparent"
          style={{ fontSize: "clamp(5rem, 16vw, 13rem)" }}
          aria-hidden="true"
        >
          04
        </div>

        {/* ── Header ── */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="space-y-3 max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-5 bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
              <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-400 dark:text-gray-600">
                {contact.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
            >
              {contact.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-base text-gray-600 dark:text-gray-400 border-l-2 border-gray-300 dark:border-gray-700 pl-4 py-0.5"
            >
              {contact.description}
            </motion.p>
          </div>

          {/* Email quick-link */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col items-start lg:items-end gap-1 flex-shrink-0"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400 dark:text-gray-600">
              Or reach me directly
            </span>
            <a
              href={`mailto:${siteConfig.person.email}`}
              className="text-sm font-semibold text-gray-900 dark:text-white hover:underline underline-offset-4 decoration-gray-400 font-mono"
            >
              {siteConfig.person.email}
            </a>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="h-px flex-1 bg-gray-300 dark:bg-neutral-700" />
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-gray-500 dark:text-gray-700">
            Send a Message
          </span>
          <div className="h-px flex-1 bg-gray-300 dark:bg-neutral-700" />
        </motion.div>

        {/* ── Two-column body ── */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Form — 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <ContactForm />
          </motion.div>

          {/* Info sidebar — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 flex flex-col gap-0"
          >
            {/* Status */}
            <div className="pb-6">
              <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-gray-400 dark:text-gray-600 mb-3 block">
                Current Status
              </span>
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Available for Work
                </span>
              </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-neutral-700" />

            {/* Info rows */}
            <div className="divide-y divide-gray-100 dark:divide-neutral-700">
              {infoRows.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.06 }}
                  className="flex justify-between items-center py-4"
                >
                  <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-gray-400 dark:text-gray-500">
                    {label}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="h-px bg-gray-200 dark:bg-neutral-700" />

            {/* Decorative type */}
            <div className="pt-8 select-none" aria-hidden="true">
              <p
                className="font-black leading-none tracking-tighter bg-gradient-to-b from-gray-300 to-gray-100 dark:from-[#2e3133] dark:to-darkPrimary bg-clip-text text-transparent"
                style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}
              >
                LET&apos;S
                <br />
                BUILD
                <br />
                TOGETHER
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
