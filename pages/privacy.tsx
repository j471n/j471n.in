import { IStaticPage } from "@lib/interface/sanity";
import StaticPage from "@components/StaticPage";
import { getStaticPageFromSlug } from "@lib/sanityContent";
import pageMeta from "@content/meta";

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
  };
}
