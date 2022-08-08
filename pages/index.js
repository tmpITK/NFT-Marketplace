import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'

import EthereumAdapter from "../src/chain/adapters/EtehreumAdapter";

import Layout from "../components/Layout";
import { Link } from "../routes";
import { getIpfsUrlFromHash } from "../src/utils";

class MarketplaceIndex extends Component {

  static async getInitialProps(props) {
    const market = await EthereumAdapter.getMarket("0xD79aD96386972832232D1E2EB292E20291be1cd4");
    const numberOfNfts = await market.methods.getNumberOfNfts().call();

    const nfts = await Promise.all(
      Array(parseInt(numberOfNfts))
        .fill()
        .map(async (element, index) => {
            const nftAddress = await market.methods.nftList(index).call();
            const nft = EthereumAdapter.getNft(nftAddress);
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

  renderNftPreview() {
    const nfts = this.props.nfts;
    const toShowCase = nfts.slice(-3);

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
    return <Card.Group centered items={cardItems}/>;
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