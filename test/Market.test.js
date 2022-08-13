const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider({gasLimit: 8000000}));

const compiledMarket = require("../src/chain/ethereum/build/Market.json");
const compiledNft = require("../src/chain/ethereum/build/Nft.json");

let accounts;
let market;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();

    market = await new web3.eth.Contract(compiledMarket.abi)
        .deploy({data: compiledMarket.evm.bytecode.object})
        .send({from: accounts[0], gas: 8000000});

});

describe("Market", () => {

    it("mints an nft successfully", async () => {

        await market.methods.mint("testName", "testHash").send({from: accounts[0], gas:1000000});
        const numberOfNfts = await market.methods.getNumberOfNfts().call();
        assert(numberOfNfts == 1);

        const testNftAddress = await market.methods.nftList(0).call();
        const mintedNft = await new web3.eth.Contract(compiledNft.abi, testNftAddress);

        const nftInfo = await mintedNft.methods.getNftInfo().call();

        assert(nftInfo[0] == "testName");
        assert(nftInfo[2] == "testHash");
    });

    it("Gives back owned nft", async () => {
        await market.methods.mint("testName", "testHash").send({from: accounts[0], gas:1000000});
        const testNftAddress = await market.methods.nftList(0).call();

        const ownedNft = await market.methods.getOwnedNft(accounts[0], 0).call();

        assert(testNftAddress == ownedNft);
    });

    it("Transfers ownership to market on listing with price", async () => {        
        await market.methods.mint("testName", "testHash").send({from: accounts[0], gas:1000000});
        const testNftAddress = await market.methods.nftList(0).call();
        const mintedNft = await new web3.eth.Contract(compiledNft.abi, testNftAddress);
        const nftInfo = await mintedNft.methods.getNftInfo().call();

        assert(nftInfo[1] == accounts[0]);
        await market.methods.listNftForSale(testNftAddress, 0, 10).send({from: accounts[0], gas:1000000});
        const transferredNftInfo = await mintedNft.methods.getNftInfo().call();
    
        assert(transferredNftInfo[1] == market._address);
        const nftListing = await market.methods.listings(0).call();
        assert(nftListing.price == 10);
    });

});