import React from 'react';
import Layout from '../components/Layout';
import ChainAdapter from '../src/chain/adapters/ChainAdapter';
import { Card } from 'semantic-ui-react';
import NftListRenderingComponent from '../components/NftListRenderingComponent';


class Marketplace extends NftListRenderingComponent {

    state = {nfts: ''}

    static async getInitialProps() {
        const nfts = await ChainAdapter.getListedNfts(process.env.MARKET_ADDRESS);
        return {
            nfts: nfts
        }
    }

    render() {
        return (
        <Layout>
            {this.renderNftList(false, true)}
        </Layout>
        );
    }
}

export default Marketplace;