import web3 from "../ethereum/web3";
import Market from "../ethereum/market";
import { marketplace } from "../dfinity/declarations/marketplace";
import EthereumAdapter from "./EthereumAdapter";

let ChainAdapter = null;

if (process.env.CHAIN_ENV === 'ethereum') {
    const market = Market(process.env.MARKET_ADDRESS);
    ChainAdapter = new EthereumAdapter(web3, market);
} else if (process.env.CHAIN_ENV === 'dfinity') {
    console.log("MIVAAAAN")
    const DfinityAdapter = (await import('./DfinityAdapter')).default
    ChainAdapter = new DfinityAdapter(marketplace);
    console.log("LOADEEEED")
}

export default ChainAdapter;