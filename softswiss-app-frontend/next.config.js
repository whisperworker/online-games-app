/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn2.softswiss.net",
      },
    ],
  },
};

module.exports = nextConfig;
