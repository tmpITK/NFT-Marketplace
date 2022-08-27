import React, { Component } from 'react';
import Layout from '../components/Layout';
import ChainAdapter from '../src/chain/adapters/ChainAdapter';
import NftCard from '../components/NftCard';
import { Card } from 'semantic-ui-react';

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

    renderOwnedNfts() {
        // could be an interface
        return this.props.ownedNfts.map((nft) => {
            return <NftCard nft={nft} isOwner={true} isListings={false}/>;
        });
    }

    render() {
        return (
        <Layout>
            <h2>NFTs of {this.props.userAddress}</h2>
            {this.props.ownedNfts.length > 0 && <Card.Group>{this.renderOwnedNfts()}</Card.Group>}
        </Layout>
        )
    }
};

export default UserComponent;