import React, { Component } from "react";

import Market from "../src/chain/ethereum/market";
import Nft from "../src/chain/ethereum/nft";
import MintForm from "../components/MintForm";

class MarketplaceIndex extends Component {

  static async getInitialProps(props) {
    const market = await Market("0xD79aD96386972832232D1E2EB292E20291be1cd4");
    const numberOfNfts = await market.methods.getNumberOfNfts().call();
    
    const nfts = await Promise.all(
      Array(parseInt(numberOfNfts))
        .fill()
        .map(async (element, index) => {
            const nftAddress = await market.methods.nftList(index).call();
            const nft = Nft(nftAddress);
            const nftInfo = await nft.methods.getNftInfo().call();
            return nftInfo;
        })
    );
    console.log(nfts);

    return {
      nfts: nfts
    };
  }

  render() {
    return(
      <div>          
      NFT name {this.props.nfts[0][0]} NFT owner {this.props.nfts[0][1]} NFT IPFS url {this.props.nfts[0][2]}
      </div>
      
    );
  }
}

export default MarketplaceIndex;