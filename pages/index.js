import React from "react";
import NftListRenderingComponent from './components/NftListRenderingComponent';
import 'semantic-ui-css/semantic.min.css'
import ChainAdapter from "../src/chain/adapters/ChainAdapter";

import Layout from "./components/Layout";

class MarketplaceIndex extends NftListRenderingComponent {

  static async getInitialProps(props) {
    let nfts = await ChainAdapter.getNftList();
    nfts = nfts.slice(-3);
    return {
      nfts: nfts
    };
  }

  render() {
    return(
      <Layout>
          {this.renderNftList()}
      </Layout>
      
    );
  }
}

export default MarketplaceIndex;