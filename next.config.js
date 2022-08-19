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
     MARKET_ADDRESS: "0xa591a44A4c1c27c4eB51bAF610BF3860c4221207"
  }
}

module.exports = nextConfig
