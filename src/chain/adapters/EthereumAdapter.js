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
    const accounts = await getUserAddress();
    await market.methods.mint(name, url)
                        .send({from: accounts});
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
    console.log("wot")
    const numberOfNfts = await getNumberOfOwnedNfts(market, userAddress);
    console.log(numberOfNfts);
    
    console.log("pics")
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
    console.log("kiscica")
    return nfts;
}

async function getListedNfts(marketAddress) {
    const market = await getMarket(marketAddress);
    const numberOfListedNfts = await market.methods.getNumberOfListedNfts().call();

    const nfts = await Promise.all(
        Array(parseInt(numberOfListedNfts))
          .fill()
          .map(async (element, index) => {
              const nftListing = await market.methods.listings(index).call();
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
      return nfts;
}

async function listNftForSale(marketAddress, nftAddress, price) {
    const market = getMarket(marketAddress);
    const userAddress = await getUserAddress(marketAddress);

    const nft = await getNft(nftAddress);
    const nftInfo = await nft.methods.getNftInfo().call();

    await market.methods.listNftForSale(nftAddress, nftInfo[3], web3.utils.toWei(price, "ether")).send({from: userAddress});
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

export default EthereumAdapter;