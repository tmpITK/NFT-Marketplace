import EthereumAdapter from "./EthereumAdapter";
import web3 from "../ethereum/web3";

let ChainAdapter = null;

if (process.env.CHAIN_ENV === 'ethereum') {
    ChainAdapter = new EthereumAdapter(web3);
}

export default ChainAdapter;