/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["172.16.1.175"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "dummyimage.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
