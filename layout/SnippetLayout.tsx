import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";
import { ISnippet } from "@lib/interface/sanity";
import Image from "next/image";
import { opacityVariant } from "@content/FramerMotionVariants";

export default function SnippetLayout({
  snippet,
  children,
}: {
  snippet: ISnippet;
  children: JSX.Element;
}) {
  return (
    <section className="mt-[44px] md:mt-[60px]  relative !overflow-hidden">
      <section className="relative max-w-3xl p-5 mx-auto prose sm:pt-10 font-barlow dark:prose-invert">
        <div className="flex items-center justify-between">
          <h1 className="m-0 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            {snippet.title}
          </h1>

          <div className="relative flex items-center justify-center w-12 h-12 p-1 overflow-hidden">
            <Image
              className="m-0"
              src={snippet.language.image.asset.url}
              alt={snippet.title}
              width={62}
              height={62}
            ></Image>
          </div>
        </div>

        <p>{snippet.excerpt}</p>

        <AnimatedDiv
          variants={opacityVariant}
          className="max-w-full prose-sm blog-container sm:prose-base prose-pre:bg-white prose-pre:shadow dark:prose-pre:shadow-black/80 dark:prose-pre:bg-darkSecondary prose-pre:saturate-150 dark:prose-pre:saturate-100 marker:text-black dark:marker:text-white"
        >
          {children}
        </AnimatedDiv>
      </section>
    </section>
  );
}
