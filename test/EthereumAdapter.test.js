const assert = require("assert");
const sinon = require("sinon");
const EthereumAdapterImport = require("../src/chain/adapters/EthereumAdapter");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider({gasLimit: 800000000}));

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
    })
    
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
        assert(nft.name === "testNft1");
        assert(nft.owner === accounts[0]);
        assert(nft.ipfsHash === "testHash1");
        assert(nft.address === mintedNft.address);
    });

});