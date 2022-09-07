/** @type {import('next').NextConfig} */


const DFXWebPackConfig = require("./dfx.webpack.config")
DFXWebPackConfig.initCanisterIds()

const webpack = require("webpack")

// Make DFX_NETWORK available to Web Browser with default "local" if DFX_NETWORK is undefined
const EnvPlugin = new webpack.EnvironmentPlugin({
  DFX_NETWORK: "local"
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env : {
     MARKET_ADDRESS: "0x37AdE76f3846F380c0766179a2b6C19a9Bc929C5",
     CHAIN_ENV: process.env.CHAIN_ENV
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Plugin
    config.plugins.push(EnvPlugin);
    config.resolve.fallback = { fs: false };

    // Important: return the modified config
    return config
  }
}

module.exports = nextConfig
