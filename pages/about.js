import MetaData from "@components/MetaData";
import PageTop from "@components/PageTop";

export default function About() {
  return (
    <>
      <MetaData
        title="About -"
        description=""
        // previewImage={pagePreviewImage.utilities}
      />

      <section className="pageTop">
        <PageTop pageTitle="About me"></PageTop>
      </section>
    </>
  );
}
