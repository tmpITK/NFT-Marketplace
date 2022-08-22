import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css'
import { createCardGroupFromNftList } from "../src/utils";
import ChainAdapter from "../src/chain/adapters/ChainAdapter";

import Layout from "../components/Layout";

class MarketplaceIndex extends Component {

  static async getInitialProps(props) {
    const nfts = await ChainAdapter.getNftList(process.env.MARKET_ADDRESS);

    return {
      nfts: nfts
    };
  }

  renderNftPreview() {
    const nfts = this.props.nfts;
    const toShowCase = nfts.slice(-3);
    
    return createCardGroupFromNftList(toShowCase);
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