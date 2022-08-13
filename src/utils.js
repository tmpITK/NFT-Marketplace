import { Card } from 'semantic-ui-react';
import { Link } from '../routes';
import EthereumAdapter from './chain/adapters/EthereumAdapter';

const ChainAdapter = EthereumAdapter;

export function getIpfsUrlFromHash(hash) {
    return  `https://ipfs.io/ipfs/${hash}`;
}


export function createCardGroupFromNftList(nftList, isOwner=false) {
    console.log(nftList);
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
                </div>),
                image: ChainAdapter.getNftImage(nft),
            }
        });
        return <Card.Group centered items={cardItems}/>;
    }


}