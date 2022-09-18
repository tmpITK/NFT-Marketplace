import React from "react";
import NftListRenderingComponent from '../components/NftListRenderingComponent';
import 'semantic-ui-css/semantic.min.css'
import DfinityAdapter from "../src/chain/adapters/DfinityAdapter";
import dynamic from 'next/dynamic'

const DynamicMarketplace = dynamic(
  () => import('../src/chain/dfinity/declarations/marketplace'),
  { ssr: false }
)

const ChainAdapter = new DfinityAdapter(DynamicMarketplace.default)

import Layout from "../components/Layout";

class MarketplaceIndex extends NftListRenderingComponent {

  static async getInitialProps(props) {
    console.log(DfinityAdapter)

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