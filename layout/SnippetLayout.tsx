import { opacityVariant } from "@content/FramerMotionVariants";
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";
import { PostType } from "@lib/types";
import { snippetsImages } from "@utils/utils";
import Image from "next/image";

export default function SnippetLayout({
  snippet,
  children,
}: {
  snippet: PostType;
  children: JSX.Element;
}) {
  return (
    <section className="mt-[44px] md:mt-[60px]  relative !overflow-hidden">
      <section className="relative max-w-3xl p-5 mx-auto prose sm:pt-10 font-barlow dark:prose-invert">
        <div className="flex items-center justify-between">
          <h1 className="m-0 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            {snippet.meta.title}
          </h1>

          <div className="relative flex items-center justify-center w-12 h-12 p-1 overflow-hidden">
            <Image
              className="m-0"
              src={snippetsImages[`${snippet.meta.image}`]}
              alt={snippet.meta.title}
              width={62}
              height={62}
            ></Image>
          </div>
        </div>

        <p>{snippet.meta.excerpt}</p>

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
