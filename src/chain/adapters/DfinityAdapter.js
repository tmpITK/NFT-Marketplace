import { getIpfsUrlFromHash } from "../../utils";
import { Principal } from "@dfinity/principal";

class DfinityAdapter {

    constructor(market) {
        this.market = market;
    }

    async mint(name, url) {
        console.log("MINTING");
        await this.market.mint(url, name);
        console.log("MINTED");
    }

    async getOwnedNfts(userId) {
        return await this.market.getOwnedNfts(userId);
    }

    async getNftList() {
        return [];
    }

    async getUserAddress() {
        // right now only testing user for dfinity
        const test_user_id = Principal.from_text("2vxsx-fae");
        return test_user_id;
    }

}

export default DfinityAdapter;