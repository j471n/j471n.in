module.exports = {
  webpack: true,
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.resolve.fallback = { fs: false };
    return config;
  },
  reactStrictMode: true,
  optimizeFonts: false,
  images: {
    domains: [
      "cdn.buymeacoffee.com",
      "res.cloudinary.com",
      "imgur.com",
      "i.imgur.com",
      "cutt.ly",
      "activity-graph.herokuapp.com",
      "i.scdn.co", // images from spotify
    ],
  },
};
