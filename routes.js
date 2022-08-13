const routes = require("next-routes")();

routes
    .add("/nft/new", "/nft/new")
    .add("/nft/:address", "/nft/show")
    .add("/nft/sell/:address", "/nft/sell")
    .add("/user/:userAddress", "/user")
    .add("/market", "/market");

module.exports = routes;