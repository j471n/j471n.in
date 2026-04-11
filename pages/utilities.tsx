import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import MetaData from "@components/MetaData";
import PageHeader from "@components/PageHeader";
import utilities from "@content/utilitiesData";
import pageMeta from "@content/meta";
import { UtilityType } from "@lib/types";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 160, damping: 22 },
  },
};

export default function Utilities() {
  return (
    <>
      <MetaData
        title={pageMeta.utilities.title}
        description={utilities.description}
        previewImage={pageMeta.utilities.image}
        keywords={pageMeta.utilities.keywords}
      />

      <PageHeader
        watermark="/uses"
        eyebrow="Setup — 001"
        title={utilities.title}
        description={utilities.description}
        className="pb-32"
      >
        {/* ── Sections ── */}
        <div className="flex flex-col gap-16">
          {utilities.data.map((utility, index) => (
            <UtilitySection key={index} utility={utility} index={index} />
          ))}
        </div>

        {/* ── Last updated ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 font-mono text-[10px] tracking-[0.35em] uppercase text-gray-400 dark:text-gray-600"
        >
          Last updated — {utilities.lastUpdate}
        </motion.p>
      </PageHeader>
    </>
  );
}

function UtilitySection({
  utility,
  index,
}: {
  utility: UtilityType;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div>
      {/* Category header */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-6"
      >
        <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-400 dark:text-gray-600">
          {num}
        </span>
        <div className="h-px w-5 bg-gray-300 dark:bg-gray-600" />
        <h2 className="text-sm font-mono tracking-[0.25em] uppercase text-gray-700 dark:text-gray-300 font-semibold">
          {utility.title}
        </h2>
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-600" />
      </motion.div>

      {/* Tool cards grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-200 dark:bg-darkSecondary border border-gray-200 dark:border-neutral-700"
      >
        {utility.data.map((item) => {
          const Icon = item.Icon;
          return (
            <motion.div
              key={item.name}
              variants={itemVariants}
              className="h-full"
            >
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                title={`${item.name} — ${item.description}`}
                className="group flex items-center gap-4 p-5 h-full bg-white dark:bg-darkPrimary hover:bg-gray-50 dark:hover:bg-darkSecondary transition-colors duration-200"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-colors text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                  {/* @ts-ignore */}
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white truncate">
                      {item.name}
                    </span>
                    <FiExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
