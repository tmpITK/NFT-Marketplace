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
     MARKET_ADDRESS: "0x4A3aAc06545F7721Dcb3CB245f90DC93D3BB560b"
  }
}

module.exports = nextConfig
