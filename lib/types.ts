import { Variants } from "framer-motion";
import React from "react";

/* Custom Animated Components types */
export type AnimatedTAGProps = {
  variants: Variants;
  className: string;
  children: React.ReactNode;
  infinity?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?:
    | React.ChangeEventHandler<HTMLTextAreaElement>
    | React.ChangeEventHandler<HTMLInputElement>;
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
