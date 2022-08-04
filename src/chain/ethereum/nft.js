import web3 from "./web3";
import Nft from "./build/Nft.json";

const nft = (address) => {
    return new web3.eth.Contract(Nft.abi, address);
}

export default nft;