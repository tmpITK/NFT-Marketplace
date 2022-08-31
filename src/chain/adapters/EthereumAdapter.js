import AdapterInterface from "./Interface";
import Market from "../ethereum/market";
import Nft from "../ethereum/nft";
import { getIpfsUrlFromHash } from "../../utils";

class EthereumAdapter {
    constructor(web3Provider) {
        this.web3 = web3Provider;
    }

    getMarket(address) {
        return Market(address);
    }
    
    getNft(address) {
        return Nft(address);
    }
    
    
    async mint(marketAddress, name, url) {
        const market = this.getMarket(marketAddress);
    
        console.log("MINTING")
        const userAccount = await this.getUserAddress();
        await market.methods.mint(name, url)
                            .send({from: userAccount});
        console.log("MINTED");
    }
    
    
    async getNftList(marketAddress) {
    
        const market = await this.getMarket(marketAddress);
        const numberOfNfts = await market.methods.getNumberOfNfts().call();
    
        const nfts = await Promise.all(
            Array(parseInt(numberOfNfts))
            .fill()
            .map(async (element, index) => {
                const nftAddress = await market.methods.nftList(index).call();
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
    
    
    async getNumberOfOwnedNfts(market, userAddress) {
        const numberOfNfts = await market.methods.getNumberOfOwnedNfts(userAddress).call();
        return numberOfNfts;
    }
    
    async getOwnedNfts(market, userAddress) {
        const numberOfNfts = await this.getNumberOfOwnedNfts(market, userAddress);
        console.log8
        const userStore = await market.methods.userNftStorageInfoMap(userAddress).call();
    
        const nfts = await Promise.all(
            Array(parseInt(numberOfNfts))
                .fill()
                .map(async (element, index) => {
                    console.log(index);
                    const nftAddress = await market.methods.getOwnedNft(userAddress, index).call();
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
    
    async getListedNfts(marketAddress) {
        const market = await this.getMarket(marketAddress);
        const numberOfListedNfts = await market.methods.getNumberOfListedNfts().call();
        console.log('num listed', numberOfListedNfts);
        const nfts = await Promise.all(
            Array(parseInt(numberOfListedNfts))
                .fill()
                .map(async (element, index) => {
                    const nftListing = await market.methods.listings(index).call();
        
                    if(nftListing[2] == "0x0000000000000000000000000000000000000000"){
                    return {
                        name: null,
                    };
                }
                const nftAddress = await market.methods.nftList(nftListing[0]).call();
    
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
    
    async getNftListing(market, nftIndex) {
        const numListedNfts = await market.methods.getNumberOfListedNfts().call();
    
    
        for (let i = 0; i < numListedNfts; i++) {
            const listing = await market.methods.listings(i).call();
            if(listing.index == nftIndex && listing.price > 0) {
                return {
                    listing: listing,
                    listingIndex: i
                }
            }
        }
    }
    
    async listNftForSale(marketAddress, nftAddress, price) {
        const market = await this.getMarket(marketAddress);
        const userAddress = await this.getUserAddress(marketAddress);
        console.log("userAddress", userAddress);
    
        const nft = await this.getNft(nftAddress);
        let nftInfo = await nft.methods.getNftInfo().call();
        console.log("nftInfo", nftInfo);
    
        await market.methods.listNftForSale(nftAddress, nftInfo[3], this.web3.utils.toWei(price, "ether")).send({from: userAddress});
        nftInfo = await nft.methods.getNftInfo().call();
        console.log("nftInfo", nftInfo);
    }
    
    async buyNft(marketAddress, nftAddress) {
    
        const market = await this.getMarket(marketAddress);
        const nft = await this.getNft(nftAddress);
    
        let nftInfo = await nft.methods.getNftInfo().call();
        let nftIndex = nftInfo[3];
        console.log("nftInfo", nftInfo);
    
        let listing = await this.getNftListing(market, nftIndex);
        console.log("listing", listing);
    
        const userAddress = await this.getUserAddress();
        console.log("userAddress", userAddress);
        let num = await market.methods.getNumberOfOwnedNfts(userAddress).call();
        console.log("num", num);
        await market.methods.buyNft(nftAddress, listing.listing[1], listing.listingIndex).send({from: userAddress, value: listing.listing[1], gas:1000000});
        
    
        nftInfo = await nft.methods.getNftInfo().call();
        console.log("nftInfo", nftInfo);
        
        let firstNft = await market.methods.getOwnedNft(userAddress, 0).call();
        num = await market.methods.getNumberOfOwnedNfts(userAddress).call();
        listing = await this.getNftListing(market, nftIndex);
        console.log("listing", listing);
        console.log("num", num);
        console.log("firstNft", firstNft);  
    }

}

export default EthereumAdapter;