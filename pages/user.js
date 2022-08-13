import React, { Component } from 'react';
import Layout from '../components/Layout';
import EthereumAdapter from '../src/chain/adapters/EthereumAdapter';
import { Card } from "semantic-ui-react";
import { Link } from "../routes";
import { createCardGroupFromNftList } from '../src/utils';

const ChainAdapter = EthereumAdapter;

class UserComponent extends Component {

    static async getInitialProps(props) {
        const market = await ChainAdapter.getMarket(process.env.MARKET_ADDRESS);
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
            {createCardGroupFromNftList(this.props.ownedNfts)}
        </Layout>
        )
    }
};

export default UserComponent;