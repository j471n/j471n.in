import { Variants } from "framer-motion";
import React from "react";
import { IconType } from "react-icons/lib";

/* Custom Animated Components types */
export type AnimatedTAGProps = {
  variants: Variants;
  className: string;
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
  level: number;
  pinned: boolean;
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
