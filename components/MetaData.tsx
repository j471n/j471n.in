import { useEffect, useState } from "react";

import { NextSeo } from "next-seo";
import useWindowLocation from "@hooks/useWindowLocation";

type Props = {
  title: string;
  description: string;
  previewImage?: string;
  keywords?: string;
  suffix?: string;
};

const getFaviconPath = (isDarkMode: boolean = true): string => {
  return `/favicon-${isDarkMode ? "dark" : "light"}.ico`;
};

export default function MetaData({
  title,
  description,
  previewImage,
  keywords,
  suffix,
}: Props) {
  const { currentURL } = useWindowLocation();
  const [faviconHref, setFaviconHref] = useState("/favicon-dark.ico");

  useEffect(() => {
    // Get current color scheme.
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    // Set favicon initially.
    setFaviconHref(getFaviconPath(matcher.matches));
    // Change favicon if the color scheme changes.
    matcher.onchange = () => setFaviconHref(getFaviconPath(matcher.matches));
  }, [faviconHref]);

  return (
    <NextSeo
      title={title + (suffix ? ` - ${suffix}` : "")}
      description={
        description ||
        "Jatin Sharma - Engineering Manager & Full-Stack Developer"
      }
      canonical={currentURL}
      additionalMetaTags={[
        {
          name: "author",
          content: "Jatin Sharma",
        },
        {
          name: "robots",
          content:
            "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
        },
        {
          name: "theme-color",
          content: "#000000",
        },
        ...(keywords
          ? [
              {
                name: "keywords",
                content: `${keywords}, Jatin Sharma, jatin sharma developer, j471n`,
              },
            ]
          : [
              {
                name: "keywords",
                content:
                  "Jatin Sharma, jatin sharma developer, j471n, engineering manager, full-stack developer india",
              },
            ]),
      ]}
      additionalLinkTags={[
        {
          rel: "icon",
          href: faviconHref,
        },
        {
          rel: "manifest",
          href: "/manifest.json",
        },
        {
          rel: "apple-touch-icon",
          href: "/icons/icon-192x192.png",
          sizes: "192x192",
        },
      ]}
      openGraph={{
        type: "website",
        url: currentURL,
        title: title + (suffix ? ` - ${suffix}` : ""),
        description:
          description ||
          "Jatin Sharma - Engineering Manager & Full-Stack Developer",
        profile: {
          firstName: "Jatin",
          lastName: "Sharma",
          gender: "Male",
          username: "j471n",
        },
        article: {
          tags: keywords?.split(","),
          authors: ["https://linkedin.com/in/j471n"],
        },
        images: [
          {
            url: previewImage ?? "",
            width: 1200,
            height: 630,
            alt: title,
            type: "image/jpeg",
          },
        ],
        siteName: "Jatin Sharma",
      }}
      twitter={{
        handle: "@j471n_",
        site: "@j471n_",
        cardType: "summary_large_image",
      }}
    />
  );
}
