import React, { Component } from 'react';
import Layout from '../components/Layout';
import EthereumAdapter from '../src/chain/adapters/EthereumAdapter';
import { Card } from "semantic-ui-react";
import { Link } from "../routes";

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

    renderOwnedNfts() {
        const cardItems = this.props.ownedNfts.map((nft) => {
            return {
                header: nft.name,
                description: (
                <Link route={`/nft/${nft.address}`}>
                    <a>Details</a>
                </Link>),
                image: ChainAdapter.getNftImage(nft),
            }
        });
        return <Card.Group centered items={cardItems}/>;
    }

    render() {
        return (
        <Layout>
            <h2>NFTs of {this.props.userAddress}</h2>
            {this.renderOwnedNfts()}
        </Layout>
        )
    }
};

export default UserComponent;