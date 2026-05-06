export const DEFAULT_IMAGE_URL: string = "https://imgur.com/5dYYce8.png";
export const AvatarImage: string = "https://imgur.com/VAXEwKT.png";
export const homeProfileImage: string = "https://i.imgur.com/fuciSoZ.jpeg";

export const navigationRoutes: string[] = [
  "home",
  "about",
  "stats",
  "utilities",
  "blogs",
  "books",
  "certificates",
  "projects",
  "snippets",
  "epigraphs",
  "privacy",
  "newsletter",
  "rss",
];

export const snippetsImages: { [key: string]: string } = {
  css: "https://imgur.com/ArD8JIg.png",
  js: "https://imgur.com/lFKi8mB.png",
  react: "https://imgur.com/m2jv6MK.png",
  ts: "https://imgur.com/Ux6L5Uh.png",
  supabase: "https://imgur.com/xgNKVQa.png",
};

export const TIME_IN_SECONDS = {
  MINUTE: 60,
  FIVE_MINUTES: 60 * 5,
  TEN_MINUTES: 60 * 10,
  FIFTEEN_MINUTES: 60 * 15,
  THIRTY_MINUTES: 60 * 30,
  ONE_HOUR: 60 * 60,
  TWO_HOURS: 60 * 60 * 2,
  THREE_HOURS: 60 * 60 * 3,
  SIX_HOURS: 60 * 60 * 6,
  TWELVE_HOURS: 60 * 60 * 12,
  ONE_DAY: 60 * 60 * 24,
  ONE_WEEK: 60 * 60 * 24 * 7,
} as const;
