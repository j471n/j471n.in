import useScrollPercentage from "@hooks/useScrollPercentage";
import { lockScroll, removeScrollLock } from "@utils/functions";
import { useEffect, useState } from "react";
import AnimatedHeading from "./FramerMotion/AnimatedHeading";
import { FadeContainer, opacityVariant } from "@content/FramerMotionVariants";
import Link from "next/link";
import { stringToSlug } from "@lib/toc";
import useWindowSize from "@hooks/useWindowSize";
import AnimatedDiv from "./FramerMotion/AnimatedDiv";
import { CgSearch } from "react-icons/cg";

export default function TableOfContents({
  tableOfContents,
  setIsTOCActive,
  isTOCActive,
}: {
  tableOfContents: {
    level: number;
    heading: string;
  }[];
  setIsTOCActive: (val: boolean) => void;
  isTOCActive: boolean;
}) {
  const [searchValue, setSearchValue] = useState("");
  const [toc, setToc] = useState(tableOfContents);

  const scrollPercentage = useScrollPercentage();
  const size = useWindowSize();

  useEffect(() => {
    // In Case user exists from mobile to desktop then remove the scroll lock and TOC active to false
    if (size.width > 768) {
      removeScrollLock();
      setIsTOCActive(false);
    }
  }, [size, setIsTOCActive]);
  useEffect(() => {
    setToc(
      tableOfContents.filter((table: any) =>
        table.heading.toLowerCase().includes(searchValue.trim().toLowerCase())
      )
    );
  }, [searchValue, tableOfContents, ]);
  return (
    <>
      {tableOfContents.length > 0 && (
        <>
          <div
            className={`fixed h-full print:hidden ${
              isTOCActive
                ? "left-0 opacity-100 top-[44px] md:top-[60px]"
                : "-left-full opacity-0"
            } ${
              scrollPercentage > 95 ? "xl:-left-full" : "xl:left-0"
            } md:left-0 md:opacity-100 md:max-w-[35%] lg:max-w-[30%]  transition-all duration-500 flex flex-col gap-1 !pb-[100px] overflow-y-scroll p-10 md:p-14 h-screen fixed w-full font-barlow bg-darkWhite dark:bg-darkPrimary text-neutral-800 dark:text-gray-200 z-50 `}
          >
            {/* TOC Search Bar */}
            <div className="relative w-full group mx-auto text-slate-700 dark:text-gray-300  rounded-md -ml-[5px]">
              <CgSearch className="ml-3 w-5 h-5 absolute top-[50%] -translate-y-1/2 z-10" />

              <input
                className="w-full px-5 py-2 pl-10 transition duration-200 bg-white rounded-md shadow outline-none dark:bg-darkSecondary ring-1 ring-slate-900/10 hover:ring-slate-400"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search Content..."
              />
            </div>
            <AnimatedHeading
              variants={opacityVariant}
              className="font-bold text-xl md:text-2xl -ml-[5px] md:-ml-[6px] mt-2"
            >
              Table of Contents
            </AnimatedHeading>

            <AnimatedDiv
              variants={FadeContainer}
              className="flex flex-col relative before:absolute before:left-0 before:h-full before:w-[1.5px] before:bg-neutral-500 mb-20"
            >
              {toc.map((content: any) => {
                return (
                  <Link
                    key={content.heading}
                    href={`#${stringToSlug(content.heading)}`}
                    className="relative overflow-hidden hover:bg-darkSecondary px-2 py-0.5 md:py-1 rounded-tr-md rounded-br-md md:line-clamp-1 text-neutral-700 hover:text-white  dark:text-neutral-200 font-medium border-l-2 border-neutral-500 dark:hover:border-white"
                    style={{ marginLeft: `${content.level * 15}px` }}
                    onClick={() => {
                      if (size.width < 768) {
                        lockScroll();
                        setIsTOCActive(false);
                      }
                      setIsTOCActive(false);
                      removeScrollLock();
                    }}
                  >
                    {content.heading}
                  </Link>
                );
              })}
            </AnimatedDiv>
            {/* When you search but found nothing */}
            {toc.length === 0 && (
              <div className="text-center">No Result found</div>
            )}
          </div>

          <button
            onClick={() => {
              setIsTOCActive(!isTOCActive);
              lockScroll();
            }}
            className="fixed bottom-0 z-50 w-full py-2 font-medium text-white bg-black outline-none md:hidden dark:bg-white dark:text-black"
          >
            Table of Contents
          </button>
        </>
      )}
    </>
  );
}
