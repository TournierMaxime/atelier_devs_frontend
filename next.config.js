/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    URL_BACKEND: "http://localhost:3100",
  },
};

module.exports = nextConfig;
