import DfinityAdapter from "./DfinityAdapter";
import { marketplace } from "../dfinity/declarations/marketplace";

let ChainAdapter =  new DfinityAdapter(marketplace);

export default ChainAdapter;