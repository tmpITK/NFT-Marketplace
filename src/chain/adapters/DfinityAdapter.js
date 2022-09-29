import { getIpfsUrlFromHash } from "../../utils";
import { Principal } from "@dfinity/principal";
import { Actor, HttpAgent } from "@dfinity/agent";

class DfinityAdapter {

    constructor(market) {
        this.market = market;
        const localHost = "http://localhost:8000/"; // TODO env var
        this.agent = new HttpAgent({ host: localHost });
    }

    async mint(name, url) {
        console.log("MINTING");
        await this.market.mint(url, name);
        console.log("MINTED");
    }

    async getOwnedNfts(userId) {

        const ownedNftPrincipals = await this.market.getOwnedNfts(Principal.fromText(userId));
        const { idlFactory } = (await import('../../declarations/nft'));

        const nfts = await Promise.all(
            Array(parseInt(ownedNftPrincipals.length))
                .fill()
                .map(async (element, index) => {
                    const nftAddress = ownedNftPrincipals[index];
                    const nft = await this.getNft(nftAddress, idlFactory);;
                    return {
                        name: await nft.getName(),
                        owner: await nft.getOwner(),
                        ipfsHash: await nft.getIpfsHash(),
                        address: nftAddress,
                    };
                })
            );

        return nfts;
    }

    getNft(principal, idlFactory) {
        return Actor.createActor(idlFactory, {
            agent: this.agent,
            canisterId: principal,
          });
    }

    async getNftList() {
        return [];
    }

    async getUserAddress() {
        // right now only testing user for dfinity
        const test_user_id = Principal.fromText("2vxsx-fae");
        return test_user_id;
    }

    async getListedNfts() {
        console.log("Nfts listed");
        return [];
    }

    getNftImage(nft) {
        return getIpfsUrlFromHash(nft.ipfsHash);
    }

}

export default DfinityAdapter;