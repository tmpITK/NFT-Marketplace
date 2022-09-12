import React from 'react';
import Layout from '../components/dynamic/DynamicLayout';
import ChainAdapter from '../src/chain/adapters/ChainAdapter';
import NftListRenderingComponent from '../components/dynamic/DynamicNftListRenderingComponent';

class UserDetails extends NftListRenderingComponent {

    static async getInitialProps(props) {
        const ownedNfts = await ChainAdapter.getOwnedNfts(props.query.userAddress);
        return {
            userAddress: props.query.userAddress,
            nfts: ownedNfts
        };
    }

    render() {
        return (
        <Layout>
            <h2 className="contrasted-text" style={{textAlign: 'center'}}>NFTs of {this.props.userAddress}</h2>
            {this.props.nfts.length > 0 && this.renderNftList(true)}
        </Layout>
        )
    }
};

export default UserDetails;