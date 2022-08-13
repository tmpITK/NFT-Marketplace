import React, { Component } from 'react';
import Layout from '../components/Layout';
import EthereumAdapter from '../src/chain/adapters/EthereumAdapter';
import { Card } from "semantic-ui-react";
import { Link } from "../routes";
import { createCardGroupFromNftList } from '../src/utils';

const ChainAdapter = EthereumAdapter;

class UserComponent extends Component {

    static async getInitialProps(props) {
        console.log(1)
        const market = await ChainAdapter.getMarket(process.env.MARKET_ADDRESS);
        console.log(2)
        const ownedNfts = await ChainAdapter.getOwnedNfts(market, props.query.userAddress);
        console.log(3)
        return {
            userAddress: props.query.userAddress,
            ownedNfts: ownedNfts
        };
    }

    render() {
        console.log(4)
        return (
        <Layout>
            <h2>NFTs of {this.props.userAddress}</h2>
            {this.props.ownedNfts.length > 0 && createCardGroupFromNftList(this.props.ownedNfts, true)}
        </Layout>
        )
    }
};

export default UserComponent;