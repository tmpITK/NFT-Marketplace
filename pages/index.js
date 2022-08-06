import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'

import Market from "../src/chain/ethereum/market";
import Nft from "../src/chain/ethereum/nft";

import Layout from "../components/Layout";
import { Link } from "../routes";
import { getIpfsUrlFromHash } from "../src/utils";

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
              owner: nftInfo[1],
              ipfsHash: nftInfo[2],
              address: nftAddress,
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
    const toShowCase = this.getNumbRandomArrayElements(nfts, );

    const cardItems = toShowCase.map((nft) => {
      return {
        header: nft.name,
        description: (
          <Link route={`/nft/${nft.address}`}>
            <a>Details</a>
          </Link>),
        image: getIpfsUrlFromHash(nft.ipfsHash),
      }
    });
    return <Card.Group class="small images" centered items={cardItems}/>;
  }

  render() {
    return(
      <Layout>
        {this.renderNftPreview()}
      </Layout>
      
    );
  }
}

export default MarketplaceIndex;