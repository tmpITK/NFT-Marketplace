const routes = require("next-routes")();

routes
    .add("/nft/new", "/nft/new")
    .add("/nft/:address", "/nft/show");

module.exports = routes;