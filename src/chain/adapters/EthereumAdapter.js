import Market from "../ethereum/market";
import Nft from "../ethereum/nft";
import { getIpfsUrlFromHash } from "../../utils";

class EthereumAdapter {
    constructor(web3Provider, market, nftFactory=Nft) {
        this.web3 = web3Provider;
        this.market = market;
        this.nftFactory = nftFactory;
    }

    getMarket(address) {
        return Market(address);
    }
    
    async getNft(address) {
        const nft = await this.nftFactory(address)
        return nft;
    }
    
    
    async mint(name, url) {
        console.log("MINTING")
        const userAccount = await this.getUserAddress();
        await this.market.methods.mint(name, url)
                            .send({from: userAccount});
        console.log("MINTED");
    }
    
    
    async getNftList() {
        const numberOfNfts = await this.market.methods.getNumberOfNfts().call();
        const nfts = await Promise.all(
            Array(parseInt(numberOfNfts))
            .fill()
            .map(async (element, index) => {
                const nftAddress = await this.market.methods.nftList(index).call();
                const nft = await this.getNft(nftAddress);
                const nftInfo = await nft.methods.getNftInfo().call();
    
                return {
                    name: nftInfo[0],
                    owner: nftInfo[1],
                    ipfsHash: nftInfo[2],
                    address: nftAddress,
                };
            })
        );
        return nfts;
    }

    getNftImage(nft){
        return getIpfsUrlFromHash(nft.ipfsHash);
    }
    
    
    async getUserAddress(){
        const accounts = await this.web3.eth.getAccounts();
        return accounts[0];
    }
    
    
    async getNumberOfOwnedNfts(userAddress) {
        const numberOfNfts = await this.market.methods.getNumberOfOwnedNfts(userAddress).call();
        return numberOfNfts;
    }
    
    async getOwnedNfts(userAddress) {
        const numberOfNfts = await this.getNumberOfOwnedNfts(userAddress);
    
        const nfts = await Promise.all(
            Array(parseInt(numberOfNfts))
                .fill()
                .map(async (element, index) => {
                    const nftAddress = await this.market.methods.getOwnedNft(userAddress, index).call();
                    const nft = await this.getNft(nftAddress);
                    const nftInfo = await nft.methods.getNftInfo().call();
        
                    return {
                        name: nftInfo[0],
                        owner: nftInfo[1],
                        ipfsHash: nftInfo[2],
                        address: nftAddress,
                    };
                })
            );
        return nfts;
    }
    
    async getListedNfts() {
        const numberOfListedNfts = await this.market.methods.getNumberOfListedNfts().call();
        const nfts = await Promise.all(
            Array(parseInt(numberOfListedNfts))
                .fill()
                .map(async (element, index) => {
                    const nftListing = await this.market.methods.listings(index).call();
        
                    if(nftListing[2] == "0x0000000000000000000000000000000000000000"){
                    return {
                        name: null,
                    };
                }
                const nftAddress = await this.market.methods.nftList(nftListing[0]).call();
    
                const nft = await this.getNft(nftAddress);
                const nftInfo = await nft.methods.getNftInfo().call();
    
                return {
                    name: nftInfo[0],
                    owner: nftInfo[1],
                    ipfsHash: nftInfo[2],
                    address: nftAddress,
                };
            })
        );
        const filteredNfts = nfts.filter(nft => nft.name != null);
        return filteredNfts;
    }
    
    async getNftListing(nftIndex) {
        const numListedNfts = await this.market.methods.getNumberOfListedNfts().call();
    
        for (let i = 0; i < numListedNfts; i++) {
            const listing = await this.market.methods.listings(i).call();
            if(listing.index == nftIndex && listing.price > 0) {
                return {
                    listing: listing,
                    listingIndex: i
                }
            }
        }
    }
    
    async listNftForSale(nftAddress, price) {
        const userAddress = await this.getUserAddress();
        const nft = await this.getNft(nftAddress);
        let nftInfo = await nft.methods.getNftInfo().call();
    
        await this.market.methods.listNftForSale(nftAddress, nftInfo[3], this.web3.utils.toWei(price, "ether")).send({from: userAddress});
    }
    
    async buyNft(nftAddress) {
    
        const nft = await this.getNft(nftAddress);
    
        let nftInfo = await nft.methods.getNftInfo().call();
        let nftIndex = nftInfo[3];
    
        let listing = await this.getNftListing(nftIndex);
    
        const userAddress = await this.getUserAddress();
        let num = await this.market.methods.getNumberOfOwnedNfts(userAddress).call();
        await this.market.methods.buyNft(nftAddress, listing.listing[1], listing.listingIndex).send({from: userAddress, value: listing.listing[1], gas:1000000});
        
    
        nftInfo = await nft.methods.getNftInfo().call();
        
        let firstNft = await this.market.methods.getOwnedNft(userAddress, 0).call();
        num = await this.market.methods.getNumberOfOwnedNfts(userAddress).call();
        listing = await this.getNftListing(nftIndex);
    }

}

export default EthereumAdapter;