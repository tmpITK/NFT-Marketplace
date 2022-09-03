const assert = require("assert");
const sinon = require("sinon");
const EthereumAdapterImport = require("../src/chain/adapters/EthereumAdapter");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider({gasLimit: 8000000000}));

const compiledMarket = require("../src/chain/ethereum/build/Market.json");
const compiledNft = require("../src/chain/ethereum/build/Nft.json");

let accounts;
let market;
let mintedNft;
let EthereumAdapter;



beforeEach(async () => {


    accounts = await web3.eth.getAccounts();
    market = await new web3.eth.Contract(compiledMarket.abi)
        .deploy({data: compiledMarket.evm.bytecode.object})
        .send({from: accounts[0], gas: 8000000});

    const nftFactory = async (address) => {
        const nft = await new web3.eth.Contract(compiledNft.abi, address);
        return nft;
    };

    EthereumAdapter = new EthereumAdapterImport.default(web3, market, nftFactory);

    const mintStub = sinon.stub(EthereumAdapter, 'mint').callsFake(async function(adapter, name, url, gas) {
        const userAccount = await adapter.getUserAddress();
        await adapter.market.methods.mint(name, url)
                            .send({from: userAccount, gas: gas});
    });

    const listNftForSaleStub = sinon.stub(EthereumAdapter, 'listNftForSale').callsFake(async function(adapter, nftAddress, price) {
        const userAddress = await this.getUserAddress();
        const nft = await this.getNft(nftAddress);
        let nftInfo = await nft.methods.getNftInfo().call();
    
        await this.market.methods.listNftForSale(nftAddress, nftInfo[3], this.web3.utils.toWei(price, "ether")).send({from: userAddress, gas:2000000});
    });
    
    await EthereumAdapter.mint(EthereumAdapter, 'testNft1', 'testHash1', 1000000 );
    const nfts = await EthereumAdapter.getNftList();
    mintedNft = nfts[0];

    const userAddress = await EthereumAdapter.getUserAddress();
    assert(nfts.length === 1, "Length is more than 1");
    assert(mintedNft.owner === accounts[0], "Accounts differ 1");
    assert(accounts[0] === userAddress, "Accounts differ 2");
    assert(mintedNft.address != '0x0000000000000000000000000000000000000000', "Address is zero");
});

describe("EthereumAdapter", () => {
    it("should get nft list of owner", async () => {
        const ownedNftList = await EthereumAdapter.getOwnedNfts(accounts[0]);
        assert(ownedNftList.length === 1);
        const nft = ownedNftList[0];
        assert(nft.name === "testNft1", "Names do not match");
        assert(nft.owner === accounts[0], "Owners do not match");
        assert(nft.ipfsHash === "testHash1", "Ipfs hashes do not match");
        assert(nft.address === mintedNft.address, "Addresses do not match");
    });

    it("should list nft for sale", async () => {
        await EthereumAdapter.listNftForSale(EthereumAdapter, mintedNft.address, "0.0001");
        console.log("listing done")
        const listedNfts = await EthereumAdapter.getListedNfts();

        assert(listedNfts.length === 1, "Not exactly 1 listed nft");
        console.log(listedNfts[0]);
        console.log(mintedNft);
        assert(listedNfts[0].name == mintedNft.name, "Listed and minted nft names differ");
        assert(listedNfts[0].ipfsHash === mintedNft.ipfsHash, "Listed and minted nft ipfsHashes differ");
        assert(listedNfts[0].address == mintedNft.address, "Listed and minted nft addresses differ");
        assert(listedNfts[0].owner == market._address, "Listed and minted nft names differ");
    });

});