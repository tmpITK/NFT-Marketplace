const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledMarket = require("./build/Market.json");
require('dotenv').config('../../../.env')

const provider = new HDWalletProvider(
  process.env.ETHEREUM_MNEMONIC,
  // remember to change this to your own phrase!
  process.env.INFURA_URL
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledMarket.abi)
    .deploy({ data: compiledMarket.evm.bytecode.object })
    .send({ gas: "1400000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
