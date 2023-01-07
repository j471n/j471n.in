import MetaData from "@components/MetaData";
import { popUpFromBottomForText } from "@content/FramerMotionVariants";
import Image from "next/image";
import Link from "next/link";
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";
import PageTop from "@components/PageTop";
import pageMeta from "@content/meta";
import { CertificateType } from "@lib/types";
import { getCertificates } from "@lib/supabase";
import CreateAnIssue from "@components/CreateAnIssue";
import { getFormattedDate } from "@utils/date";

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

      <section className="pageTop">
        <PageTop pageTitle="Certificates">
          I've participated in many contests, courses and test and get certified
          in many skills. You can find the certificates below.
        </PageTop>

        <div className="flex flex-col gap-3 font-inter">
          {certificates.map((cer) => {
            return (
              <AnimatedDiv
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4  p-3 rounded-lg bg-white shadow dark:bg-darkSecondary/50"
                variants={popUpFromBottomForText}
                key={cer.id}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <Image
                      width={40}
                      height={40}
                      src={cer.orgLogo}
                      alt={cer.orgName}
                      quality={50}
                      placeholder="blur"
                      blurDataURL={cer.orgLogo}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="flex flex-col ">
                    <Link
                      href={cer.url}
                      className="font-semibold hover:underline text-sm sm:text-base md:text-lg text-neutral-900 dark:text-neutral-200"
                    >
                      {cer.title}
                    </Link>
                    <p className="text-xs text-gray-500">
                      {cer.orgName} &#x2022;{" "}
                      {getFormattedDate(new Date(cer.issuedDate))}
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm"></p>
              </AnimatedDiv>
            );
          })}
        </div>
      </section>
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
  };
}
