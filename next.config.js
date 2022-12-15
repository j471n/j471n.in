/**
 * @type {import('next').NextConfig}
 */

const withPWA = require("next-pwa");

// module.exports = withBundleAnalyzer(
//   withPWA({
//     webpack: true,
//     webpack: (config) => {
//       // Fixes npm packages that depend on `fs` module
//       config.resolve.fallback = { fs: false };
//       return config;
//     },
//     reactStrictMode: true,
//     images: {
//       remotePatterns: [
//         {
//           protocol: "https",
//           hostname: "imgur.com",
//         },
//         {
//           protocol: "https",
//           hostname: "i.scdn.co",
//         },
//       ],
//       // unoptimized: true,
//       // domains: [
//       //   "cdn.buymeacoffee.com",
//       //   "res.cloudinary.com",
//       //   "cutt.ly",
//       //   "activity-graph.herokuapp.com",
//       //   "i.scdn.co", // images from spotify
//       //   "images.unsplash.com",
//       //   "imgur.com",
//       // ],
//     },

//     // Pwa Setting
//     pwa: {
//       dest: "public",
//       register: true,
//       skipWaiting: true,
//       disable: process.env.NODE_ENV === "development",
//       publicExcludes: ["!resume.pdf"],
//     },
//   })
// );

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.buymeacoffee.com",
      "res.cloudinary.com",
      "imgur.com",
      "i.imgur.com",
      "cutt.ly",
      "activity-graph.herokuapp.com",
      "i.scdn.co", // images from spotify
      "images.unsplash.com",
    ],
  },
};
