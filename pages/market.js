import React, { Component } from 'react';
import Link from '../routes';
import Layout from '../components/Layout';
import EthereumAdapter from '../src/chain/adapters/EthereumAdapter';
import { createCardGroupFromNftList } from '../src/utils';

const ChainAdapter = EthereumAdapter;

class MarketComponent extends Component {

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