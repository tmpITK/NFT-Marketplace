const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledMarket = require("./build/Market.json");

const provider = new HDWalletProvider(
  process.env.ETHEREUM_MNEMONIC,
  // remember to change this to your own phrase!
  process.env.INFURA_URL
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(compiledMarket.abi)
    .deploy({ data: compiledMarket.evm.bytecode.object })
    .send({ gas: "1400000", from: accounts[0] });

  provider.engine.stop();
};
deploy();


//Attempting to deploy from account 0xC75444ef801b50f5601230db66F784e2078BE7Bb
//Contract deployed to 0xa456f96b12a27574B74244119F369E581e0c869D
