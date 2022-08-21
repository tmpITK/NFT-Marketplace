/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack5: true,
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  env : {
     MARKET_ADDRESS: "0xCd7b7001E4F49b6e62014f58D2FeC978ed4A9DF8"
  }
}

module.exports = nextConfig
