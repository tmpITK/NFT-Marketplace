import React from 'react';
import Layout from '../components/Layout';
import ChainAdapter from '../src/chain/adapters/ChainAdapter';
import NftListRenderingComponent from '../components/NftListRenderingComponent';


class Marketplace extends NftListRenderingComponent {

    state = {nfts: ''}

    static async getInitialProps() {
        const nfts = await ChainAdapter.getListedNfts();
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