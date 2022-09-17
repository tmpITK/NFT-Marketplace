import EthereumAdapter from "./EthereumAdapter";
import web3 from "../ethereum/web3";
import Market from "../ethereum/market";

let ChainAdapter = null;

if (process.env.CHAIN_ENV === 'ethereum') {
    const market = Market(process.env.MARKET_ADDRESS);
    ChainAdapter = new EthereumAdapter(web3, market);
}

export default ChainAdapter;