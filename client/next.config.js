/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "live.staticflickr.com", "www.flickr.com"],
  },
};

module.exports = nextConfig;
