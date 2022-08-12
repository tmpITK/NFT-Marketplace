import React, { Component } from 'react';
import Link from '../routes';
import Layout from '../components/Layout';
import EthereumAdapter from '../src/chain/adapters/EthereumAdapter';


class MarketComponent extends Component {

    render() {
        return (
        <Layout>
            This is the market!
        </Layout>
        );
    }
}

export default MarketComponent;