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

    [0,1,2].forEach(function (index) {
        it(`Transfers correctly ownership of nft at ${index}`, async () => {
            await market.methods.mint("testName1", "testHash1").send({from: accounts[0], gas:1000000});
            await market.methods.mint("testName2", "testHash2").send({from: accounts[0], gas:1000000});
            await market.methods.mint("testName3", "testHash3").send({from: accounts[0], gas:1000000});

            const testNftAddress = await market.methods.nftList(index).call();
            const mintedNft = await new web3.eth.Contract(compiledNft.abi, testNftAddress);
            const nftInfo = await mintedNft.methods.getNftInfo().call();
    
            assert(nftInfo[1] == accounts[0]);
            const numberOfUserOwnedNfts = await market.methods.getNumberOfOwnedNfts(accounts[0]).call();
            const numberOfMarketOwnedNfts = await market.methods.getNumberOfOwnedNfts(market._address).call();

            assert(numberOfUserOwnedNfts == 3);
            assert(numberOfMarketOwnedNfts == 0);
            await market.methods.listNftForSale(testNftAddress, 0, 10).send({from: accounts[0], gas:1000000});
            const transferredNftInfo = await mintedNft.methods.getNftInfo().call();
            assert(transferredNftInfo[1] == market._address);

            const nftListing = await market.methods.listings(0).call();
            assert(nftListing.price == 10);

            const numberOfUserOwnedNftsAfterTranfer = await market.methods.getNumberOfOwnedNfts(accounts[0]).call();
            const numberOfMarketOwnedNftsAfterTransfer = await market.methods.getNumberOfOwnedNfts(market._address).call();
            
            assert(numberOfUserOwnedNftsAfterTranfer == 2);
            assert(numberOfMarketOwnedNftsAfterTransfer == 1);

            const userNftStorageInfo = await market.methods.userNftStorageInfoMap(accounts[0]).call();
    
            assert(userNftStorageInfo.nextLoc == index)
        });
    });

});