import MetaData from "@components/MetaData";
import PageTop from "@components/PageTop";
import { pagePreviewImage } from "@utils/utils";
import utilities from "@content/utilitiesData";
import Link from "next/link";
import { useDarkMode } from "@context/darkModeContext";

export default function Utilities() {
  return (
    <>
      <MetaData
        title={utilities.title + " -"}
        description={utilities.description}
        previewImage={pagePreviewImage.utilities}
      />

      <section className="pageTop font-inter">
        <PageTop pageTitle={utilities.title}>{utilities.description}</PageTop>

        <div className="flex flex-col gap-14">
          <UtilitySection utility={utilities.system} />
          <UtilitySection utility={utilities.tools} />
          <UtilitySection utility={utilities.software} />
        </div>

        <p className="mt-12 -mb-10">
          Last Update on{" "}
          <span className="font-semibold">{utilities.lastUpdate}</span>
        </p>
      </section>
    </>
  );
}

function UtilitySection({ utility }) {
  const { isDarkMode } = useDarkMode();
  return (
    <section className="!w-full  selection:bg-blue-300 dark:selection:bg-blue-900 dark:selection:text-gray-400 dark:text-neutral-200 font-medium">
      <h2 className="font-bold text-2xl sm:text-3xl font-barlow mb-4">
        {utility.title}
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-wrap gap-3 my-5">
        {utility.data.map((item) => {
          return (
            <Link href={item.link} key={item.name} passHref>
              <a
                title={item.name + " - " + item.description}
                rel="noopener noreferrer"
                target="_blank"
                className="relative flex flex-col gap-2 items-center bg-white dark:bg-darkSecondary shadow dark:shadow-md p-8 border border-transparent hover:border-gray-400 dark:hover:border-neutral-600 rounded-md transition-all active:scale-90 lg:hover:scale-[1.3] hover:z-10 hover:shadow-lg"
              >
                <item.Icon className="w-8 h-8 !pointer-events-none" />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
