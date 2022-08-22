import React, { Component } from 'react';
import Layout from '../components/Layout';
import ChainAdapter from '../src/chain/adapters/ChainAdapter';
import { createCardGroupFromNftList } from '../src/utils';

class UserComponent extends Component {

    static async getInitialProps(props) {
        const market = await ChainAdapter.getMarket(process.env.MARKET_ADDRESS);
        console.log("user")
        console.log(market._address);
        const ownedNfts = await ChainAdapter.getOwnedNfts(market, props.query.userAddress);
        return {
            userAddress: props.query.userAddress,
            ownedNfts: ownedNfts
        };
    }

    render() {
        return (
        <Layout>
            <h2>NFTs of {this.props.userAddress}</h2>
            {this.props.ownedNfts.length > 0 && createCardGroupFromNftList(this.props.ownedNfts, true)}
        </Layout>
        )
    }
};

export default UserComponent;