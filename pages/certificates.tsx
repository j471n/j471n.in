import MetaData from "@components/MetaData";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@components/PageHeader";
import pageMeta from "@content/meta";
import { CertificateType } from "@lib/types";
import { getCertificates } from "@lib/supabase";
import CreateAnIssue from "@components/CreateAnIssue";
import { getFormattedDate } from "@utils/date";
import { motion } from "framer-motion";
import { TIME_IN_SECONDS } from "@utils/utils";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

export default function Certificates({
  certificates,
  error,
}: {
  certificates: CertificateType[];
  error: boolean;
}) {
  if (error) return <CreateAnIssue />;

  return (
    <>
      <MetaData
        title={pageMeta.certificates.title}
        description={pageMeta.certificates.description}
        previewImage={pageMeta.certificates.image}
        keywords={pageMeta.certificates.keywords}
      />

      <PageHeader
        watermark="certs"
        eyebrow="Credentials — 001"
        title="Certificates"
        description="I've participated in many contests, courses and tests and earned certifications across a range of skills."
        className="pb-24"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col border border-gray-200 dark:border-neutral-700"
        >
          {certificates.map((cer) => (
            <motion.div
              key={cer.id}
              variants={itemVariants}
              className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-neutral-700 last:border-b-0 bg-white dark:bg-darkPrimary hover:bg-gray-50 dark:hover:bg-darkSecondary transition-colors"
            >
              {/* Org logo */}
              <div className="flex-shrink-0 w-10 h-10 border border-gray-200 dark:border-gray-700 flex items-center justify-center bg-white dark:bg-darkSecondary">
                <Image
                  width={28}
                  height={28}
                  src={cer.orgLogo}
                  alt={cer.orgName}
                  quality={60}
                  placeholder="blur"
                  blurDataURL={cer.orgLogo}
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Title + meta */}
              <div className="flex-1 min-w-0">
                <Link
                  href={cer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-gray-900 dark:text-white hover:underline leading-snug line-clamp-1"
                >
                  {cer.title}
                </Link>
                <p className="mt-0.5 font-mono text-[10px] tracking-[0.35em] uppercase text-gray-500 dark:text-gray-500">
                  {cer.orgName}
                </p>
              </div>

              {/* Issued date */}
              <span className="flex-shrink-0 font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-600 hidden sm:block">
                {getFormattedDate(new Date(cer.issuedDate))}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </PageHeader>
    </>
  );
}

export async function getStaticProps() {
  const { certificates, error } = await getCertificates();
  return {
    props: {
      certificates,
      error,
    },
    revalidate: TIME_IN_SECONDS.ONE_DAY, // Revalidate every 24 hours
  };
}
