import { IStaticPage } from "@lib/interface/sanity";
import StaticPage from "@components/StaticPage";
import { getStaticPageFromSlug } from "@lib/sanityContent";
import pageMeta from "@content/meta";
import { TIME_IN_SECONDS } from "@utils/utils";

export default function Privacy({
  privacyPolicy,
}: {
  privacyPolicy: IStaticPage;
}) {
  return <StaticPage metadata={pageMeta.privacy} page={privacyPolicy} />;
}

export async function getStaticProps() {
  const privacyPolicy = await getStaticPageFromSlug("privacy");

  return {
    props: {
      privacyPolicy,
    },
    revalidate: TIME_IN_SECONDS.ONE_WEEK,
  };
}
