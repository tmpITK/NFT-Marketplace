import React from "react";
import NftListRenderingComponent from '../components/NftListRenderingComponent';
import 'semantic-ui-css/semantic.min.css'
import DfinityAdapter from "../src/chain/adapters/DfinityAdapter";


import Layout from "../components/Layout";

class MarketplaceIndex extends NftListRenderingComponent {

  static async getInitialProps(props) {
    const isInBroswer = typeof window !== 'undefined';
    let nfts = [];
    if(isInBroswer) {
      const marketplace = (await import('../src/declarations/marketplace')).marketplace;
      console.log(marketplace)
      const chainAdapter = new DfinityAdapter(marketplace);

      nfts = await chainAdapter.getShowCaseNfts();
      nfts = nfts.slice(-3);
      return {
        nfts: nfts,
        chainAdapter: chainAdapter
      };
    } else {
      console.log("server side");
      return {nfts: nfts};

    }
  }

  render() {
    console.log(process.env.DFX_NETWORK)
    return(
      <Layout >
          {this.renderNftList()}
      </Layout>
      
    );
  }
}

export default MarketplaceIndex;