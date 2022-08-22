import React, { Component } from 'react';
import Layout from '../components/Layout';
import ChainAdapter from '../src/chain/adapters/ChainAdapter';
import { createCardGroupFromNftList } from '../src/utils';

class MarketComponent extends Component {

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
            {createCardGroupFromNftList(this.props.nfts, false, true)}
        </Layout>
        );
    }
}

export default MarketComponent;