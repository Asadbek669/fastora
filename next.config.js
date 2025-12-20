
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.fastora.uz",
      },
    ],
  },
};

module.exports = nextConfig;
