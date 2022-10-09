import React from 'react';
import Layout from '../components/Layout';
import NftListRenderingComponent from '../components/NftListRenderingComponent';

import DfinityAdapter from "../src/chain/adapters/DfinityAdapter";


class UserDetails extends NftListRenderingComponent {

    static async getInitialProps(props) {
        const isInBroswer = typeof window !== 'undefined';
        let ownedNfts = []
        if(isInBroswer) {
            const marketplace = (await import('../src/declarations/marketplace')).marketplace;
            const chainAdapter = new DfinityAdapter(marketplace);
            ownedNfts = await chainAdapter.getOwnedNfts(props.query.userAddress);

            return {
                userAddress: props.query.userAddress,
                chainAdapter: chainAdapter,
                nfts: ownedNfts,
                isInBroswer: isInBroswer
            };
        }else{
            console.log("server side");
            return {nfts: ownedNfts, isInBroswer: false};

        }

    }

    render() {
        console.log("this.props.nfts")
        console.log(this.props.nfts)
        if(this.props.isInBroswer){
            return (
                <Layout LOCAL_II_CANISTER_ID={process.env.LOCAL_II_CANISTER_ID}>
                    <h2 className="contrasted-text" style={{textAlign: 'center'}}>NFTs of {this.props.userAddress}</h2>
                    {this.props.nfts.length > 0 && this.renderNftList(true)}
                </Layout>
            )
        }
        return (
            <Layout LOCAL_II_CANISTER_ID={process.env.LOCAL_II_CANISTER_ID}>
                <h2 className="contrasted-text" style={{textAlign: 'center'}}>NFTs of {this.props.userAddress}</h2>
            </Layout>
        )
    }
};

export default UserDetails;