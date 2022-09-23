/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    URL_BACKEND: process.env.URL_BACKEND,
  },
};

module.exports = nextConfig;
