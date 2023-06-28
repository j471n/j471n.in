import { ReadTimeResults } from "reading-time";
import { SanityDocument } from "@sanity/types";

export interface ISanityImage {
  asset: {
    _ref: string;
    _type: "reference";
    url: "string";
  };
}
export interface BlogPost extends SanityDocument {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  keywords: string;
  excerpt: string;
  image_url: string;
  mainImage: ISanityImage;
  publishedAt: string;
  author: {
    name: string;
    image: ISanityImage;
  };
  organization: {
    name: string;
    image: ISanityImage;
    website: string;
  };
  content?: any;
  readingTime: ReadTimeResults;
  tableOfContents: {
    level: number;
    heading: string;
  }[];
  body: any; // Adjust the type according to the structure of your 'body' field
}
