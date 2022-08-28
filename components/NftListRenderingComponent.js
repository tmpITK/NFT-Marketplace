import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import NftCard from './NftCard';

class NftListRenderingComponent extends Component {

    renderNftList() {

    return (
    <Card.Group centered>
        {
            this.props.nfts.map((nft) => {
            return (<NftCard key={nft.address} nft={nft} isOwner={false} isListing={false}/>);
            })
        }
    </Card.Group>)
    }

}

export default NftListRenderingComponent;