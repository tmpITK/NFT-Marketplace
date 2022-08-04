import web3 from "./web3";
import Market from "./build/Market.json";

const market = (address) => {
    return new web3.eth.Contract(Market.abi, address);
}

export default market;