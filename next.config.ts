/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["172.16.1.175"],
  images: {
    remotePatterns: [
      // twoje już istniejące
    ],
  },
};

module.exports = nextConfig;
