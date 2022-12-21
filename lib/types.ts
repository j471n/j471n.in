import { Variants } from "framer-motion";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";
import { IconType } from "react-icons/lib";
import { ReadTimeResults } from "reading-time";

/* Custom Animated Components types */
export type AnimatedTAGProps = {
  variants: Variants;
  className?: string;
  children: React.ReactNode;
  infinity?: boolean;
};

/* Spotify Track  */
export type SpotifyTrack = {
  id: number;
  title: string;
  url: string;
  coverImage: {
    url: string;
  };
  artist: string;
};

/* Spotify Artist  */
export type SpotifyArtist = {
  id: number;
  name: string;
  url: string;
  coverImage: {
    url: string;
  };
  followers: string;
};

export type ProjectType = {
  id: number;
  name: string;
  coverURL: string;
  darkCoverURL?: string;
  description: string;
  githubURL: string;
  previewURL?: string;
  tools?: string[];
  pinned?: boolean;
};

export type SkillType = {
  name: string;
  Icon: IconType;
};

export type CertificateType = {
  title: string;
  issuedDate: string;
  issuedBy: {
    orgName: string;
    orgLogo: string;
  };
  urls: {
    pdfURL: string;
  };
  pinned: boolean;
};

export type SocialPlatform = {
  title: string;
  Icon: IconType;
  url: string;
};

export type UtilityType = {
  title: string;
  data: {
    name: string;
    description: string;
    Icon: IconType | JSX.Element;
    link: string;
  }[];
};

export type Utilities = {
  title: string;
  description: string;
  lastUpdate: string;
  data: UtilityType[];
};

// export interface ReadingTimeType {
//   text: string;
//   minutes: number;
//   time: number;
//   words: number;
// }

export interface BlogType {
  slug: string;
  readingTime: ReadTimeResults;
  excerpt: string;
  title: string;
  date: string;
  keywords?: string;
  image: string;
}

export type PostType = {
  meta: {
    slug: string;
    readingTime: ReadTimeResults;
    excerpt: string;
    title: string;
    date: string;
    keywords: string;
    image: string;
  };
  source: MDXRemoteSerializeResult;
  tableOfContents: {
    level: number;
    heading: string;
  }[];
};

export type SupportMe = {
  name: string;
  url: string;
  Icon: IconType;
};

export type Song = {
  album: string;
  artist: string;
  albumImageUrl: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type FormInput = {
  to_name: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
};
