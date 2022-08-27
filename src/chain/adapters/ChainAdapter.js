import EthereumAdapter from "./EthereumAdapter";

let ChainAdapter = null;

if (process.env.CHAIN_ENV === 'ethereum') {
    ChainAdapter = EthereumAdapter;
}

export default ChainAdapter;