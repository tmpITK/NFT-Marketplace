import React, { Component } from 'react';
import NftCard from './NftCard';

class NftListRenderingComponent extends Component {

    renderNftList() {

    return this.props.nfts.map((nft) => {
        return (<NftCard nft={nft} isOwner={false} isListing={false}/>);
        });
    }

}

export default NftListRenderingComponent;