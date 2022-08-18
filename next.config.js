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
     MARKET_ADDRESS: "0xd38b679CEb7E273a9545aB8a538fc15D3F1D9139"
  }
}

module.exports = nextConfig
