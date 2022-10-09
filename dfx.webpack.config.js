const path = require("path")

let localCanisters, prodCanisters, canisters

function initCanisterIds() {
  try {
    localCanisters = require(path.resolve(".dfx", "local", "canister_ids.json"))
  } catch (error) {
    console.log("No local canister_ids.json found. Continuing production")
  }
  try {
    prodCanisters = require(path.resolve("canister_ids.json"))
  } catch (error) {
    console.log("No production canister_ids.json found. Continuing with local")
  }

  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === "production" ? "ic" : "local")

  console.info(`initCanisterIds: network=${network}`)
  console.info(`initCanisterIds: DFX_NETWORK=${process.env.DFX_NETWORK}`)

  canisters = network === "local" ? localCanisters : prodCanisters
  ids = {}
  for (const canister in canisters) {
    console.log("Canister: ", canister, canisters[canister][network])
    console.log("Setting ", `${canister.toUpperCase()}_CANISTER_ID`)
    ids[`${canister.toUpperCase()}_CANISTER_ID`] =
      canisters[canister][network]
  }
  console.log(ids);
  return ids;
}

frontendDirectory = "pages"

module.exports = {
  initCanisterIds: initCanisterIds
}