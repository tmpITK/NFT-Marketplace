import AdapterInterface from "./Interface";
import Market from "../ethereum/market";
import Nft from "../ethereum/nft";
import { getIpfsUrlFromHash } from "../../utils";

class EthereumAdapter {
    constructor(web3Provider, market) {
        this.web3 = web3Provider;
        this.market = market;
    }

    getMarket(address) {
        return Market(address);
    }
    
    getNft(address) {
        return Nft(address);
    }
    
    
    async mint(name, url) {
        console.log("MINTING")
        const userAccount = await this.getUserAddress();
        console.log(userAccount);
        console.log(this.market.methods)
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
                const nft = this.getNft(nftAddress);
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
                    console.log(index);
                    const nftAddress = await this.market.methods.getOwnedNft(userAddress, index).call();
                    console.log("nftAddress", nftAddress);
                    const nft = this.getNft(nftAddress);
                    const nftInfo = await nft.methods.getNftInfo().call();
                    console.log("nftInfo", nftInfo);
        
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
        console.log('num listed', numberOfListedNfts);
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
        console.log("userAddress", userAddress);
    
        const nft = await this.getNft(nftAddress);
        let nftInfo = await nft.methods.getNftInfo().call();
        console.log("nftInfo", nftInfo);
    
        await this.market.methods.listNftForSale(nftAddress, nftInfo[3], this.web3.utils.toWei(price, "ether")).send({from: userAddress});
        nftInfo = await nft.methods.getNftInfo().call();
        console.log("nftInfo", nftInfo);
    }
    
    async buyNft(nftAddress) {
    
        const nft = await this.getNft(nftAddress);
    
        let nftInfo = await nft.methods.getNftInfo().call();
        let nftIndex = nftInfo[3];
        console.log("nftInfo", nftInfo);
    
        let listing = await this.getNftListing(nftIndex);
        console.log("listing", listing);
    
        const userAddress = await this.getUserAddress();
        console.log("userAddress", userAddress);
        let num = await this.market.methods.getNumberOfOwnedNfts(userAddress).call();
        console.log("num", num);
        await this.market.methods.buyNft(nftAddress, listing.listing[1], listing.listingIndex).send({from: userAddress, value: listing.listing[1], gas:1000000});
        
    
        nftInfo = await nft.methods.getNftInfo().call();
        console.log("nftInfo", nftInfo);
        
        let firstNft = await this.market.methods.getOwnedNft(userAddress, 0).call();
        num = await this.market.methods.getNumberOfOwnedNfts(userAddress).call();
        listing = await this.getNftListing(nftIndex);
        console.log("listing", listing);
        console.log("num", num);
        console.log("firstNft", firstNft);  
    }

}

export default EthereumAdapter;