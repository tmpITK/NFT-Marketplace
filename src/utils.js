import { Card, Form, Button } from 'semantic-ui-react';
import { Link } from '../routes';
import Buy from '../components/Buy';
import EthereumAdapter from './chain/adapters/EthereumAdapter';

const ChainAdapter = EthereumAdapter;

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
                        isListing &&
                        <Buy marketAddress={process.env.MARKET_ADDRESS } nftAddress={nft.address}></Buy>
                    }
                </div>),
                image: ChainAdapter.getNftImage(nft),
            }
        });
        return <Card.Group centered items={cardItems}/>;
    }


}