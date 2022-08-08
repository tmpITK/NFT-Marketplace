import Interface from "./Interface";
import Market from "../ethereum/market";
import Nft from "../ethereum/nft";

function getMarket(address) {
    return Market(address);
}

function getNft(address) {
    return Nft(address);
}


let EthereumAdapter = Interface;

EthereumAdapter.getMarket = getMarket;
EthereumAdapter.getNft = getNft;

export default EthereumAdapter;