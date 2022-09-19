import { Card, Image, Form, Button } from 'semantic-ui-react';
import { Link } from '../routes';
import ChainAdapter from './chain/adapters/ChainAdapter';


export function getIpfsUrlFromHash(hash) {
    return  `https://ipfs.io/ipfs/${hash}`;
}


export function createCardGroupFromNftList(nftList, isOwner=false, isListing=false) {
    if (nftList) {
        const cardItems = nftList.map((nft) => {
            return {
                header: nft.name,
                description: (
                <div>
                    <Link route={`/nft/${nft.address}`}>
                        <a>Details<br/></a>
                    </Link>
                    {isOwner && 
                        <Link route={`/nft/sell/${nft.address}`}>
                            <a>Sell</a>
                        </Link>
                    }
                    {
                        isListing
                    }
                </div>),
                image: ChainAdapter.getNftImage(nft),
            }
        });
        return <Card.Group centered items={cardItems}/>;
    }


}