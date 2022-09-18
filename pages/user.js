import React from 'react';
import Layout from '../components/Layout';
import NftListRenderingComponent from '../components/NftListRenderingComponent';

import DfinityAdapter from "../src/chain/adapters/DfinityAdapter";


class UserDetails extends NftListRenderingComponent {

    static async getInitialProps( props) {
        const isInBroswer = typeof window !== 'undefined';
        let ownedNfts = []
        if(isInBroswer) {
            const marketplace = (await import('../src/chain/dfinity/declarations/marketplace')).marketplace;
            console.log(marketplace)
            const chainAdapter = new DfinityAdapter(marketplace);
            
            ownedNfts = await chainAdapter.getOwnedNfts(props.query.userAddress);
            return {
                userAddress: props.query.userAddress,
                chainAdapter: chainAdapter,
                nfts: ownedNfts
            };
        }else{
            console.log("server side");
            return {nfts: ownedNfts};

        }

    }

    render() {
        return (
        <Layout >
            <h2 className="contrasted-text" style={{textAlign: 'center'}}>NFTs of {this.props.userAddress}</h2>
            {this.props.nfts.length > 0 && this.renderNftList(true)}
        </Layout>
        )
    }
};

export default UserDetails;