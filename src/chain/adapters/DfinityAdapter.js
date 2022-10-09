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
        const nfts = await this.getNftList(ownedNftPrincipals);
        return nfts;
    }

    getNft(principal, idlFactory) {
        return Actor.createActor(idlFactory, {
            agent: this.agent,
            canisterId: principal,
          });
    }

    async listNftForSale(nftPrincipal, price) {
        const result = this.market.listNftForSale(Principal.fromText(nftPrincipal), parseInt(price));
        console.log(result);
    } 

    async getExistingNfts() {
        console.log("Existing   ")
        const existingNftPrincipals = await this.market.getExistingNfts();
        console.log(existingNftPrincipals);

        const nfts = this.getNftList(existingNftPrincipals);
        return nfts;
    }

    async getNftList(principals) {
        const { idlFactory } = (await import('../../declarations/nft'));

        const nfts =  await Promise.all(
            Array(parseInt(principals.length))
                .fill()
                .map(async (element, index) => {
                    const nftAddress = principals[index];
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

    async getUserAddress(whoami_actor) {
        console.log(whoami_actor, "whomai in getuseraddress")
        const test_user_id = await whoami_actor.whoami();
        return test_user_id;
    }

    async getListedNfts() {
        console.log("Nfts listed");
        const listings = await this.market.getListings();

        const nfts = await this.getNftList(listings);
        console.log(nfts);
        return nfts;
    }

    getNftImage(nft) {
        return getIpfsUrlFromHash(nft.ipfsHash);
    }

}

export default DfinityAdapter;