import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import NftCard from './NftCard';

class NftListRenderingComponent extends Component {

    renderNftList(isOwner=false, isListing=false) {

    return (
    <Card.Group centered>
        {
            this.props.nfts.map((nft) => {
            return (<NftCard key={nft.address} nft={nft} isOwner={isOwner} isListing={isListing}/>);
            })
        }
    </Card.Group>)
    }

}

export default NftListRenderingComponent;