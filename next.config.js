/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  env : {
     MARKET_ADDRESS: "0x37AdE76f3846F380c0766179a2b6C19a9Bc929C5",
     CHAIN_ENV: process.env.CHAIN_ENV
  }
}

module.exports = nextConfig
