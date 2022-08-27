import React, { Component } from 'react';
import Layout from '../components/Layout';
import ChainAdapter from '../src/chain/adapters/ChainAdapter';
import { createCardGroupFromNftList } from '../src/utils';
import NftCard from '../components/NftCard';
import { Card } from 'semantic-ui-react';

class MarketComponent extends Component {

    state = {nfts: ''}

    static async getInitialProps() {
        const nfts = await ChainAdapter.getListedNfts(process.env.MARKET_ADDRESS);
        return {
            nfts: nfts
        }
    }

    renderListing() {
        //could be and inteface
        return this.props.nfts.map((nft) => {
            return <NftCard nft={nft} isOwner={false} isListing={true}/>
        })
    }

    render() {
        return (
        <Layout>
            <Card.Group>{this.renderListing()}</Card.Group>
        </Layout>
        );
    }
}

export default MarketComponent;