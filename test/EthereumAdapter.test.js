const assert = require("assert");
const EthereumAdapterImport = require("../src/chain/adapters/EthereumAdapter");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider({gasLimit: 8000000}));

const compiledMarket = require("../src/chain/ethereum/build/Market.json");
const compiledNft = require("../src/chain/ethereum/build/Nft.json");

let accounts;
let market;
let mintedNft;
const EthereumAdapter = EthereumAdapterImport.default;
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    market = await new web3.eth.Contract(compiledMarket.abi)
        .deploy({data: compiledMarket.evm.bytecode.object})
        .send({from: accounts[0], gas: 8000000});
    
    console.log(await web3.eth.getAccounts());

    await EthereumAdapter.mint(market._address, 'testNft1', 'testHash1');
    const nfts = await EthereumAdapter.getNftList(market._address);
    mintedNft = nfts[0];

    assert(nfts.length === 1);
    assert(mintedNft.owner === accounts[0] === await EthereumAdapter.getUserAddress());
    assert(mintedNft.address != '0x0000000000000000000000000000000000000000');
});

describe("EthereumAdapter", () => {
    it("should get nft list of owner", async () => {
        const ownedNftList = await EthereumAdapter.getOwnedNfts(market, accounts[0]);
        assert(ownedNftList.length === 1);
        const nft = ownedNftList[0];
        assert(nft.name === "testNft1");
        assert(nft.owner === accounts[0]);
        assert(nft.ipfsHash === "testHash1");
        assert(nft.address === mintedNft.address);
    });

});