import React, { Component } from "react";
import { Card } from "semantic-ui-react";

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

            return {
              name: nftInfo[0],
              address: nftInfo[1],
              url: nftInfo[2],
            };
        })
    );
    console.log(nfts);

    return {
      nfts: nfts
    };
  }

  getNumbRandomArrayElements(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 -Math.random());
    return shuffled.slice(0, num);
  }

  renderNftPreview() {
    const nfts = this.props.nfts;
    const toShowCase = this.getNumbRandomArrayElements(nfts, 1);

    const cardItems = toShowCase.map((nft) => {
      return {
        header: nft.name,
        description: nft.address,
        image: nft.url
      }
    });
    return <Card.Group items={cardItems} />;
  }

  render() {
    return(
      <div>          
        {this.renderNftPreview()}
      </div>
      
    );
  }
}

export default MarketplaceIndex;