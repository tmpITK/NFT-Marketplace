/** @type {import('next').NextConfig} */

const DFXWebPackConfig = require("./dfx.webpack.config")
const webpack = require("webpack")

// Make DFX_NETWORK available to Web Browser with default "local" if DFX_NETWORK is undefined
const EnvPlugin = new webpack.EnvironmentPlugin({
  DFX_NETWORK: "local",
})
const {__CANDID_UI_CANISTER_ID, ASSETS_CANISTER_ID, MARKETPLACE_CANISTER_ID, NFT_CANISTER_ID} = DFXWebPackConfig.initCanisterIds()
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env : {
    
    MARKET_ADDRESS: "0x37AdE76f3846F380c0766179a2b6C19a9Bc929C5",
    CHAIN_ENV: process.env.CHAIN_ENV,
    CANDID_UI_CANISTER_ID: __CANDID_UI_CANISTER_ID,
    ASSETS_CANISTER_ID: ASSETS_CANISTER_ID,
    MARKETPLACE_CANISTER_ID: MARKETPLACE_CANISTER_ID,
    NFT_CANISTER_ID: NFT_CANISTER_ID
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Plugin
    config.plugins.push(EnvPlugin);
    config.resolve.fallback = { fs: false };
    config.experiments = { ...config.experiments, ...{ topLevelAwait: true }};

    // Important: return the modified config
    return config
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
