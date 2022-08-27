import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css'
import NftCard from '../components/NftCard';
import ChainAdapter from "../src/chain/adapters/ChainAdapter";
import { Card } from 'semantic-ui-react';


import Layout from "../components/Layout";

class MarketplaceIndex extends Component {

  static async getInitialProps(props) {
    const nfts = await ChainAdapter.getNftList(process.env.MARKET_ADDRESS);

    return {
      nfts: nfts
    };
  }

  renderNftPreview() {
    //coudl be an interface
    const nfts = this.props.nfts;
    const toShowCase = nfts.slice(-3);

    return toShowCase.map((nft) => {
      return (<NftCard nft={nft} isOwner={false} isListing={false}/>);
    });
  }

  render() {
    return(
      <Layout>
        <Card.Group>
          {this.renderNftPreview()}
        </Card.Group>
      </Layout>
      
    );
  }
}

export default MarketplaceIndex;