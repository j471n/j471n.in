import StaticPage from "@components/StaticPage";
import pageMeta from "@content/meta";
import MDXContent from "@lib/MDXContent";
import { PostType } from "@lib/types";

export default function Privacy({
  privacyPolicy,
}: {
  privacyPolicy: PostType;
}) {
  return <StaticPage metadata={pageMeta.privacy} page={privacyPolicy} />;
}

export async function getStaticProps() {
  const { post: privacyPolicy } = await new MDXContent(
    "static_pages"
  ).getPostFromSlug("privacy-policy");

  return {
    props: {
      privacyPolicy,
    },
  };
}
