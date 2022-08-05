import MetaData from "@components/MetaData";
import { popUpFromBottomForText } from "@content/FramerMotionVariants";
import certificatesData from "@content/certificatesData";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";
import PageTop from "@components/PageTop";
import pageMeta from "@content/meta";

export default function Certificates() {
  return (
    <>
      <MetaData
        title={pageMeta.certificates.title}
        description={pageMeta.certificates.description}
        previewImage={pageMeta.certificates.image}
        keywords={pageMeta.certificates.keywords}
      />

      <section className="pageTop">
        <PageTop pageTitle="Certificates">
          I've participated in many contests, courses and test and get certified
          in many skills. You can find the certificates below.
        </PageTop>

        <div className="flex flex-col gap-3 font-inter px-5">
          {certificatesData.map((cer, index) => {
            return (
              <AnimatedDiv
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4  p-3 rounded-lg bg-white shadow dark:bg-darkSecondary/50"
                variants={popUpFromBottomForText}
                key={index}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <Image
                      width={40}
                      height={40}
                      src={cer.issuedBy.orgLogo}
                      alt={cer.issuedBy.orgName}
                      quality={50}
                      objectFit="contain"
                      layout="fixed"
                      placeholder="blur"
                      blurDataURL={cer.issuedBy.orgLogo}
                    />
                  </div>
                  <div className="flex flex-col ">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg text-neutral-900 dark:text-neutral-200">
                      {cer.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {cer.issuedBy.orgName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5 text-sm justify-between">
                  <p className="text-gray-500 text-sm">{cer.issuedDate}</p>
                  <Link href={cer.urls.pdfURL} passHref>
                    <motion.a
                      href={cer.urls.pdfURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1 rounded-md bg-neutral-200 dark:bg-black shadow dark:text-white transform duration-200 font-medium  active:scale-90 lg:hover:bg-black lg:hover:text-white dark:lg:hover:bg-white dark:lg:hover:text-black"
                    >
                      View
                    </motion.a>
                  </Link>
                </div>
              </AnimatedDiv>
            );
          })}
        </div>
      </section>
    </>
  );
}
