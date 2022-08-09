import Interface from "./Interface";
import Market from "../ethereum/market";
import Nft from "../ethereum/nft";
import web3 from "../ethereum/web3";

function getMarket(address) {
    return Market(address);
}

function getNft(address) {
    return Nft(address);
}


async function mint(marketAddress) {
    const market = getMarket(marketAddress);

    console.log("MINTING")
    const accounts = await web3.eth.getAccounts();
    await market.methods.mint(this.state.name, this.state.url)
                        .send({from: accounts[0]});
    console.log("MINTED");
}


let EthereumAdapter = Interface;

EthereumAdapter.getMarket = getMarket;
EthereumAdapter.getNft = getNft;
EthereumAdapter.mint = mint;

export default EthereumAdapter;