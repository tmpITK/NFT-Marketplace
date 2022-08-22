import Interface from "./Interface";
import Market from "../ethereum/market";
import Nft from "../ethereum/nft";
import web3 from "../ethereum/web3";
import { getIpfsUrlFromHash } from "../../utils";

function getMarket(address) {
    return Market(address);
}

function getNft(address) {
    return Nft(address);
}


async function mint(marketAddress, name, url) {
    const market = getMarket(marketAddress);

    console.log("MINTING")
    const userAccount = await getUserAddress();
    await market.methods.mint(name, url)
                        .send({from: userAccount});
    console.log("MINTED");
}


async function getNftList(marketAddress) {

    const market = await getMarket(marketAddress);
    const numberOfNfts = await market.methods.getNumberOfNfts().call();

    const nfts = await Promise.all(
      Array(parseInt(numberOfNfts))
        .fill()
        .map(async (element, index) => {
            const nftAddress = await market.methods.nftList(index).call();
            const nft = getNft(nftAddress);
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


function getNftImage(nft){
    return getIpfsUrlFromHash(nft.ipfsHash);
}


async function getUserAddress(){
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
}


async function getNumberOfOwnedNfts(market, userAddress) {
    const numberOfNfts = await market.methods.getNumberOfOwnedNfts(userAddress).call();
    return numberOfNfts;
}

async function getOwnedNfts(market, userAddress) {
    const numberOfNfts = await getNumberOfOwnedNfts(market, userAddress);
    const userStore = await market.methods.userNftStorageInfoMap(userAddress).call();

    console.log("userStore", userStore);
    
    const nfts = await Promise.all(
      Array(parseInt(numberOfNfts))
        .fill()
        .map(async (element, index) => {
            const nftAddress = await market.methods.getOwnedNft(userAddress, index).call();
            const nft = getNft(nftAddress);
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

async function getListedNfts(marketAddress) {
    const market = await getMarket(marketAddress);
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

              const nft = await getNft(nftAddress);
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

async function getNftListing(market, nftIndex) {
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

async function listNftForSale(marketAddress, nftAddress, price) {
    const market = await getMarket(marketAddress);
    const userAddress = await getUserAddress(marketAddress);
    console.log("userAddress", userAddress);

    const nft = await getNft(nftAddress);
    let nftInfo = await nft.methods.getNftInfo().call();
    console.log("nftInfo", nftInfo);

    await market.methods.listNftForSale(nftAddress, nftInfo[3], web3.utils.toWei(price, "ether")).send({from: userAddress});
    nftInfo = await nft.methods.getNftInfo().call();
    console.log("nftInfo", nftInfo);
}

async function buyNft(marketAddress, nftAddress) {

    const market = await getMarket(marketAddress);
    const nft = await getNft(nftAddress);

    let nftInfo = await nft.methods.getNftInfo().call();
    let nftIndex = nftInfo[3];
    console.log("nftInfo", nftInfo);

    let listing = await getNftListing(market, nftIndex);
    console.log("listing", listing);

    const userAddress = await getUserAddress();
    console.log("userAddress", userAddress);
    let num = await market.methods.getNumberOfOwnedNfts(userAddress).call();
    console.log("num", num);
    await market.methods.buyNft(nftAddress, listing.listing[1], listing.listingIndex).send({from: userAddress, value: listing.listing[1], gas:1000000});
    

    nftInfo = await nft.methods.getNftInfo().call();
    console.log("nftInfo", nftInfo);
    
    let firstNft = await market.methods.getOwnedNft(userAddress, 0).call();
    num = await market.methods.getNumberOfOwnedNfts(userAddress).call();
    listing = await getNftListing(market, nftIndex);
    console.log("listing", listing);
    console.log("num", num);
    console.log("firstNft", firstNft);  
}


let EthereumAdapter = Interface;

EthereumAdapter.getMarket = getMarket;
EthereumAdapter.getNft = getNft;
EthereumAdapter.mint = mint;
EthereumAdapter.getNftList = getNftList;
EthereumAdapter.getNftImage = getNftImage;
EthereumAdapter.getUserAddress = getUserAddress;
EthereumAdapter.getNumberOfOwnedNfts = getNumberOfOwnedNfts;
EthereumAdapter.getOwnedNfts = getOwnedNfts;
EthereumAdapter.getListedNfts = getListedNfts;
EthereumAdapter.listNftForSale = listNftForSale;
EthereumAdapter.buyNft = buyNft;

export default EthereumAdapter;