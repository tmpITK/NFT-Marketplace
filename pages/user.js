import React, { Component } from 'react';
import Layout from '../components/Layout';
import ChainAdapter from '../src/chain/adapters/ChainAdapter';
import { Card } from 'semantic-ui-react';
import NftListRenderingComponent from '../components/NftListRenderingComponent';

class UserDetails extends NftListRenderingComponent {

    static async getInitialProps(props) {
        const market = await ChainAdapter.getMarket(process.env.MARKET_ADDRESS);
        console.log("user")
        console.log(market._address);
        const ownedNfts = await ChainAdapter.getOwnedNfts(market, props.query.userAddress);
        console.log("ownedNfts", ownedNfts)
        return {
            userAddress: props.query.userAddress,
            nfts: ownedNfts
        };
    }

    render() {
        return (
        <Layout>
            <h2 class="contrasted-text" style={{textAlign: 'center'}}>NFTs of {this.props.userAddress}</h2>
            {this.props.nfts.length > 0 && this.renderNftList()}
        </Layout>
        )
    }
};

export default UserDetails;