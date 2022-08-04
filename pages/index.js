import React, { Component } from "react";

import Market from "../src/chain/ethereum/market";
import Nft from "../src/chain/ethereum/nft";

class MarketplaceIndex extends Component {

  static async getInitialProps(props) {
    const market = await Market("0xa456f96b12a27574B74244119F369E581e0c869D");
    const numberOfNfts = await market.methods.getNumberOfNfts().call();

    const nfts = await Promise.all(
      Array(parseInt(numberOfNfts))
        .fill()
        .map((element, index) => {
            const nftAddress = market.methods.nftList(index).call();
            const nft = Nft(nftAddress);
            const nftInfo = nft.methods.getNftInfo().call();
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
      <h1>Welcome to NFT Marketplace</h1>
    );
  }
}

export default MarketplaceIndex;